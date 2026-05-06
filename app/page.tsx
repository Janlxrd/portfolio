"use client";

import Lenis from "lenis";
import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";

type ProjectAction = {
  href: string;
  label: string;
  primary?: boolean;
};

type FeaturedProject = {
  title: string;
  category: string;
  status: string;
  description: string;
  actions?: ProjectAction[];
};

type SkillGroup = {
  title: string;
  items: string[];
};

type NavItem = {
  href: `#${string}`;
  label: string;
};

const revealDelay = (value: string): CSSProperties =>
  ({ "--reveal-delay": value }) as CSSProperties;

const contactEmail = "contact@jano.eu.org";
const birthDate = { year: 2007, month: 7, day: 12 };
const birthTimeZone = "Europe/Bratislava";

const featuredProjects: FeaturedProject[] = [
  {
    title: "Vantix",
    category: "Discord bot",
    status: "Live",
    description: "A multi-purpose Discord bot built for public use.",
    actions: [
      {
        href: "https://vantix.jano.eu.org",
        label: "Website",
        primary: true
      },
      {
        href:
          "https://discord.com/oauth2/authorize?client_id=1495397495868756058&scope=bot+applications.commands&integration_type=0&permissions=1237219405014",
        label: "Invite to Discord"
      }
    ]
  },
  {
    title: "Coming soon",
    category: "Project",
    status: "Coming soon",
    description: "Another project card will go here later."
  },
  {
    title: "Coming soon",
    category: "Project",
    status: "Coming soon",
    description: "This space is for something I build next."
  }
];

const skillGroups: SkillGroup[] = [
  {
    title: "Coding",
    items: ["Python", "TypeScript", "Express"]
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "Prisma", "Redis"]
  },
  {
    title: "Tools",
    items: ["Docker"]
  },
  {
    title: "Languages",
    items: ["Slovak", "English", "Spanish (a little)", "German (a little)"]
  }
];

const navItems: NavItem[] = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" }
];

function getCurrentAge(): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: birthTimeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).formatToParts(new Date());

  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);

  let age = year - birthDate.year;

  if (month < birthDate.month || (month === birthDate.month && day < birthDate.day)) {
    age -= 1;
  }

  return age;
}

function Bow() {
  return (
    <span className="ornament ornament-bow" aria-hidden="true">
      <span className="bow">
        <span className="bow-knot" />
        <span className="bow-tail bow-tail-left" />
        <span className="bow-tail bow-tail-right" />
      </span>
    </span>
  );
}

function Sparkle() {
  return (
    <span className="ornament ornament-sparkle" aria-hidden="true">
      <span className="sparkle" />
    </span>
  );
}

function Heart() {
  return (
    <span className="ornament ornament-heart" aria-hidden="true">
      <span className="bow bow-compact">
        <span className="bow-knot" />
        <span className="bow-tail bow-tail-left" />
        <span className="bow-tail bow-tail-right" />
      </span>
    </span>
  );
}

function KittyMark() {
  return (
    <span className="ornament ornament-kitty" aria-hidden="true">
      <span className="kitty-mark">
        <span className="kitty-head">
          <span className="kitty-ear kitty-ear-left" />
          <span className="kitty-ear kitty-ear-right" />
          <span className="kitty-eye kitty-eye-left" />
          <span className="kitty-eye kitty-eye-right" />
          <span className="kitty-nose" />
          <span className="kitty-whiskers kitty-whiskers-left" />
          <span className="kitty-whiskers kitty-whiskers-right" />
        </span>

        <span className="kitty-bow">
          <span className="kitty-bow-knot" />
        </span>
      </span>
    </span>
  );
}

function Apple() {
  return (
    <span className="ornament ornament-apple" aria-hidden="true">
      <span className="apple">
        <span />
      </span>
    </span>
  );
}

