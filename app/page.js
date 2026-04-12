"use client";

import Lenis from "lenis";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const contactEmail = "contact@jano.eu.org";

const featuredProjects = [
  {
    title: "Lorem Ipsum 01",
    category: "Placeholder",
    year: "Soon",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    stack: ["Lorem", "Ipsum", "Dolor"],
    highlights: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco."
    ],
    liveUrl: null,
    codeUrl: null
  },
  {
    title: "Lorem Ipsum 02",
    category: "Placeholder",
    year: "Soon",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    overview:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    stack: ["Sit", "Amet", "Consectetur"],
    highlights: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      "Duis aute irure dolor in reprehenderit in voluptate velit."
    ],
    liveUrl: null,
    codeUrl: null
  },
  {
    title: "Lorem Ipsum 03",
    category: "Placeholder",
    year: "Soon",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    overview:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    stack: ["Adipiscing", "Elit", "Tempor"],
    highlights: [
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      "Excepteur sint occaecat cupidatat non proident."
    ],
    liveUrl: null,
    codeUrl: null
  }
];

const skillGroups = [
  {
    title: "Programming",
    items: ["Python", "TypeScript"]
  },
  {
    title: "Databases",
    items: ["PostgreSQL"]
  },
  {
    title: "Languages",
    items: ["Slovak", "English", "Spanish (basic)", "German (basic)"]
  }
];

const navItems = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" }
];

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

function ProjectActionLink({ href, label, compact = false }) {
  const className = `project-action${compact ? " is-compact" : ""}${href ? "" : " is-disabled"}`;

  if (!href) {
    return (
      <span aria-disabled="true" className={className}>
        {label}
      </span>
    );
  }

  return (
    <a className={className} href={href} rel="noreferrer" target="_blank">
      {label}
    </a>
  );
}

