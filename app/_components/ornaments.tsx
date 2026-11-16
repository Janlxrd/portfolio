const inkColor = "#2a1d21";

export function Bow({ compact = false }: { compact?: boolean }) {
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

export function Heart() {
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

export function KittyMark() {
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

export function Cinnamoroll() {
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

export function Apple() {
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
