/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#171114",
        "bg-soft": "#24181d",
        pink: "#ffd4dc",
        "pink-soft": "#f7c4cf",
        cream: "#ead9d2",
        ink: "#20181b",
        muted: "#57494f",
        accent: "#d94762",
        "accent-dark": "#8e253b"
      },
      fontFamily: {
        display: ['"Press Start 2P"', "monospace"],
        body: ['"Aptos"', '"Segoe UI"', "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 60px rgba(8, 4, 6, 0.28)"
      }
    }
  },
  plugins: []
};
