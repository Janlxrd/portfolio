import "@fontsource/press-start-2p";
import "./globals.css";

export const metadata = {
  title: "Jan's Portfolio",
  description: "My portfolio"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