function CustomCursor() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    if (!finePointer) {
      return;
    }

    const outer = outerRef.current;
    const inner = innerRef.current;

    if (!outer || !inner) {
      return;
    }

    const state = {
      mouseX: window.innerWidth / 2,
      mouseY: window.innerHeight / 2,
      ringX: window.innerWidth / 2,
      ringY: window.innerHeight / 2,
      velocityX: 0,
      velocityY: 0,
      smoothVX: 0,
      smoothVY: 0,
      innerX: 0,
      innerY: 0,
      visible: false,
      pressed: false,
      pressProgress: 0,
      frame: 0
    };

    const maxOffset = 12;
    const ringLead = 0.65;
    const ringEaseBase = 0.28;
    const ringEaseCap = 0.56;
    const velocityEase = 0.32;
    const innerEase = 0.3;

    const showCursor = () => {
      state.visible = true;
      outer.style.opacity = "1";
      inner.style.opacity = "1";
    };

    const hideCursor = () => {
      state.visible = false;
      outer.style.opacity = "0";
      inner.style.opacity = "0";
    };

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }

      if (!state.visible) {
        state.ringX = event.clientX;
        state.ringY = event.clientY;
        showCursor();
      }

      state.velocityX = event.clientX - state.mouseX;
      state.velocityY = event.clientY - state.mouseY;
      state.mouseX = event.clientX;
      state.mouseY = event.clientY;
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }

      if (event.button !== 0) {
        return;
      }

      state.pressed = true;
      outer.dataset.pressed = "true";
    };

    const handleUp = () => {
      state.pressed = false;
      outer.dataset.pressed = "false";
    };

    const handleLeave = () => {
      state.pressed = false;
      outer.dataset.pressed = "false";
      hideCursor();
    };

    const render = () => {
      state.smoothVX += (state.velocityX - state.smoothVX) * velocityEase;
      state.smoothVY += (state.velocityY - state.smoothVY) * velocityEase;

      const targetRingX = state.mouseX + state.smoothVX * ringLead;
      const targetRingY = state.mouseY + state.smoothVY * ringLead;
      const deltaX = targetRingX - state.ringX;
      const deltaY = targetRingY - state.ringY;
      const distance = Math.hypot(deltaX, deltaY);
      const followEase = Math.min(ringEaseCap, ringEaseBase + distance * 0.0026);

      state.ringX += deltaX * followEase;
      state.ringY += deltaY * followEase;
      state.pressProgress += ((state.pressed ? 1 : 0) - state.pressProgress) * 0.26;

      const directionalX = state.mouseX - state.ringX + state.smoothVX * 0.6;
      const directionalY = state.mouseY - state.ringY + state.smoothVY * 0.6;
      const directionalMagnitude = Math.hypot(directionalX, directionalY);
      const directionalDistance = Math.min(
        maxOffset,
        directionalMagnitude * 0.52 + Math.hypot(state.smoothVX, state.smoothVY) * 0.18
      );
      const targetInnerX = directionalMagnitude
        ? (directionalX / directionalMagnitude) * directionalDistance
        : 0;
      const targetInnerY = directionalMagnitude
        ? (directionalY / directionalMagnitude) * directionalDistance
        : 0;

      state.innerX += (targetInnerX - state.innerX) * innerEase;
      state.innerY += (targetInnerY - state.innerY) * innerEase;

      const outerScale = 1 - state.pressProgress * 0.24;

      outer.style.transform =
        `translate3d(${state.ringX}px, ${state.ringY}px, 0) ` +
        `translate3d(-50%, -50%, 0) scale(${outerScale})`;
      inner.style.transform =
        `translate3d(${state.ringX + state.innerX}px, ${state.ringY + state.innerY}px, 0) ` +
        "translate3d(-50%, -50%, 0)";

      state.velocityX *= 0.66;
      state.velocityY *= 0.66;
      state.frame = window.requestAnimationFrame(render);
    };

    document.documentElement.addEventListener("pointermove", handleMove);
    document.documentElement.addEventListener("pointerrawupdate", handleMove as EventListener);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    window.addEventListener("blur", handleLeave);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    state.frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(state.frame);
      document.documentElement.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerrawupdate", handleMove as EventListener);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
      window.removeEventListener("blur", handleLeave);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div className="cursor-outer" data-pressed="false" ref={outerRef} />
      <div className="cursor-inner" ref={innerRef} />
    </div>
  );
}

function TypewriterTitle() {
  const fullText = "Hey, I'm Jan.";
  const [typedText, setTypedText] = useState("");
  const words = typedText.split(" ");
  const endsWithSpace = typedText.endsWith(" ");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedText(fullText);
      return;
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(fullText.slice(0, index));

      if (index >= fullText.length) {
        window.clearInterval(timer);
      }
    }, 95);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <h1 aria-label={fullText} className="type-title">
      <span aria-hidden="true" className="type-title-line">
        {words.map((word, index) => {
          if (!word) {
            return null;
          }

          const hasTrailingSpace = index < words.length - 1 || endsWithSpace;

          return (
            <span
              className={`type-title-word${hasTrailingSpace ? " is-spaced" : ""}`}
              key={`${word}-${index}`}
            >
              {word}
            </span>
          );
        })}
        <span className="typing-cursor" aria-hidden="true" />
      </span>
    </h1>
  );
}

