"use client";

import Lenis from "lenis";
import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";

import { CustomCursor, MorphingTitle, RoleCarousel } from "./_components/effects";
import { Apple, Bow, Heart, KittyMark } from "./_components/ornaments";
import { ArrowIcon, BrowserPreview, SectionHeading, SkillIcon } from "./_components/ui";
import { contactEmail, featuredProjects, getCurrentAge, githubUrl, navItems, skillGroups } from "./_lib/content";

const revealDelay = (value: string): CSSProperties =>
  ({ "--reveal-delay": value }) as CSSProperties;

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
  const progressRef = useRef<HTMLDivElement | null>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const bar = progressRef.current;

    if (!bar) {
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const card =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(".spotlight")
          : null;

      if (!card) {
        return;
      }

      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    document.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

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
    // Block the context menu on decorative areas, but keep it where people
    // actually need it: links, form fields, and any text they've selected.
    const handleContextMenu = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const isEssentialTarget = Boolean(
        target?.closest('a[href], input, textarea, select, [contenteditable="true"]')
      );
      const hasSelection = Boolean(window.getSelection()?.toString().trim());

      if (isEssentialTarget || hasSelection) {
        return;
      }

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

      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress-bar" ref={progressRef} />
      </div>

      <div className="backdrop" aria-hidden="true">
        <div className="background-glow glow-one" />
        <div className="background-glow glow-two" />
        <div className="background-glow glow-three" />
      </div>

      <main className="page-shell" id="main">
        <CustomCursor />

        <header className={`topbar${isNavPinned ? " is-scrolled" : ""}`}>
          <div className="topbar-inner">
            <a className="brand" href="#home">
              <KittyMark />
              <span>jan</span>
            </a>

            <nav aria-label="Main navigation" className="nav" ref={navRef}>
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
          </div>
        </header>

        <div className="page">
          <section className="hero" id="home">
            <div className="hero-copy reveal-on-scroll">
              <MorphingTitle />

              <RoleCarousel />

              <p className="hero-text">
                I&apos;m <span suppressHydrationWarning>{age}</span>, I live in Slovakia,
                and I spend most of my free time writing code. Mostly back-end
                stuff, sometimes websites like this one.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  My projects
                  <ArrowIcon direction="down" />
                </a>
                <a className="button button-secondary" href={`mailto:${contactEmail}`}>
                  Email me
                </a>
              </div>
            </div>

            <aside
              className="card spotlight hero-note reveal-on-scroll"
              style={revealDelay("120ms")}
            >
              <div className="hero-note-head">
                <p className="card-label">
                  <Bow />
                  Right now
                </p>
              </div>
              <h2>Mostly school, honestly</h2>
              <p>
                School takes up most of my week, so I code whenever I get
                some free time. Usually that means working on Vantix or
                trying out something I haven&apos;t used before.
              </p>
            </aside>
          </section>

          <section className="section" id="about">
            <SectionHeading title="A bit about me" />

            <div className="about-grid">
              <article className="card spotlight about-card reveal-on-scroll">
                <p className="section-text lead">
                  I&apos;ve been doing back-end stuff for a bit over two years
                  now. I can do front-end too, but I&apos;d rather be building
                  APIs and messing with databases. Python is still my favorite
                  language, it&apos;s just nice to write. I also like figuring out
                  how things actually work instead of copying code until it runs.
                </p>
              </article>

              <aside
                className="card spotlight details-card reveal-on-scroll"
                style={revealDelay("90ms")}
              >
                <p className="card-label">
                  <Apple />
                  Quick facts
                </p>
                <h3>TL;DR</h3>
                <ul className="details-list">
                  <li>From Slovakia</li>
                  <li>Still in school</li>
                  <li>2+ years doing back-end</li>
                  <li>Python over everything</li>
                </ul>
              </aside>
            </div>
          </section>

          <section className="section" id="projects">
            <SectionHeading title="Stuff I've made" />

            <div className="project-grid">
              {featuredProjects.map((project, index) => {
                const isFeatured = Boolean(project.actions?.length);

                return (
                  <div
                    className={`project-reveal reveal-on-scroll${isFeatured ? " is-featured" : ""}`}
                    key={`${project.title}-${index}`}
                    style={revealDelay(`${index * 90}ms`)}
                  >
                    <article
                      className={`card spotlight project-card${isFeatured ? " is-featured" : " is-placeholder"}`}
                    >
                      {isFeatured ? (
                        <div className="project-visual" aria-hidden="true">
                          <span className="project-orbit" />
                          {project.previewUrl ? (
                            <BrowserPreview name={project.title} url={project.previewUrl} />
                          ) : null}
                          <span className="project-pin">
                            <KittyMark />
                          </span>
                        </div>
                      ) : null}

                      <div className="project-body">
                        <div className="project-meta">
                          <span className="project-category">{project.category}</span>
                          <span
                            className={`project-status${project.status === "Live" ? " is-live" : ""}`}
                          >
                            {project.status === "Live" ? (
                              <span className="status-dot" aria-hidden="true" />
                            ) : null}
                            {project.status}
                          </span>
                        </div>

                        <h3>{project.title}</h3>
                        <p className="project-description">{project.description}</p>

                        {project.tech?.length ? (
                          <div className="project-stack" aria-label={`${project.title} technologies`}>
                            {project.tech.map((tech) => (
                              <span key={tech}>{tech}</span>
                            ))}
                          </div>
                        ) : null}


                        <div className="project-footer">
                          {project.actions ? (
                            project.actions.map((action) => (
                              <a
                                className={`project-action${action.primary ? " project-action-primary" : ""}`}
                                href={action.href}
                                key={action.label}
                                rel="noreferrer"
                                target="_blank"
                              >
                                {action.label}
                                <ArrowIcon />
                              </a>
                            ))
                          ) : (
                            <span className="tiny-pill">Coming soon</span>
                          )}
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}

              <div className="project-reveal project-more-reveal reveal-on-scroll" style={revealDelay("90ms")}>
                <article className="card project-more">
                  <div className="project-more-copy">
                    <p className="project-more-title">
                      <Bow compact />
                      More coming soon
                    </p>
                    <p className="project-more-text">
                      Vantix is the big one for now. Smaller stuff and experiments end up on my GitHub.
                    </p>
                  </div>
                  <a className="project-action" href={githubUrl} rel="noreferrer" target="_blank">
                    GitHub
                    <ArrowIcon />
                  </a>
                </article>
              </div>
            </div>
          </section>

          <section className="section" id="skills">
            <SectionHeading title="What I use" />

            <div className="skills-grid">
              {skillGroups.map((group, index) => (
                <article
                  className="card spotlight skill-category reveal-on-scroll"
                  key={group.title}
                  style={revealDelay(`${index * 70}ms`)}
                >
                  <div className="skill-category-header">
                    <p className="skill-category-title">{group.title}</p>
                    <p className="skill-category-summary">{group.summary}</p>
                  </div>

                  <div className="skill-icon-grid">
                    {group.items.map((skill) => (
                      <span className="skill-tile" key={skill.name}>
                        <span
                          className={`skill-icon skill-icon-${skill.icon}`}
                          aria-hidden="true"
                        >
                          <SkillIcon name={skill.icon} mark={skill.mark} />
                        </span>
                        <span className="skill-copy">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-detail">{skill.detail}</span>
                        </span>
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section" id="contact">
            <article className="card spotlight contact-card reveal-on-scroll">
              <div className="contact-copy-block">
                <h2>
                  Say hi
                  <Bow />
                </h2>
                <p className="section-text">
                  Got a question, an idea, or found a bug in Vantix? Just send
                  me an email.
                </p>
              </div>

              <div className="contact-actions">
                <button className="contact-copy" onClick={handleCopyEmail} type="button">
                  <span className="contact-copy-label">Email</span>
                  <span className="contact-copy-email">{contactEmail}</span>
                  <span className="contact-copy-hint">Click to copy</span>
                </button>

                <div className="contact-links">
                  <a href={githubUrl} target="_blank" rel="noreferrer">
                    GitHub
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            </article>
          </section>

          <footer className="site-footer reveal-on-scroll" style={revealDelay("120ms")}>
            <p>&copy; {currentYear} Jan</p>
            <p className="site-footer-made">
              Made by me with Next.js
              <Heart />
            </p>
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
          aria-label="Back to top"
          className={`back-to-top${showBackToTop ? " is-visible" : ""}`}
          onClick={handleBackToTop}
          type="button"
        >
          <ArrowIcon direction="up" />
        </button>
      </main>
    </>
  );
}
