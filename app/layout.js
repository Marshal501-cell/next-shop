import "./globals.css";

export const metadata = {
  description: "FreshBite — a simple food shop. Browse fresh dishes by category.",
  title: "FreshBite — Food Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
