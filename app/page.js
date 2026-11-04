"use client";

import { useEffect, useRef, useState } from "react";

const CATEGORIES = ["All", "Main", "Asian", "Healthy", "Desserts"];

const SORTS = [
  { label: "Menu order", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest rated", value: "rating-desc" },
];

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80";

const PRODUCTS = [
  { category: "Main", description: "A flame-grilled beef patty, melted cheddar, crisp lettuce and ripe tomato, finished with creamy house sauce in a soft toasted bun.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", name: "Classic Beef Burger", price: 12.99, rating: 4.8 },
  { category: "Main", description: "A blistered wood-fired crust topped with slow-simmered tomato sauce, creamy mozzarella and fresh basil.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80", name: "Margherita Pizza", price: 14.99, rating: 4.9 },
  { category: "Main", description: "A silky, creamy sauce clinging to every strand, with shaved parmesan, crispy pancetta and a generous crack of black pepper.", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80", name: "Spaghetti Carbonara", price: 13.5, rating: 4.7 },
  { category: "Asian", description: "Sweet crab, buttery avocado and crunchy cucumber, rolled with sesame rice and served with soy sauce.", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80", name: "California Sushi Roll", price: 16.99, rating: 4.8 },
  { category: "Asian", description: "A deeply savory, warming broth with soft noodles, tender chicken and a jammy marinated egg.", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80", name: "Chicken Ramen", price: 11.99, rating: 4.6 },
  { category: "Main", description: "Slow-cooked beef, bright fresh salsa and a squeeze of lime, folded into warm tortillas with fragrant coriander.", image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80", name: "Street Tacos", price: 10.99, rating: 4.7 },
  { category: "Healthy", description: "Crunchy romaine, smoky grilled chicken and shaved parmesan, tossed in a light, lemony Caesar dressing.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80", name: "Caesar Salad", price: 9.99, rating: 4.5 },
  { category: "Healthy", description: "Char-grilled chicken over fresh greens with tomato, sweetcorn and a soft egg, brightened with a zesty lemon dressing.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80", name: "Grilled Chicken Bowl", price: 12.5, rating: 4.8 },
  { category: "Main", description: "A seared, juicy steak served with roasted vegetables and a melting knob of herb butter.", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80", name: "Grilled Steak", price: 19.99, rating: 4.9 },
  { category: "Main", description: "Layers of grilled chicken, melted cheese and garden-fresh vegetables, stacked in golden toasted bread.", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80", name: "Club Sandwich", price: 9.5, rating: 4.6 },
  { category: "Desserts", description: "Dark, moist chocolate layers wrapped in a glossy, silky ganache.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80", name: "Chocolate Cake", price: 6.99, rating: 4.9 },
  { category: "Desserts", description: "Soft, pillowy rings with sweet frosting and sprinkles.", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80", name: "Frosted Donuts", price: 5.99, rating: 4.7 },
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
  } else {
    event.currentTarget.style.visibility = "hidden";
  }
}

function ratingStars(rating) {
  const full = Math.floor(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

export default function Home() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [selected, setSelected] = useState(null);
  const [modalClosing, setModalClosing] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastFocusedRef = useRef(null);

  const closeModal = () => {
    if (modalClosing) return;
    setModalClosing(true);
    window.setTimeout(() => {
      setSelected(null);
      setModalClosing(false);
    }, 240);
  };

  useEffect(() => {
    if (!selected) return;
    lastFocusedRef.current = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
        return;
      }
      if (event.key !== "Tab" || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      if (lastFocusedRef.current instanceof HTMLElement) {
        lastFocusedRef.current.focus();
      }
    };
  }, [selected]);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.12 }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [category, query, sort]);

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
    <div id="top">
      <a className="skip-link" href="#menu">Skip to menu</a>
      <header className="header">
        <div className="header-inner">
          <a className="logo" href="#top"><span className="logo-mark" aria-hidden="true">F</span>Fresh<span>Bite</span></a>
          <div className="header-actions">
            <nav aria-label="Primary">
              <a href="#top">Home</a>
              <a href="#menu">Menu</a>
              <a href="#about">About</a>
            </nav>
            <a className="header-cta" href="#menu">Browse Menu</a>
          </div>
        </div>
      </header>

      <section className="hero">
        <p className="eyebrow">FreshBite food menu</p>
        <h1>A short menu of <span>fresh flavors.</span></h1>
        <p>Twelve dishes: flame-grilled classics, fresh Asian plates, lighter bowls, and sweet finishes. Browse by category, search by name, and open any dish for its details.</p>
        <a className="button" href="#menu">Browse the menu ↓</a>
        <div className="hero-stats">
          <span><strong>12</strong> dishes</span>
          <span><strong>5</strong> categories</span>
          <span><strong>★ 4.9</strong> highest rating</span>
        </div>
      </section>

      <main className="container" id="menu" tabIndex={-1}>
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
            {visible.map((product, index) => (
              <article className="card reveal" key={product.name} style={{ "--reveal-delay": `${Math.min(index, 11) * 60}ms` }}>
                <div className="card-tilt">
                  <div className="card-image">
                    <img alt={product.name} loading="lazy" onError={handleImageError} src={product.image} />
                    <span className="rating-badge" aria-label={`Rated ${product.rating} out of 5`}><span aria-hidden="true">{ratingStars(product.rating)}</span> {product.rating.toFixed(1)}</span>
                  </div>
                  <div className="card-body">
                    <span className="tag">{product.category}</span>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <div className="price-row">
                      <strong className="price">${product.price.toFixed(2)}</strong>
                    </div>
                    <button className="details-button" onClick={() => setSelected(product)}>
                      View details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {selected && (
        <div className={modalClosing ? "modal-backdrop is-closing" : "modal-backdrop"} onClick={closeModal}>
          <div
            className={modalClosing ? "modal is-closing" : "modal"}
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dish-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" ref={closeButtonRef} onClick={closeModal} aria-label="Close details">×</button>
            <img alt={selected.name} onError={handleImageError} src={selected.image} />
            <div className="modal-body">
              <span className="tag">{selected.category}</span>
              <h2 id="dish-title">{selected.name}</h2>
              <p>{selected.description}</p>
              <p className="modal-meta">
                <span aria-label={`Rated ${selected.rating} out of 5`}><span aria-hidden="true">{ratingStars(selected.rating)}</span> {selected.rating.toFixed(1)} out of 5</span>
                <strong>${selected.price.toFixed(2)}</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      <footer className="footer" id="about">
        <h2 className="footer-about">About FreshBite</h2>
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <a className="logo footer-logo" href="#top"><span className="logo-mark" aria-hidden="true">F</span>Fresh<span>Bite</span></a>
              <p>FreshBite is a short, clear food menu. Twelve dishes in five categories, with prices and ratings on every card. Search by name, sort by price or rating, and open any dish for its full description.</p>
              <p>12 dishes · 5 categories · Highest rating 4.9</p>
            </div>
            <nav className="footer-column" aria-label="Explore">
              <h3>Explore</h3>
              <ul>
                <li><a href="#top">Home</a></li>
                <li><a href="#menu">Menu</a></li>
                <li><a href="#about">About FreshBite</a></li>
                <li><a href="#top">Back to top</a></li>
              </ul>
            </nav>
            <nav className="footer-column" aria-label="Menu categories">
              <h3>Categories</h3>
              <ul>
                {CATEGORIES.filter((c) => c !== "All").map((c) => (
                  <li key={c}><a href="#menu" onClick={() => setCategory(c)}>{c}</a></li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="footer-bottom">
            <p>This site is for browsing the menu only. It does not take orders.</p>
            <p>© {new Date().getFullYear()} FreshBite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
