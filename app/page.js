"use client";

import { useState } from "react";

const CATEGORIES = ["All", "Main", "Asian", "Healthy", "Desserts"];

const PRODUCTS = [
  { category: "Main", description: "Juicy beef patty, cheddar, lettuce, tomato and house sauce in a toasted bun.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", name: "Classic Beef Burger", price: 12.99, rating: 4.8 },
  { category: "Main", description: "Wood-fired crust, rich tomato sauce, fresh mozzarella and basil.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80", name: "Margherita Pizza", price: 14.99, rating: 4.9 },
  { category: "Main", description: "Creamy sauce, parmesan, crispy pancetta and black pepper.", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80", name: "Spaghetti Carbonara", price: 13.5, rating: 4.7 },
  { category: "Asian", description: "Fresh salmon, avocado, cucumber and sesame, served with soy sauce.", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80", name: "California Sushi Roll", price: 16.99, rating: 4.8 },
  { category: "Asian", description: "Rich broth, soft noodles, marinated egg and tender chicken.", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80", name: "Chicken Ramen", price: 11.99, rating: 4.6 },
  { category: "Main", description: "Slow-cooked beef, fresh salsa, lime and coriander in warm tortillas.", image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80", name: "Street Tacos", price: 10.99, rating: 4.7 },
  { category: "Healthy", description: "Crisp romaine, grilled chicken, parmesan and a light Caesar dressing.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80", name: "Caesar Salad", price: 9.99, rating: 4.5 },
  { category: "Healthy", description: "Grilled chicken, brown rice, avocado, greens and lemon dressing.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80", name: "Grilled Chicken Bowl", price: 12.5, rating: 4.8 },
  { category: "Main", description: "Grilled to order, served with roasted vegetables and herb butter.", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80", name: "Grilled Steak", price: 19.99, rating: 4.9 },
  { category: "Main", description: "Toasted bread, melted cheese, grilled chicken and fresh vegetables.", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80", name: "Club Sandwich", price: 9.5, rating: 4.6 },
  { category: "Desserts", description: "Rich chocolate layers with a smooth, silky chocolate ganache.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80", name: "Chocolate Cake", price: 6.99, rating: 4.9 },
  { category: "Desserts", description: "Soft, glazed and freshly made every morning.", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80", name: "Glazed Donuts", price: 5.99, rating: 4.7 },
];

export default function Home() {
  const [category, setCategory] = useState("All");
  const visible = category === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

  return (
    <div>
      <header className="header">
        <a className="logo" href="#">FreshBite</a>
        <nav>
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section className="hero">
        <p className="eyebrow">Fresh food, every day</p>
        <h1>Simple food, made beautifully.</h1>
        <p>Browse our menu and find your next favourite dish.</p>
        <a className="button" href="#menu">Browse the menu</a>
      </section>

      <main className="container" id="menu">
        <div className="filters">
          {CATEGORIES.map((c) => (
            <button key={c} className={category === c ? "filter active" : "filter"} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid">
          {visible.map((product) => (
            <article className="card" key={product.name}>
              <img alt={product.name} loading="lazy" src={product.image} />
              <div className="card-body">
                <div className="card-top">
                  <span className="tag">{product.category}</span>
                  <span className="rating">★ {product.rating}</span>
                </div>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <strong className="price">${product.price.toFixed(2)}</strong>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="footer" id="about">
        <p><strong>FreshBite</strong> — a simple food shop demo.</p>
        <p>Open daily, 9:00 – 22:00.</p>
      </footer>
    </div>
  );
}
