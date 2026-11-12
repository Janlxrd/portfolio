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
  tech?: string[];
  highlights?: string[];
  actions?: ProjectAction[];
  previewUrl?: string;
};

type SkillIconName =
  | "python"
  | "typescript"
  | "express"
  | "postgres"
  | "prisma"
  | "redis"
  | "docker"
  | "language";

type SkillItem = {
  name: string;
  detail: string;
  icon: SkillIconName;
  mark?: string;
};

type SkillGroup = {
  title: string;
  summary: string;
  items: SkillItem[];
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
const morphTitleText = "Hey, I'm Jan.";
const scrambleCharacters = "!<>-_\\/[]{}=+*^?#";
const heroRoles = ["student", "back-end dev", "Discord bot maker", "Python fan"] as const;

const featuredProjects: FeaturedProject[] = [
  {
    title: "Vantix",
    category: "Discord bot",
    status: "Live",
    description:
      "My Discord bot. It does a bit of everything, anyone can add it to their server, and it has its own website.",
    tech: ["TypeScript", "Discord API", "Slash commands"],
    highlights: ["Public, anyone can invite it", "Has its own website", "Online right now"],
    previewUrl: "vantix.top",
    actions: [
      {
        href: "https://vantix.top",
        label: "Website",
        primary: true
      },
      {
        href:
          "https://discord.com/oauth2/authorize?client_id=1495397495868756058&scope=bot+applications.commands&integration_type=0&permissions=1237219405014",
        label: "Invite to Discord"
      }
    ]
  }
];

const githubUrl = "https://github.com/Janlxrd";

const skillGroups: SkillGroup[] = [
  {
    title: "Coding",
    summary: "What most of my code is written in.",
    items: [
      { name: "Python", detail: "Favorite language", icon: "python" },
      { name: "TypeScript", detail: "When I want types", icon: "typescript" },
      { name: "Express", detail: "Quick APIs", icon: "express" }
    ]
  },
  {
    title: "Databases",
    summary: "Where the data ends up.",
    items: [
      { name: "PostgreSQL", detail: "My go-to database", icon: "postgres" },
      { name: "Prisma", detail: "Talking to the DB", icon: "prisma" },
      { name: "Redis", detail: "Caching, mostly", icon: "redis" }
    ]
  },
  {
    title: "Tools",
    summary: "So nothing is \"works on my machine\".",
    items: [{ name: "Docker", detail: "Containers", icon: "docker" }]
  },
  {
    title: "Languages",
    summary: "The ones people actually speak.",
    items: [
      { name: "Slovak", detail: "Native", icon: "language", mark: "SK" },
      { name: "English", detail: "Pretty good", icon: "language", mark: "EN" },
      { name: "Spanish", detail: "A little", icon: "language", mark: "ES" },
      { name: "German", detail: "A little", icon: "language", mark: "DE" }
    ]
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

const inkColor = "#2a1d21";

function Bow({ compact = false }: { compact?: boolean }) {
  return (
    <span className="ornament ornament-bow" aria-hidden="true">
      <svg className={`bow${compact ? " bow-compact" : ""}`} viewBox="0 0 30 20" focusable="false">
        <g transform="translate(15 10.4)">
          <path
            d="M-1.2-.4C-4.4-6.4-12-7.6-12.8-1.6c-.6 5.2 6.2 6.8 11.6 3.4Z"
            fill="#e8395a"
            stroke={inkColor}
            strokeLinejoin="round"
            strokeWidth="1.6"
          />
          <path
            d="M1.2-.4C4.4-6.4 12-7.6 12.8-1.6c.6 5.2-6.2 6.8-11.6 3.4Z"
            fill="#e8395a"
            stroke={inkColor}
            strokeLinejoin="round"
            strokeWidth="1.6"
          />
          <path
            d="M-4.4-1.8c-2.2-.6-4.4-.2-5.8 1M4.4-1.8c2.2-.6 4.4-.2 5.8 1"
            fill="none"
            stroke={inkColor}
            strokeLinecap="round"
            strokeWidth="1.1"
            opacity="0.55"
          />
          <ellipse cx="0" cy="0.4" rx="3.3" ry="3.7" fill="#e8395a" stroke={inkColor} strokeWidth="1.6" />
          <ellipse cx="-8.6" cy="-3.2" rx="1.6" ry="0.9" fill="#fff" opacity="0.5" transform="rotate(-25 -8.6 -3.2)" />
        </g>
      </svg>
    </span>
  );
}

function Heart() {
  return (
    <span className="ornament ornament-heart" aria-hidden="true">
      <svg className="heart" viewBox="0 0 20 18" focusable="false">
        <path
          d="M10 16.4C4.2 12.6 1.6 9.6 1.6 6.3c0-2.6 2-4.5 4.3-4.5 1.7 0 3.1 1 4.1 2.6 1-1.6 2.4-2.6 4.1-2.6 2.3 0 4.3 1.9 4.3 4.5 0 3.3-2.6 6.3-8.4 10.1Z"
          fill="#f0708b"
          stroke={inkColor}
          strokeLinejoin="round"
          strokeWidth="1.1"
        />
        <ellipse cx="5.9" cy="5.9" rx="1.5" ry="1" fill="#fff" opacity="0.55" transform="rotate(-35 5.9 5.9)" />
      </svg>
    </span>
  );
}

function KittyMark() {
  return (
    <span className="ornament ornament-kitty" aria-hidden="true">
      <svg className="kitty-mark" viewBox="0 0 52 40" focusable="false">
        {/* ears */}
        <path
          d="M6.4 17.4 7.6 5.6c.2-2.4 2-3.2 3.9-1.9l9.4 6.2ZM45.6 17.4 44.4 5.6c-.2-2.4-2-3.2-3.9-1.9l-9.4 6.2Z"
          fill="#fffafb"
          stroke={inkColor}
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
        {/* head */}
        <path
          d="M26 6.6c11.6 0 21.2 6.6 21.2 16.4 0 9.4-9.2 14.8-21.2 14.8S4.8 32.4 4.8 23C4.8 13.2 14.4 6.6 26 6.6Z"
          fill="#fffafb"
          stroke={inkColor}
          strokeWidth="1.7"
        />
        {/* eyes */}
        <ellipse cx="17.4" cy="22.8" rx="1.85" ry="2.55" fill={inkColor} />
        <ellipse cx="34.6" cy="22.8" rx="1.85" ry="2.55" fill={inkColor} />
        {/* nose */}
        <ellipse cx="26" cy="26.6" rx="2.5" ry="1.7" fill="#f6c445" stroke={inkColor} strokeWidth="1.2" />
        {/* whiskers */}
        <path
          d="M1.2 20.4 10.4 22M.8 25.6h9.4M1.4 30.8l9-2.6M50.8 20.4 41.6 22M51.2 25.6h-9.4M50.6 30.8l-9-2.6"
          fill="none"
          stroke={inkColor}
          strokeLinecap="round"
          strokeWidth="1.6"
        />
        {/* bow over her left ear */}
        <g transform="translate(38.4 8.6) rotate(-12)">
          <path
            d="M-1.2-.4C-4.4-6.4-12-7.6-12.8-1.6c-.6 5.2 6.2 6.8 11.6 3.4Z"
            fill="#e8395a"
            stroke={inkColor}
            strokeLinejoin="round"
            strokeWidth="1.6"
          />
          <path
            d="M1.2-.4C4.4-6.4 12-7.6 12.8-1.6c.6 5.2-6.2 6.8-11.6 3.4Z"
            fill="#e8395a"
            stroke={inkColor}
            strokeLinejoin="round"
            strokeWidth="1.6"
          />
          <path
            d="M-4.4-1.8c-2.2-.6-4.4-.2-5.8 1M4.4-1.8c2.2-.6 4.4-.2 5.8 1"
            fill="none"
            stroke={inkColor}
            strokeLinecap="round"
            strokeWidth="1.1"
            opacity="0.55"
          />
          <ellipse cx="0" cy="0.4" rx="3.3" ry="3.7" fill="#e8395a" stroke={inkColor} strokeWidth="1.6" />
          <ellipse cx="-8.6" cy="-3.2" rx="1.6" ry="0.9" fill="#fff" opacity="0.5" transform="rotate(-25 -8.6 -3.2)" />
        </g>
      </svg>
    </span>
  );
}

function Cinnamoroll() {
  const line = "#5a7db0";
  const fur = "#fffdfd";

  return (
    <span className="ornament ornament-cinna" aria-hidden="true">
      <svg className="cinna" viewBox="0 0 80 70" focusable="false">
        {/* cinnamon-roll tail */}
        <circle cx="61" cy="57" r="7.4" fill={fur} stroke={line} strokeWidth="1.6" />
        <path
          d="M61 57.6c-.9 0-1.4-.7-1.2-1.4.3-1 1.6-1.3 2.4-.7 1.2.8 1 2.7-.3 3.4-1.7 1-4 0-4.4-1.9-.5-2.3 1.4-4.4 3.7-4.4 2.9 0 5 2.6 4.6 5.4"
          fill="none"
          stroke={line}
          strokeLinecap="round"
          strokeWidth="1.4"
        />
        {/* body, arms, feet */}
        <ellipse cx="40" cy="55" rx="14.6" ry="10.4" fill={fur} stroke={line} strokeWidth="1.6" />
        <ellipse cx="27.4" cy="53.2" rx="4" ry="3.2" fill={fur} stroke={line} strokeWidth="1.5" transform="rotate(-25 27.4 53.2)" />
        <ellipse cx="52.6" cy="53.2" rx="4" ry="3.2" fill={fur} stroke={line} strokeWidth="1.5" transform="rotate(25 52.6 53.2)" />
        <ellipse cx="33" cy="64.6" rx="5.2" ry="3" fill={fur} stroke={line} strokeWidth="1.5" />
        <ellipse cx="47" cy="64.6" rx="5.2" ry="3" fill={fur} stroke={line} strokeWidth="1.5" />
        {/* long droopy ears */}
        <path
          d="M27 14.6C16.4 11.4 5.6 17.6 2.6 30.4 1 37.6 2.8 44.4 7.2 43.6c4-.7 5.6-8.6 9.6-14.6 2.4-3.6 5.6-6 8.8-7Z"
          fill={fur}
          stroke={line}
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
        <path
          d="M53 14.6c10.6-3.2 21.4 3 24.4 15.8 1.6 7.2-.2 14-4.6 13.2-4-.7-5.6-8.6-9.6-14.6-2.4-3.6-5.6-6-8.8-7Z"
          fill={fur}
          stroke={line}
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
        {/* head */}
        <path
          d="M40 9.4c14.6 0 23.4 8.2 23.4 19.8 0 11.4-10 17.8-23.4 17.8S16.6 40.6 16.6 29.2C16.6 17.6 25.4 9.4 40 9.4Z"
          fill={fur}
          stroke={line}
          strokeWidth="1.6"
        />
        {/* eyes */}
        <ellipse cx="31" cy="30.4" rx="3" ry="3.7" fill="#2b5fb5" />
        <ellipse cx="49" cy="30.4" rx="3" ry="3.7" fill="#2b5fb5" />
        <circle cx="32" cy="29" r="1.25" fill="#fff" />
        <circle cx="50" cy="29" r="1.25" fill="#fff" />
        <circle cx="30.2" cy="32.2" r="0.6" fill="#fff" opacity="0.8" />
        <circle cx="48.2" cy="32.2" r="0.6" fill="#fff" opacity="0.8" />
        {/* cheeks */}
        <ellipse cx="24.6" cy="36.6" rx="4.2" ry="2.4" fill="#ffb3c4" opacity="0.9" />
        <ellipse cx="55.4" cy="36.6" rx="4.2" ry="2.4" fill="#ffb3c4" opacity="0.9" />
        {/* little mouth */}
        <path
          d="M37.4 36c.6 1.5 2 1.5 2.6 0 .6 1.5 2 1.5 2.6 0"
          fill="none"
          stroke={line}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
      </svg>
    </span>
  );
}

function Apple() {
  return (
    <span className="ornament ornament-apple" aria-hidden="true">
      <svg className="apple" viewBox="0 0 20 20" focusable="false">
        <path
          d="M10 6.4C8.2 5 3.2 4.7 2.6 9.7c-.5 4.4 2.8 8.7 5.4 8.5 1-.1 1.4-.6 2-.6s1 .5 2 .6c2.6.2 5.9-4.1 5.4-8.5-.6-5-5.6-4.7-7.4-3.3Z"
          fill="#ef5a74"
          stroke={inkColor}
          strokeLinejoin="round"
          strokeWidth="1.1"
        />
        <path d="M10 6.4c0-1.8.4-3.2 1.4-4.4" fill="none" stroke={inkColor} strokeLinecap="round" strokeWidth="1.3" />
        <path
          d="M11.2 3.8c1.3-2 4-2.3 5.3-1.5-.8 1.8-3.4 2.6-5.3 1.5Z"
          fill="#8fbf5f"
          stroke={inkColor}
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <ellipse cx="6" cy="9.6" rx="1.1" ry="1.7" fill="#fff" opacity="0.45" transform="rotate(20 6 9.6)" />
      </svg>
    </span>
  );
}

function BrowserPreview({ name, url }: { name: string; url: string }) {
  return (
    <div className="browser-frame">
      <div className="browser-bar">
        <span className="browser-dots">
          <span />
          <span />
          <span />
        </span>
        <span className="browser-url">
          <svg viewBox="0 0 16 16" focusable="false">
            <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" fill="currentColor" />
            <path d="M5.5 7V5.5a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {url}
        </span>
      </div>

      <div className="browser-body">
        <div className="mock-message">
          <span className="mock-avatar mock-avatar-user" />
          <div className="mock-message-content">
            <span className="mock-author">you</span>
            <span className="mock-command">/help</span>
          </div>
        </div>

        <div className="mock-message">
          <span className="mock-avatar mock-avatar-bot">{name.charAt(0)}</span>
          <div className="mock-message-content">
            <span className="mock-author">
              {name}
              <span className="mock-bot-tag">BOT</span>
            </span>
            <div className="mock-embed">
              <span className="mock-embed-title">Here&apos;s what I can do</span>
              <span className="mock-line" style={{ width: "88%" }} />
              <span className="mock-line" style={{ width: "72%" }} />
              <span className="mock-line" style={{ width: "54%" }} />
              <div className="mock-buttons">
                <span className="mock-button is-primary">Invite</span>
                <span className="mock-button">Docs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowIcon({ direction = "external" }: { direction?: "external" | "up" | "down" }) {
  const rotation = direction === "up" ? -90 : direction === "down" ? 90 : -45;

  return (
    <svg
      className="arrow-icon"
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function SectionHeading({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <div className="section-heading reveal-on-scroll">
      <p className="eyebrow">
        <span className="eyebrow-index">{index}</span>
        <Bow compact />
        {label}
      </p>
      <h2>{title}</h2>
    </div>
  );
}

function SkillIcon({ name, mark }: { name: SkillIconName; mark?: string }) {
  if (name === "language") {
    return <span className="skill-icon-mark">{mark}</span>;
  }

  if (name === "python") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path
          d="M9 5.8C9 3.7 10.7 2 12.8 2h5.7C20.4 2 22 3.6 22 5.5V10h-7.7c-2.9 0-5.3 2.4-5.3 5.3v1.2H5.5C3.6 16.5 2 14.9 2 13V9.7C2 7.5 3.7 5.8 5.9 5.8H9Z"
          fill="currentColor"
          opacity="0.88"
        />
        <path
          d="M23 26.2c0 2.1-1.7 3.8-3.8 3.8h-5.7C11.6 30 10 28.4 10 26.5V22h7.7c2.9 0 5.3-2.4 5.3-5.3v-1.2h3.5c1.9 0 3.5 1.6 3.5 3.5v3.3c0 2.2-1.7 3.9-3.9 3.9H23Z"
          fill="currentColor"
          opacity="0.55"
        />
        <circle cx="13" cy="6.8" r="1.1" fill="#fff7fa" />
        <circle cx="19" cy="25.2" r="1.1" fill="#fff7fa" />
      </svg>
    );
  }

  if (name === "typescript") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <rect x="4" y="4" width="24" height="24" rx="4" fill="currentColor" />
        <path
          d="M9 12.2h8.2v2.3h-2.8v8.1h-2.6v-8.1H9v-2.3Zm9 8.8 1.4-1.7c.7.6 1.5 1 2.4 1 .8 0 1.3-.3 1.3-.9 0-.5-.4-.8-1.7-1.3-1.8-.7-3-1.5-3-3.2 0-1.9 1.5-3 3.7-3 1.5 0 2.7.5 3.6 1.3l-1.3 1.8c-.7-.5-1.4-.8-2.2-.8-.7 0-1.1.3-1.1.8 0 .6.5.8 1.9 1.4 1.9.7 2.8 1.6 2.8 3.1 0 2-1.5 3.2-4 3.2-1.6 0-3-.6-3.8-1.7Z"
          fill="#fff7fa"
        />
      </svg>
    );
  }

  if (name === "express") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <rect x="4" y="5" width="24" height="22" rx="5" fill="currentColor" opacity="0.14" />
        <path
          d="M8 22V10h14.7v2.5H11v2.2h10.5v2.4H11v2.4h12v2.5H8Zm16.2 0-3.4-4.3 3.3-4.1h-3.2l-1.7 2.2-1.7-2.2h-3.3l3.4 4.2-3.4 4.2h3.2l1.8-2.3 1.8 2.3h3.2Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "postgres") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <ellipse cx="16" cy="8" rx="9.5" ry="4.5" fill="currentColor" opacity="0.86" />
        <path
          d="M6.5 8v10c0 2.5 4.3 4.5 9.5 4.5s9.5-2 9.5-4.5V8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
        />
        <path
          d="M6.5 13c0 2.5 4.3 4.5 9.5 4.5s9.5-2 9.5-4.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
          opacity="0.65"
        />
      </svg>
    );
  }

  if (name === "prisma") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path
          d="M17.2 3.5 6.2 24.1c-.8 1.5.5 3.2 2.1 2.8l15.5-4.5c1.5-.4 2.1-2.2 1.2-3.5L19.7 4c-.6-1.3-1.9-1.5-2.5-.5Zm.7 5.7 4.1 10.5-10.1 3 6-13.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "redis") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M5 11.5 16 6l11 5.5L16 17 5 11.5Z" fill="currentColor" />
        <path d="M5 16.2 16 21.8l11-5.6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" opacity="0.78" />
        <path d="M5 20.8 16 26.4l11-5.6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" opacity="0.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        d="M10 9h4v4h-4V9Zm5 0h4v4h-4V9Zm5 0h4v4h-4V9ZM7 14h4v4H7v-4Zm5 0h4v4h-4v-4Zm5 0h4v4h-4v-4Zm5 0h4v4h-4v-4ZM5 19h22c-.6 4.2-3.9 7-8.5 7h-5C8.9 26 5.6 23.2 5 19Z"
        fill="currentColor"
      />
      <path d="M24.5 17.5c1.5 0 2.8-1.1 3.1-2.5 1.2.7 1.9 1.9 2.1 3.4-1.4.3-2.8 0-4-.9h-1.2Z" fill="currentColor" opacity="0.6" />
    </svg>
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

function MorphingTitle() {
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
                <span
                  className={`typing-cursor${animationComplete ? " is-settled" : ""}`}
                  aria-hidden="true"
                />
              ) : null}
            </span>
          );
        })}
        <Cinnamoroll />
      </span>
    </h1>
  );
}