export default function Home() {
  const [age, setAge] = useState(() => getCurrentAge());
  const [activeSection, setActiveSection] = useState("about");
  const [isNavPinned, setIsNavPinned] = useState(false);
  const [navIndicatorStyle, setNavIndicatorStyle] = useState<CSSProperties | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navRef = useRef<HTMLElement | null>(null);
  const navLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const pendingSectionRef = useRef<string | null>(null);
  const pendingSectionTimeoutRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const currentYear = new Date().getFullYear();

  useLayoutEffect(() => {
    const canManageRestoration = "scrollRestoration" in window.history;
    const previousRestoration = canManageRestoration
      ? window.history.scrollRestoration
      : null;

    if (canManageRestoration) {
      window.history.scrollRestoration = "manual";
    }

    const resetScrollPosition = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetScrollPosition();

    const frame = window.requestAnimationFrame(resetScrollPosition);
    const timeout = window.setTimeout(resetScrollPosition, 0);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);

      if (canManageRestoration && previousRestoration) {
        window.history.scrollRestoration = previousRestoration;
      }
    };
  }, []);

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    const updateAge = () => {
      setAge(getCurrentAge());
    };

    updateAge();

    const interval = window.setInterval(updateAge, 60 * 60 * 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.78,
      wheelMultiplier: 1.08,
      touchMultiplier: 1,
      easing: (t) => 1 - Math.pow(1 - t, 3)
    });

    lenisRef.current = lenis;

    let frame = 0;

    const handleAnchorClick = (event: MouseEvent) => {
      const trigger =
        event.target instanceof Element
          ? event.target.closest('a[href^="#"]')
          : null;

      if (!trigger) {
        return;
      }

      const href = trigger.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();
      pendingSectionRef.current = href.slice(1);
      setActiveSection(href.slice(1));

      if (pendingSectionTimeoutRef.current) {
        window.clearTimeout(pendingSectionTimeoutRef.current);
      }

      pendingSectionTimeoutRef.current = window.setTimeout(() => {
        pendingSectionRef.current = null;
        pendingSectionTimeoutRef.current = null;
      }, 900);

      const topbar = document.querySelector(".topbar");
      const navOffset = topbar ? topbar.getBoundingClientRect().height + 28 : 112;

      lenis.scrollTo(target as HTMLElement, {
        offset: -navOffset,
        duration: 0.85
      });
      window.history.replaceState(null, "", href);
    };

    const animateScroll = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(animateScroll);
    };

    frame = window.requestAnimationFrame(animateScroll);
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
      window.cancelAnimationFrame(frame);

      if (pendingSectionTimeoutRef.current) {
        window.clearTimeout(pendingSectionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setToastMessage("");
    }, 1800);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [toastMessage]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    let startFrame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          window.requestAnimationFrame(() => {
            entry.target.classList.add("is-visible");
          });
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -14% 0px"
      }
    );

    startFrame = window.requestAnimationFrame(() => {
      elements.forEach((element) => {
        observer.observe(element);
      });
    });

    return () => {
      window.cancelAnimationFrame(startFrame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));
    const lastSectionId = sectionIds[sectionIds.length - 1];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const visibleSections = new Map<string, IntersectionObserverEntry>();
    let frame = 0;

    const updateActiveSection = () => {
      const pendingSection = pendingSectionRef.current;

      if (pendingSection) {
        setActiveSection((current) => (current === pendingSection ? current : pendingSection));
        return;
      }

      const pageBottom = window.scrollY + window.innerHeight;
      const documentBottom = document.documentElement.scrollHeight;
      const isAtDocumentBottom = Math.ceil(pageBottom) >= documentBottom - 2;

      if (isAtDocumentBottom) {
        setActiveSection((current) => (current === lastSectionId ? current : lastSectionId));
        return;
      }

      const topbar = document.querySelector(".topbar");
      const marker = topbar ? topbar.getBoundingClientRect().bottom + 24 : 132;
      let nextSection = sectionIds[0];
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((element) => {
        if (!visibleSections.has(element.id)) {
          return;
        }

        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top - marker);

        if (distance < closestDistance) {
          closestDistance = distance;
          nextSection = element.id;
        }
      });

      if (!visibleSections.size) {
        sections.forEach((element) => {
          const rect = element.getBoundingClientRect();

          if (rect.top - marker > 0) {
            return;
          }

          const distance = Math.abs(rect.top - marker);

          if (distance < closestDistance) {
            closestDistance = distance;
            nextSection = element.id;
          }
        });
      }

      setActiveSection((current) => (current === nextSection ? current : nextSection));
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveSection();
      });
    };

    const topbar = document.querySelector(".topbar");
    const navOffset = topbar ? topbar.getBoundingClientRect().height + 36 : 140;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry);
            return;
          }

          visibleSections.delete(entry.target.id);
        });

        requestUpdate();
      },
      {
        root: null,
        rootMargin: `-${navOffset}px 0px -45% 0px`,
        threshold: [0.05, 0.2, 0.45, 0.7]
      }
    );

    sections.forEach((section) => observer.observe(section));

    updateActiveSection();
    window.addEventListener("resize", requestUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", requestUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    let frame = 0;

    const updatePinnedState = () => {
      const shouldPin = window.scrollY > 18;
      setIsNavPinned((current) => (current === shouldPin ? current : shouldPin));
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updatePinnedState();
      });
    };

    updatePinnedState();
    window.addEventListener("scroll", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateBackToTop = () => {
      const shouldShow = window.scrollY > 520;
      setShowBackToTop((current) => (current === shouldShow ? current : shouldShow));
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateBackToTop();
      });
    };

    updateBackToTop();
    window.addEventListener("scroll", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateIndicator = () => {
      const navElement = navRef.current;
      const activeLink = navLinkRefs.current[activeSection];

      if (!navElement || !activeLink) {
        return;
      }

      const navRect = navElement.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      setNavIndicatorStyle({
        width: `${linkRect.width}px`,
        transform: `translateX(${linkRect.left - navRect.left}px)`,
        opacity: 1
      });
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateIndicator();
      });
    };

    updateIndicator();
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("resize", requestUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, [activeSection]);

  const handleCopyEmail = async () => {
    const fallbackCopy = () => {
      const textArea = document.createElement("textarea");
      textArea.value = contactEmail;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "absolute";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();

      const copied = document.execCommand("copy");
      document.body.removeChild(textArea);
      return copied;
    };

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(contactEmail);
      } else if (!fallbackCopy()) {
        throw new Error("Clipboard unavailable");
      }

      setToastMessage("Email copied.");
    } catch {
      setToastMessage("Couldn't copy the email.");
    }
  };

  const handleBackToTop = () => {
    pendingSectionRef.current = null;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 0.85 });
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, 0);
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <main className="page-shell relative w-full max-w-full min-h-svh" id="main">
      <CustomCursor />

      <div className="page relative mx-auto w-full max-w-[1080px]">
        <div className="background-glow glow-one" aria-hidden="true" />
        <div className="background-glow glow-two" aria-hidden="true" />

        <header
          className={`topbar sticky z-30 flex w-full items-center justify-between gap-4${isNavPinned ? " is-scrolled" : ""}`}
        >
          <a className="brand inline-flex items-center" href="#home">
            <KittyMark />
            jan
          </a>

          <nav
            aria-label="Main navigation"
            className="nav relative flex flex-wrap items-center"
            ref={navRef}
          >
            <span
              aria-hidden="true"
              className="nav-indicator"
              style={navIndicatorStyle ?? undefined}
            />
            {navItems.map((item) => (
              <a
                aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
                className={activeSection === item.href.slice(1) ? "is-active" : undefined}
                href={item.href}
                key={item.href}
                ref={(node) => {
                  navLinkRefs.current[item.href.slice(1)] = node;
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        <section className="hero grid items-start" id="home">
          <div className="hero-copy reveal-on-scroll flex min-w-0 flex-col items-start">
            <p className="sticker-label">
              <Bow />
              Student and full-stack developer
            </p>

            <TypewriterTitle />

            <p className="hero-text">
              I&apos;m Jan, an <span suppressHydrationWarning>{age}</span>-year-old
              student from Slovakia who likes building clear, thoughtful
              websites and learning how things work behind the scenes.
            </p>

            <div className="hero-actions flex flex-wrap">
              <a className="button button-primary" href="#projects">
                See my work
              </a>
              <a className="button button-secondary" href="mailto:contact@jano.eu.org">
                Get in touch
              </a>
            </div>
          </div>

          <aside
            className="card hero-note reveal-on-scroll min-w-0 justify-self-end"
            style={revealDelay("90ms")}
          >
            <p className="section-label">
              <Sparkle />
              Current focus
            </p>
            <h2>Focused on school and steady progress.</h2>
            <p>
              Right now, most of my energy goes into school, learning
              consistently, and getting a little better every time I build
              something.
            </p>

            <div className="note-tags flex flex-wrap">
              <span>School</span>
              <span>Learning</span>
              <span>Improving</span>
            </div>
          </aside>
        </section>

        <div className="section-divider grid items-center" aria-hidden="true">
          <span />
          <Bow />
          <span />
        </div>

        <section className="section-grid grid gap-4" id="about">
          <article className="card about-card reveal-on-scroll">
            <p className="section-label">
              <Heart />
              About
            </p>
            <h2>Full-stack developer with a back-end focus.</h2>
            <p className="section-text">
              I&apos;m a full-stack developer from Slovakia with over two years
              of back-end experience. I&apos;m still in school, and Python is
              still the language I enjoy most because it feels simple,
              practical, and easy to work with. I also like understanding how
              things work under the hood.
            </p>
          </article>

          <aside className="card details-card reveal-on-scroll" style={revealDelay("80ms")}>
            <p className="section-label">
              <Apple />
              At a glance
            </p>
            <h2>A quick intro.</h2>
            <ul className="details-list">
              <li>Based in Slovakia</li>
              <li>Still in school</li>
              <li>2+ years of back-end experience</li>
              <li>Favorite language: Python</li>
            </ul>
          </aside>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading reveal-on-scroll">
            <p className="section-label">
              <Sparkle />
              Projects
            </p>
            <h2>Real projects coming soon.</h2>
          </div>

          <div className="project-grid grid gap-4">
            {featuredProjects.map((project, index) => (
              <div
                className="project-reveal reveal-on-scroll"
                key={project.title}
                style={revealDelay(`${index * 90}ms`)}
              >
                <article
                  className="card project-card flex h-full flex-col overflow-hidden"
                >
                  <div className="project-tape" aria-hidden="true" />
                  <div className="project-pin" aria-hidden="true">
                    <Heart />
                  </div>

                  <div className="project-meta flex flex-wrap">
                    <span>{project.category}</span>
                    <span>{project.status}</span>
                  </div>

                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-footer flex flex-wrap">
                    {project.actions
                      ? project.actions.map((action) => (
                          <a
                            className={`project-action is-compact${action.primary ? " project-action-primary" : ""}`}
                            href={action.href}
                            key={action.label}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {action.label}
                          </a>
                        ))
                      : <span className="tiny-pill">Coming soon</span>}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider grid items-center" aria-hidden="true">
          <span />
          <Sparkle />
          <span />
        </div>

        <section className="bottom-grid grid gap-4">
          <article className="card skills-card reveal-on-scroll" id="skills">
            <p className="section-label">
              <Bow />
              Skills
            </p>
            <h2>What I work with.</h2>

            <div className="skills-groups">
              {skillGroups.map((group) => (
                <div className="skill-category" key={group.title}>
                  <p className="skill-category-title">{group.title}</p>

                  <div className="skills-wrap flex flex-wrap">
                    {group.items.map((skill) => (
                      <span className="skill-pill" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article
            className="card contact-card reveal-on-scroll"
            id="contact"
            style={revealDelay("80ms")}
          >
            <p className="section-label">
              <Heart />
              Contact
            </p>
            <h2>Let&apos;s talk.</h2>
            <p className="section-text">
              If you&apos;d like to talk about a project, ask a question, or
              just say hi, feel free to reach out.
            </p>

            <div className="contact-links flex flex-wrap">
              <button className="contact-copy" onClick={handleCopyEmail} type="button">
                <span>{contactEmail}</span>
                <span className="contact-copy-hint">Tap or click to copy</span>
              </button>
              <a href="https://github.com/Janlxrd" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href="https://discord.com/" target="_blank" rel="noreferrer">
                Discord
              </a>
            </div>
          </article>
        </section>

        <footer
          className="site-footer reveal-on-scroll flex flex-col items-center justify-center text-center"
          style={revealDelay("120ms")}
        >
          <p>&copy; {currentYear} Jan</p>
          <p>Made with ❤️ by Jan in Next.js.</p>
        </footer>
      </div>

      <div
        aria-live="polite"
        className={`copy-toast${toastMessage ? " is-visible" : ""}`}
        role="status"
      >
        {toastMessage}
      </div>

      <button
        className={`back-to-top${showBackToTop ? " is-visible" : ""}`}
        onClick={handleBackToTop}
        type="button"
      >
        Back to top
      </button>
      </main>
    </>
  );
}
