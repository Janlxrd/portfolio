import type { SkillIconName } from "../_lib/content";
import { Bow } from "./ornaments";

export function BrowserPreview({ name, url }: { name: string; url: string }) {
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

export function ArrowIcon({ direction = "external" }: { direction?: "external" | "up" | "down" }) {
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

export function SectionHeading({ title }: { title: string }) {
  return (
    <div className="section-heading reveal-on-scroll">
      <h2>
        {title}
        <Bow />
      </h2>
    </div>
  );
}

export function SkillIcon({ name, mark }: { name: SkillIconName; mark?: string }) {
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
