import "./globals.css";

export const metadata = {
  description:
    "FreshBite is a simple, clean food shop menu. Browse 12 fresh dishes — burgers, pizza and pasta, Asian plates, healthy bowls and desserts — by category.",
  keywords: ["food shop", "menu", "burgers", "pizza", "pasta", "sushi", "ramen", "salad", "desserts", "FreshBite"],
  openGraph: {
    description:
      "Browse 12 fresh dishes — burgers, pizza and pasta, Asian plates, healthy bowls and desserts — by category.",
    locale: "en_US",
    title: "FreshBite — Simple, Fresh Food Shop",
    type: "website",
  },
  title: "FreshBite — Simple, Fresh Food Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
