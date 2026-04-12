import "@fontsource/press-start-2p";
import "./globals.css";

export const metadata = {
  title: "Jan's Portfolio",
  description: "My portfolio"
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#171114"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
