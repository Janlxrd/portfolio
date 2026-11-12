import { ImageResponse } from "next/og";

export const alt = "Jan, student and developer from Slovakia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const colors = {
  bg: "#0b090a",
  text: "#f6f0f2",
  soft: "#cbbfc3",
  muted: "#8f8287",
  pink: "#ffc9d5",
  accent: "#f0708b",
  live: "#6ee7a8"
};

const tags = ["Python", "TypeScript", "PostgreSQL", "Docker"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: colors.bg,
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(240,112,139,0.38), transparent 45%), radial-gradient(circle at 5% 100%, rgba(255,201,213,0.16), transparent 40%)",
          color: colors.text,
          fontFamily: "sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase"
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: colors.accent,
                boxShadow: `0 0 24px ${colors.accent}`
              }}
            />
            jan
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 22px",
              border: "1px solid rgba(110,231,168,0.3)",
              borderRadius: 999,
              background: "rgba(110,231,168,0.08)",
              color: colors.live,
              fontSize: 24
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 999, background: colors.live }} />
            2+ yrs back-end
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            Hey, I&apos;m&nbsp;<span style={{ color: colors.accent }}>Jan.</span>
          </div>
          <div style={{ display: "flex", fontSize: 38, color: colors.soft }}>
            Student from Slovakia. I write code, mostly back-end.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "10px 22px",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 14,
                background: "rgba(255,255,255,0.04)",
                color: colors.pink,
                fontSize: 26
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