function RoleCarousel() {
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
    <p className="hero-role-line" aria-label={`I am a ${heroRoles[roleIndex]}.`}>
      <span>I am a</span>
      <span className="role-carousel" aria-hidden="true">
        {displayText || "\u00A0"}
        <span className="role-cursor" aria-hidden="true" />
      </span>
    </p>
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
        <div className="backdrop-grid" />
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
              <p className="status-pill">
                <span className="status-dot" aria-hidden="true" />
                In school, coding on the side
              </p>

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

              <dl className="hero-stats">
                <div>
                  <dt>Back-end</dt>
                  <dd>2+ yrs</dd>
                </div>
                <div>
                  <dt>Fav language</dt>
                  <dd>Python</dd>
                </div>
                <div>
                  <dt>Based in</dt>
                  <dd>Slovakia</dd>
                </div>
              </dl>
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
                <span className="live-badge">
                  <span className="status-dot" aria-hidden="true" />
                  Now
                </span>
              </div>
              <h2>Mostly school, honestly.</h2>
              <p>
                School takes up most of my week, so I code whenever I get
                some free time. Usually that means working on Vantix or
                trying out something I haven&apos;t used before.
              </p>

              <div className="note-tags">
                <span>School</span>
                <span>Vantix</span>
                <span>Side projects</span>
              </div>
            </aside>
          </section>

          <section className="section" id="about">
            <SectionHeading index="01" label="About" title="A bit about me." />

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
            <SectionHeading index="02" label="Projects" title="Stuff I've made." />

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

                        {project.highlights?.length ? (
                          <ul className="project-highlights">
                            {project.highlights.map((highlight) => (
                              <li key={highlight}>{highlight}</li>
                            ))}
                          </ul>
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
                      More coming soon.
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
            <SectionHeading index="03" label="Skills" title="What I use." />

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
                <p className="eyebrow">
                  <span className="eyebrow-index">04</span>
                  <Bow compact />
                  Contact
                </p>
                <h2>Say hi.</h2>
                <p className="section-text">
                  Got a question, an idea, or found a bug in Vantix? Send me an
                  email or message me on Discord.
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
                  <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                    Instagram
                    <ArrowIcon />
                  </a>
                  <a href="https://discord.com/" target="_blank" rel="noreferrer">
                    Discord
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
