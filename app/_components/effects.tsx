"use client";

import { useEffect, useRef, useState } from "react";

import { heroRoles, morphTitleText } from "../_lib/content";
import { Cinnamoroll } from "./ornaments";

const scrambleCharacters = "!<>-_\\/[]{}=+*^?#";

export function CustomCursor() {
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
      // Only hide the native cursor once the custom one is actually rendering.
      document.documentElement.classList.add("has-custom-cursor");
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
      document.documentElement.classList.remove("has-custom-cursor");
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

type MorphGlyph = {
  char: string;
  resolved: boolean;
  active: boolean;
};

const createHiddenGlyphs = (text: string): MorphGlyph[] =>
  text.split("").map((char) => ({
    char: char === " " ? " " : "",
    resolved: char === " ",
    active: false
  }));

export function MorphingTitle() {
  const [glyphs, setGlyphs] = useState<MorphGlyph[]>(() =>
    createHiddenGlyphs(morphTitleText)
  );
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setGlyphs(
        morphTitleText.split("").map((char) => ({
          char,
          resolved: true,
          active: false
        }))
      );
      setAnimationComplete(true);
      return;
    }

    const timeouts: number[] = [];
    const intervals: number[] = [];

    morphTitleText.split("").forEach((targetChar, index, letters) => {
      const timeout = window.setTimeout(() => {
        if (targetChar === " ") {
          setGlyphs((current) => {
            const next = [...current];
            next[index] = { char: " ", resolved: true, active: false };
            return next;
          });
          return;
        }

        let iteration = 0;
        const interval = window.setInterval(() => {
          iteration += 1;
          const isResolved = iteration > 8;

          setGlyphs((current) => {
            const next = [...current];
            next[index] = {
              char: isResolved
                ? targetChar
                : scrambleCharacters[
                    Math.floor(Math.random() * scrambleCharacters.length)
                  ],
              resolved: isResolved,
              active: !isResolved
            };
            return next;
          });

          if (isResolved) {
            window.clearInterval(interval);

            if (index === letters.length - 1) {
              setAnimationComplete(true);
            }
          }
        }, 44);

        intervals.push(interval);
      }, 160 + index * 78);

      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
      intervals.forEach((interval) => window.clearInterval(interval));
    };
  }, []);

  const words = morphTitleText.split(" ");
  let charOffset = 0;

  return (
    <h1 aria-label={morphTitleText} className="morph-title">
      <span aria-hidden="true" className="morph-title-line">
        {words.map((word, wordIndex) => {
          const start = charOffset;
          charOffset += word.length + 1;
          const isLastWord = wordIndex === words.length - 1;

          return (
            <span
              className={`morph-word${isLastWord ? " is-accent" : ""}`}
              key={`${word}-${wordIndex}`}
            >
              {word.split("").map((targetChar, letterIndex) => {
                const glyph = glyphs[start + letterIndex];

                return (
                  <span
                    className={[
                      "morph-title-char",
                      glyph.active ? "is-scrambling" : "",
                      glyph.resolved ? "is-resolved" : ""
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={`${targetChar}-${letterIndex}`}
                  >
                    <span className="morph-ghost">{targetChar}</span>
                    <span className="morph-live">{glyph.char}</span>
                  </span>
                );
              })}
              {isLastWord ? (
                <>
                  <span
                    className={`typing-cursor${animationComplete ? " is-settled" : ""}`}
                    aria-hidden="true"
                  />
                  <Cinnamoroll />
                </>
              ) : null}
            </span>
          );
        })}
      </span>
    </h1>
  );
}

export function RoleCarousel() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setDisplayText(heroRoles[0]);
      return;
    }

    const currentRole = heroRoles[roleIndex];
    let timeout = 0;

    if (phase === "typing") {
      if (displayText.length < currentRole.length) {
        timeout = window.setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 72);
      } else {
        timeout = window.setTimeout(() => {
          setPhase("pause");
        }, 420);
      }
    }

    if (phase === "pause") {
      timeout = window.setTimeout(() => {
        setPhase("deleting");
      }, 1550);
    }

    if (phase === "deleting") {
      if (displayText.length > 0) {
        timeout = window.setTimeout(() => {
          setDisplayText((current) => current.slice(0, -1));
        }, 38);
      } else {
        setPhase("typing");
        setRoleIndex((current) => (current + 1) % heroRoles.length);
      }
    }

    return () => {
      window.clearTimeout(timeout);
    };
  }, [displayText, phase, roleIndex]);

  return (
    <p className="hero-role-line" aria-label={`I'm a ${heroRoles[roleIndex]}`}>
      <span>I&apos;m a</span>
      <span className="role-carousel" aria-hidden="true">
        {displayText || "\u00A0"}
        <span className="role-cursor" aria-hidden="true" />
      </span>
    </p>
  );
}