function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

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

    const handleMove = (event) => {
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

    const handlePointerDown = (event) => {
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
      const deltaX = state.mouseX - state.ringX;
      const deltaY = state.mouseY - state.ringY;
      const distance = Math.hypot(deltaX, deltaY);
      const followEase = Math.min(0.42, 0.22 + distance * 0.0022);

      state.ringX += deltaX * followEase;
      state.ringY += deltaY * followEase;
      state.smoothVX += (state.velocityX - state.smoothVX) * 0.24;
      state.smoothVY += (state.velocityY - state.smoothVY) * 0.24;
      state.pressProgress += ((state.pressed ? 1 : 0) - state.pressProgress) * 0.26;

      const directionalDistance = Math.min(
        maxOffset,
        distance * 0.48 + Math.hypot(state.smoothVX, state.smoothVY) * 0.12
      );
      const targetInnerX = distance ? (deltaX / distance) * directionalDistance : 0;
      const targetInnerY = distance ? (deltaY / distance) * directionalDistance : 0;

      state.innerX += (targetInnerX - state.innerX) * 0.22;
      state.innerY += (targetInnerY - state.innerY) * 0.22;

      const outerScale = 1 - state.pressProgress * 0.24;

      outer.style.transform =
        `translate3d(${state.ringX}px, ${state.ringY}px, 0) ` +
        `translate3d(-50%, -50%, 0) scale(${outerScale})`;
      inner.style.transform =
        `translate3d(${state.ringX + state.innerX}px, ${state.ringY + state.innerY}px, 0) ` +
        "translate3d(-50%, -50%, 0)";

      state.velocityX *= 0.78;
      state.velocityY *= 0.78;
      state.frame = window.requestAnimationFrame(render);
    };

    document.documentElement.addEventListener("pointermove", handleMove);
    document.documentElement.addEventListener("pointerrawupdate", handleMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    window.addEventListener("blur", handleLeave);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    state.frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(state.frame);
      document.documentElement.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerrawupdate", handleMove);
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
  const [activeSection, setActiveSection] = useState("about");
  const [isNavPinned, setIsNavPinned] = useState(false);
  const [navIndicatorStyle, setNavIndicatorStyle] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navRef = useRef(null);
  const navLinkRefs = useRef({});
  const pendingSectionRef = useRef(null);
  const lenisRef = useRef(null);
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
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
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

    const handleAnchorClick = (event) => {
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
      lenis.scrollTo(target, {
        offset: -96,
        duration: 0.85
      });
      window.history.replaceState(null, "", href);
    };

    const animateScroll = (time) => {
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
    };
  }, []);

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    lenisRef.current?.stop();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      lenisRef.current?.start();
    };
  }, [selectedProject]);

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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const elements = document.querySelectorAll(".reveal-on-scroll");
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
    let frame = 0;

    const updateActiveSection = () => {
      const marker = 132;
      const pendingSection = pendingSectionRef.current;

      if (pendingSection) {
        const pendingElement = document.getElementById(pendingSection);

        if (pendingElement) {
          const pendingDistance = Math.abs(pendingElement.getBoundingClientRect().top - marker);

          if (pendingDistance > 48) {
            setActiveSection((current) =>
              current === pendingSection ? current : pendingSection
            );
            return;
          }
        }

        pendingSectionRef.current = null;
      }

      const pageBottom = window.scrollY + window.innerHeight;
      const documentBottom = document.documentElement.scrollHeight;
      const isAtDocumentBottom = Math.ceil(pageBottom) >= documentBottom - 2;

      if (isAtDocumentBottom) {
        setActiveSection((current) => (current === lastSectionId ? current : lastSectionId));
        return;
      }

      let nextSection = sectionIds[0];
      let closestDistance = Number.POSITIVE_INFINITY;

      sectionIds.forEach((id) => {
        const element = document.getElementById(id);

        if (!element) {
          return;
        }

        const distance = Math.abs(element.getBoundingClientRect().top - marker);

        if (distance < closestDistance) {
          closestDistance = distance;
          nextSection = id;
        }
      });

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

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
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

  const handleProjectOpen = (project) => {
    setSelectedProject(project);
  };

  const handleProjectClose = () => {
    setSelectedProject(null);
  };

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

      setToastMessage("Email copied");
    } catch {
      setToastMessage("Could not copy email");
    }
  };

  const handleBackToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    pendingSectionRef.current = null;

    if (!prefersReducedMotion && lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 0.85 });
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  };

  return (
    <main className="page-shell">
      <CustomCursor />

      <div className="page">
        <div className="background-glow glow-one" aria-hidden="true" />
        <div className="background-glow glow-two" aria-hidden="true" />

        <header className={`topbar${isNavPinned ? " is-scrolled" : ""}`}>
          <a className="brand" href="#home">
            <KittyMark />
            jan
          </a>

          <nav className="nav" ref={navRef}>
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

        <section className="hero" id="home">
          <div className="hero-copy reveal-on-scroll">
            <p className="sticker-label">
              <Bow />
              Full-stack developer
            </p>

            <TypewriterTitle />

            <p className="hero-text">
              I&apos;m Jan, a student from Slovakia who enjoys building clean,
              thoughtful websites and learning how things work behind the
              scenes.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                View projects
              </a>
              <a className="button button-secondary" href="mailto:contact@jano.eu.org">
                Contact me
              </a>
            </div>
          </div>

          <aside className="card hero-note reveal-on-scroll" style={{ "--reveal-delay": "90ms" }}>
            <p className="section-label">
              <Sparkle />
              Current focus
            </p>
            <h2>Making it through school and improving every day.</h2>
            <p>
              Right now I&apos;m focused on school, learning consistently, and
              getting better at building thoughtful projects one step at a time.
            </p>

            <div className="note-tags">
              <span>School</span>
              <span>Learning</span>
              <span>Progress</span>
            </div>
          </aside>
        </section>

        <div className="section-divider" aria-hidden="true">
          <span />
          <Bow />
          <span />
        </div>

        <section className="section-grid" id="about">
          <article className="card about-card reveal-on-scroll">
            <p className="section-label">
              <Heart />
              About
            </p>
            <h2>Full-stack developer, curious by nature.</h2>
            <p className="section-text">
              I&apos;m a full-stack developer based in Slovakia and currently a
              student, with over 2 years of back-end experience. Python is my
              favorite language because it&apos;s easy to learn and use, and I
              love understanding how things work behind the scenes.
            </p>
          </article>

          <aside className="card details-card reveal-on-scroll" style={{ "--reveal-delay": "80ms" }}>
            <p className="section-label">
              <Apple />
              At a glance
            </p>
            <h2>A few quick details about me.</h2>
            <ul className="details-list">
              <li>Based in Slovakia</li>
              <li>Currently a student</li>
              <li>Over 2 years of back-end experience</li>
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
            <h2>A few projects I&apos;ve worked on.</h2>
          </div>

          <div className="project-grid">
            {featuredProjects.map((project, index) => (
              <div
                className="project-reveal reveal-on-scroll"
                key={project.title}
                style={{ "--reveal-delay": `${index * 90}ms` }}
              >
                <article
                  aria-label={`Open ${project.title}`}
                  className="card project-card"
                  onClick={() => handleProjectOpen(project)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleProjectOpen(project);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="project-tape" aria-hidden="true" />
                  <div className="project-pin" aria-hidden="true">
                    <Heart />
                  </div>

                  <div className="project-meta">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-footer">
                    <span className="tiny-pill">Placeholder</span>
                    <span className="tiny-pill">Coming soon</span>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" aria-hidden="true">
          <span />
          <Sparkle />
          <span />
        </div>

        <section className="bottom-grid">
          <article className="card skills-card reveal-on-scroll" id="skills">
            <p className="section-label">
              <Bow />
              Skills
            </p>
            <h2>Tools and strengths.</h2>

            <div className="skills-groups">
              {skillGroups.map((group) => (
                <div className="skill-category" key={group.title}>
                  <p className="skill-category-title">{group.title}</p>

                  <div className="skills-wrap">
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
            style={{ "--reveal-delay": "80ms" }}
          >
            <p className="section-label">
              <Heart />
              Contact
            </p>
            <h2>Let&apos;s make something cute and polished.</h2>
            <p className="section-text">
              Replace the placeholder links with your real details and keep the
              message simple.
            </p>

            <div className="contact-links">
              <button className="contact-copy" onClick={handleCopyEmail} type="button">
                <span>{contactEmail}</span>
                <span className="contact-copy-hint">Click to copy</span>
              </button>
              <a href="https://github.com/" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </article>
        </section>

        <footer className="site-footer reveal-on-scroll" style={{ "--reveal-delay": "120ms" }}>
          <p>&copy; {currentYear} Jan</p>
          <p>Built with care in Next.js.</p>
        </footer>
      </div>

      {selectedProject ? (
        <div className="drawer-backdrop" onClick={handleProjectClose}>
          <aside
            aria-labelledby="project-drawer-title"
            aria-modal="true"
            className="project-drawer"
            data-lenis-prevent="true"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="drawer-head">
              <div className="drawer-meta">
                <span>{selectedProject.category}</span>
                <span>{selectedProject.year}</span>
              </div>

              <button className="drawer-close" onClick={handleProjectClose} type="button">
                Close
              </button>
            </div>

            <h2 id="project-drawer-title">{selectedProject.title}</h2>
            <p className="drawer-description">{selectedProject.overview}</p>

            <div className="drawer-section">
              <p className="drawer-section-title">What I built</p>
              <ul className="drawer-list">
                {selectedProject.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className="drawer-section">
              <p className="drawer-section-title">Stack</p>
              <div className="drawer-pills">
                {selectedProject.stack.map((item) => (
                  <span className="tiny-pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {selectedProject.liveUrl || selectedProject.codeUrl ? (
              <div className="drawer-actions">
                <ProjectActionLink href={selectedProject.liveUrl} label="Live project" />
                <ProjectActionLink href={selectedProject.codeUrl} label="Code" />
              </div>
            ) : null}
          </aside>
        </div>
      ) : null}

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
  );
}
