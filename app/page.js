"use client";

import { useEffect, useState } from "react";

const CATEGORIES = ["All", "Main", "Asian", "Healthy", "Desserts"];

const SORTS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating-desc" },
];

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80";

const PRODUCTS = [
  { category: "Main", description: "A flame-grilled beef patty, melted cheddar, crisp lettuce and ripe tomato, finished with creamy house sauce in a soft toasted bun.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", name: "Classic Beef Burger", price: 12.99, rating: 4.8 },
  { category: "Main", description: "A blistered wood-fired crust topped with slow-simmered tomato sauce, creamy mozzarella and fresh basil — simple, classic and irresistible.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80", name: "Margherita Pizza", price: 14.99, rating: 4.9 },
  { category: "Main", description: "A silky, creamy sauce clinging to every strand, with shaved parmesan, crispy pancetta and a generous crack of black pepper.", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80", name: "Spaghetti Carbonara", price: 13.5, rating: 4.7 },
  { category: "Asian", description: "Sweet crab, buttery avocado and crunchy cucumber, rolled with sesame rice and served with soy sauce — fresh, light and beautifully balanced.", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80", name: "California Sushi Roll", price: 16.99, rating: 4.8 },
  { category: "Asian", description: "A deeply savory, warming broth with soft noodles, tender chicken and a jammy marinated egg.", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80", name: "Chicken Ramen", price: 11.99, rating: 4.6 },
  { category: "Main", description: "Slow-cooked beef, bright fresh salsa and a squeeze of lime, folded into warm tortillas with fragrant coriander.", image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80", name: "Street Tacos", price: 10.99, rating: 4.7 },
  { category: "Healthy", description: "Crunchy romaine, smoky grilled chicken and shaved parmesan, tossed in a light, lemony Caesar dressing.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80", name: "Caesar Salad", price: 9.99, rating: 4.5 },
  { category: "Healthy", description: "Char-grilled chicken over fresh greens with tomato, sweetcorn and a soft egg, brightened with a zesty lemon dressing.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80", name: "Grilled Chicken Bowl", price: 12.5, rating: 4.8 },
  { category: "Main", description: "A perfectly seared, juicy steak served with roasted vegetables and a melting knob of herb butter.", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80", name: "Grilled Steak", price: 19.99, rating: 4.9 },
  { category: "Main", description: "Layers of grilled chicken, melted cheese and garden-fresh vegetables, stacked in golden toasted bread.", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80", name: "Club Sandwich", price: 9.5, rating: 4.6 },
  { category: "Desserts", description: "Dark, moist chocolate layers wrapped in a glossy, silky ganache — rich, without being heavy.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80", name: "Chocolate Cake", price: 6.99, rating: 4.9 },
  { category: "Desserts", description: "Soft, pillowy rings with sweet frosting and sprinkles, made fresh every morning.", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80", name: "Frosted Donuts", price: 5.99, rating: 4.7 },
];

function sortProducts(products, sort) {
  const list = [...products];
  if (sort === "price-asc") return list.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return list.sort((a, b) => b.price - a.price);
  if (sort === "rating-desc") return list.sort((a, b) => b.rating - a.rating);
  return list;
}

function handleImageError(event) {
  if (!event.currentTarget.dataset.fallback) {
    event.currentTarget.dataset.fallback = "1";
    event.currentTarget.src = FALLBACK_IMAGE;
  }
}

export default function Home() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  const search = query.trim().toLowerCase();
  const filtered = PRODUCTS.filter((product) => {
    const inCategory = category === "All" || product.category === category;
    const inSearch = search === "" || product.name.toLowerCase().includes(search);
    return inCategory && inSearch;
  });
  const visible = sortProducts(filtered, sort);

  const clearFilters = () => {
    setCategory("All");
    setQuery("");
    setSort("featured");
  };

  return (
    <div>
      <a className="skip-link" href="#menu">Skip to menu</a>
      <header className="header">
        <a className="logo" href="#">Fresh<span>Bite</span></a>
        <nav>
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section className="hero">
        <p className="eyebrow">Fresh, simple, delicious</p>
        <h1>Good food, <span>beautifully simple.</span></h1>
        <p>Twelve favorite dishes, from flame-grilled classics to fresh Asian plates and sweet finishes — browse the menu and find the one you are craving.</p>
        <a className="button" href="#menu">Browse the menu ↓</a>
        <div className="hero-stats">
          <span><strong>12</strong> dishes</span>
          <span><strong>5</strong> categories</span>
          <span><strong>★ 4.9</strong> top rated</span>
        </div>
      </section>

      <main className="container" id="menu">
        <div className="menu-heading">
          <h2>Our menu</h2>
          <p aria-live="polite">Showing {visible.length} of {PRODUCTS.length} dishes</p>
        </div>

        <div className="controls">
          <label className="control">
            <span>Search dishes</span>
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try “pizza” or “salad”…"
              type="search"
              value={query}
            />
          </label>
          <label className="control">
            <span>Sort by</span>
            <select onChange={(event) => setSort(event.target.value)} value={sort}>
              {SORTS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="filters" role="group" aria-label="Filter by category">
          {CATEGORIES.map((c) => {
            const count = c === "All" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c).length;
            return (
              <button key={c} aria-pressed={category === c} className={category === c ? "filter active" : "filter"} onClick={() => setCategory(c)}>
                {c} <span className="count">{count}</span>
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <div className="empty">
            <h2>No dishes found</h2>
            <p>No dish matches your search and filters. Try a different name or category.</p>
            <button className="button" onClick={clearFilters}>Clear search and filters</button>
          </div>
        ) : (
          <div className="grid">
            {visible.map((product) => (
              <article className="card" key={product.name}>
                <div className="card-image">
                  <img alt={product.name} loading="lazy" onError={handleImageError} src={product.image} />
                  <span className="rating-badge" aria-label={`Rated ${product.rating} out of 5`}><span aria-hidden="true">★</span> {product.rating}</span>
                </div>
                <div className="card-body">
                  <span className="tag">{product.category}</span>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="price-row">
                    <strong className="price">${product.price.toFixed(2)}</strong>
                    <span className="price-note">Menu item</span>
                  </div>
                  <button className="details-button" onClick={() => setSelected(product)}>
                    View details
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dish-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close details">×</button>
            <img alt={selected.name} onError={handleImageError} src={selected.image} />
            <div className="modal-body">
              <span className="tag">{selected.category}</span>
              <h2 id="dish-title">{selected.name}</h2>
              <p>{selected.description}</p>
              <p className="modal-meta">
                <span aria-label={`Rated ${selected.rating} out of 5`}><span aria-hidden="true">★</span> {selected.rating} rating</span>
                <strong>${selected.price.toFixed(2)}</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      <footer className="footer" id="about">
        <p><strong>FreshBite</strong> — a simple food shop menu.</p>
        <p>We keep it simple: fresh ingredients, honest flavors and a short menu, done well.</p>
        <p>Display-only demo: browse the menu by category. No cart, no checkout, no ordering.</p>
      </footer>
    </div>
  );
}
