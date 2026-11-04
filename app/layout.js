import "./globals.css";

export const metadata = {
  description:
    "FreshBite is a food menu with 12 dishes: burgers, pizza and pasta, Asian plates, healthy bowls, and desserts. Browse by category, search by name, and sort by price or rating.",
  keywords: ["food shop", "menu", "burgers", "pizza", "pasta", "sushi", "ramen", "salad", "desserts", "FreshBite"],
  openGraph: {
    description:
      "Browse 12 dishes: burgers, pizza and pasta, Asian plates, healthy bowls, and desserts. Filter by category, search by name, and sort by price or rating.",
    locale: "en_US",
    title: "FreshBite — Food Menu",
    type: "website",
  },
  title: "FreshBite — Food Menu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.getItem(\"freshbite-theme\");if(t===\"dark\"){document.documentElement.setAttribute(\"data-theme\",\"dark\")}}catch(e){}" }} />
        {children}
      </body>
    </html>
  );
}
