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
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [theme, setTheme] = useState("light");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSent, setContactSent] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const cartRef = useRef(null);
  const cartCloseButtonRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const cartLastFocusedRef = useRef(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("freshbite-favorites");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed.filter((name) => PRODUCTS.some((product) => product.name === name)));
        }
      }
    } catch {
      setFavorites([]);
    }
    setFavoritesLoaded(true);
  }, []);

  useEffect(() => {
    if (!favoritesLoaded) return;
    try {
      window.localStorage.setItem("freshbite-favorites", JSON.stringify(favorites));
    } catch {
      return;
    }
  }, [favorites, favoritesLoaded]);

  useEffect(() => {
    try {
      if (window.localStorage.getItem("freshbite-theme") === "dark") {
        setTheme("dark");
        document.documentElement.setAttribute("data-theme", "dark");
      }
    } catch {
      return;
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem("freshbite-theme", next);
    } catch {
      return;
    }
  };

  const toggleFavorite = (name) => {
    setFavorites((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name]
    );
  };

  const clearPriceFilter = () => {
    setMinPrice("");
    setMaxPrice("");
  };

  const closeModal = () => {
    if (modalClosing) return;
    setModalClosing(true);
    window.setTimeout(() => {
      setSelected(null);
      setModalClosing(false);
    }, 240);
  };

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("freshbite-cart");
      if (!stored) {
        setCartLoaded(true);
        return;
      }
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) {
        setCartLoaded(true);
        return;
      }
      const restored = parsed
        .filter((entry) => entry && typeof entry.name === "string" && Number.isInteger(entry.qty))
        .filter((entry) => PRODUCTS.some((product) => product.name === entry.name))
        .map((entry) => ({ name: entry.name, qty: Math.min(99, Math.max(1, entry.qty)) }));
      const merged = [];
      restored.forEach((entry) => {
        const existing = merged.find((item) => item.name === entry.name);
        if (existing) {
          existing.qty = Math.min(99, existing.qty + entry.qty);
        } else {
          merged.push(entry);
        }
      });
      setCart(merged);
    } catch {
      setCart([]);
    }
    setCartLoaded(true);
  }, []);

  useEffect(() => {
    if (!cartLoaded) return;
    try {
      window.localStorage.setItem("freshbite-cart", JSON.stringify(cart));
    } catch {
      return;
    }
  }, [cart, cartLoaded]);

  useEffect(() => {
    if (!cartOpen) return;
    cartLastFocusedRef.current = document.activeElement;
    document.body.style.overflow = "hidden";
    cartCloseButtonRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setCartOpen(false);
        return;
      }
      if (event.key !== "Tab" || !cartRef.current) return;
      const focusable = cartRef.current.querySelectorAll(
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
      if (!selected) {
        document.body.style.overflow = "";
      }
      if (cartLastFocusedRef.current instanceof HTMLElement) {
        cartLastFocusedRef.current.focus();
      }
    };
  }, [cartOpen, selected]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const product = PRODUCTS.find((entry) => entry.name === item.name);
    return product ? sum + product.price * item.qty : sum;
  }, 0);

  const cartQty = (name) => {
    const item = cart.find((entry) => entry.name === name);
    return item ? item.qty : 0;
  };

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.name === product.name);
      if (existing) {
        return current.map((item) =>
          item.name === product.name ? { ...item, qty: Math.min(99, item.qty + 1) } : item
        );
      }
      return [...current, { name: product.name, qty: 1 }];
    });
  };

  const changeQty = (name, delta) => {
    setCart((current) =>
      current
        .map((item) => (item.name === name ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (name) => {
    setCart((current) => current.filter((item) => item.name !== name));
  };

  const clearCart = () => {
    setCart([]);
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
  }, [category, query, sort, favoritesOnly, minPrice, maxPrice]);

  const search = query.trim().toLowerCase();
  const parsedMin = minPrice === "" ? null : Number(minPrice);
  const parsedMax = maxPrice === "" ? null : Number(maxPrice);
  const lowPrice = parsedMin !== null && !Number.isNaN(parsedMin) ? parsedMin : null;
  const highPrice = parsedMax !== null && !Number.isNaN(parsedMax) ? parsedMax : null;
  const effectiveMin = lowPrice !== null && highPrice !== null && lowPrice > highPrice ? highPrice : lowPrice;
  const effectiveMax = lowPrice !== null && highPrice !== null && lowPrice > highPrice ? lowPrice : highPrice;
  const filtered = PRODUCTS.filter((product) => {
    const inCategory = category === "All" || product.category === category;
    const inSearch = search === "" || product.name.toLowerCase().includes(search);
    const inFavorites = !favoritesOnly || favorites.includes(product.name);
    const aboveMin = effectiveMin === null || product.price >= effectiveMin;
    const belowMax = effectiveMax === null || product.price <= effectiveMax;
    return inCategory && inSearch && inFavorites && aboveMin && belowMax;
  });
  const visible = sortProducts(filtered, sort);

  const clearFilters = () => {
    setCategory("All");
    setQuery("");
    setSort("featured");
    setFavoritesOnly(false);
    clearPriceFilter();
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
              <a href="#contact">Contact</a>
            </nav>
            <button className="theme-toggle" aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"} aria-pressed={theme === "dark"} onClick={toggleTheme}>{theme === "dark" ? "☀️ Light" : "🌙 Dark"}</button>
            <a className="header-cta" href="#menu">Browse Menu</a>
            <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={cartCount === 0 ? "Open cart, empty" : `Open cart, ${cartCount} items`}>
              Cart {cartCount > 0 && <span className="cart-count" aria-hidden="true">{cartCount}</span>}
            </button>
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
          <button className="print-button" onClick={() => window.print()} type="button">Print menu</button>
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
          <label className="control">
            <span>Min price ($)</span>
            <input min="0" onChange={(event) => setMinPrice(event.target.value)} placeholder="No minimum" step="0.5" type="number" value={minPrice} />
          </label>
          <label className="control">
            <span>Max price ($)</span>
            <input min="0" onChange={(event) => setMaxPrice(event.target.value)} placeholder="No maximum" step="0.5" type="number" value={maxPrice} />
          </label>
          {(minPrice !== "" || maxPrice !== "") && (
            <button className="filter price-clear" onClick={clearPriceFilter} type="button">Clear price filter</button>
          )}
        </div>

        <div className="filters" role="group" aria-label="Filter by category">
          <button aria-pressed={favoritesOnly} className={favoritesOnly ? "filter active" : "filter"} onClick={() => setFavoritesOnly(!favoritesOnly)} type="button">
            ♥ Favorites <span className="count">{favorites.length}</span>
          </button>
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
            <p>No dish matches your search and filters. Try a different name, category, price range, or favorites filter.</p>
            <button className="button" onClick={clearFilters}>Clear search and filters</button>
          </div>
        ) : (
          <div className="grid">
            {visible.map((product, index) => (
              <article className="card reveal" key={product.name} style={{ "--reveal-delay": `${Math.min(index, 11) * 60}ms` }}>
                <div className="card-tilt">
                  <div className="card-image">
                    <img alt={product.name} decoding="async" loading="lazy" onError={handleImageError} src={product.image} />
                    <span className="rating-badge" aria-label={`Rated ${product.rating} out of 5`}><span aria-hidden="true">{ratingStars(product.rating)}</span> {product.rating.toFixed(1)}</span>
                    <button aria-label={favorites.includes(product.name) ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`} aria-pressed={favorites.includes(product.name)} className={favorites.includes(product.name) ? "favorite-button active" : "favorite-button"} onClick={() => toggleFavorite(product.name)} type="button">
                      <span aria-hidden="true">{favorites.includes(product.name) ? "♥" : "♡"}</span>
                    </button>
                  </div>
                  <div className="card-body">
                    <span className="tag">{product.category}</span>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <div className="price-row">
                      <strong className="price">${product.price.toFixed(2)}</strong>
                    </div>
                    <div className="card-actions">
                      <button className="details-button" onClick={() => setSelected(product)}>
                        View details
                      </button>
                      <button className="add-button" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`}>
                        Add to cart
                      </button>
                    </div>
                    {cartQty(product.name) > 0 && (
                      <p className="in-cart">In cart: {cartQty(product.name)}</p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <div className="print-menu">
        <h2>FreshBite Menu</h2>
        {PRODUCTS.map((product) => (
          <div className="print-item" key={product.name}>
            <div className="print-item-top">
              <strong>{product.name}</strong>
              <span>${product.price.toFixed(2)}</span>
            </div>
            <p>{product.category} · Rated {product.rating.toFixed(1)} out of 5</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>

      <section className="contact-section" id="contact">
        <h2>Contact FreshBite</h2>
        <p>Questions about the menu? Send a message below.</p>
        <div className="contact-grid">
          <div className="contact-info">
            <p>Demo contact details (sample only, not a real business):</p>
            <p><strong>Email:</strong> hello@freshbite.example</p>
            <p><strong>Phone:</strong> +1 (555) 010-1234</p>
            <p>These sample details are placeholders for this demo shop only.</p>
          </div>
          <form
            className="contact-form"
            onSubmit={(event) => {
              event.preventDefault();
              setContactSent(true);
              setContactName("");
              setContactEmail("");
              setContactMessage("");
            }}
          >
            <label>
              <span>Name</span>
              <input onChange={(event) => setContactName(event.target.value)} required type="text" value={contactName} />
            </label>
            <label>
              <span>Email</span>
              <input onChange={(event) => setContactEmail(event.target.value)} required type="email" value={contactEmail} />
            </label>
            <label>
              <span>Message</span>
              <textarea onChange={(event) => setContactMessage(event.target.value)} required rows={5} value={contactMessage} />
            </label>
            <button className="button contact-submit" type="submit">Send message</button>
            <p className="contact-note">Demo only: this form does not send your message anywhere and no data is stored or shared.</p>
            {contactSent && (
              <p className="contact-success" role="status">Thank you! Your message was received in this demo only. It was not sent anywhere and no data was stored.</p>
            )}
          </form>
        </div>
      </section>

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
            <img alt={selected.name} decoding="async" loading="lazy" onError={handleImageError} src={selected.image} />
            <div className="modal-body">
              <span className="tag">{selected.category}</span>
              <h2 id="dish-title">{selected.name}</h2>
              <p>{selected.description}</p>
              <p className="modal-meta">
                <span aria-label={`Rated ${selected.rating} out of 5`}><span aria-hidden="true">{ratingStars(selected.rating)}</span> {selected.rating.toFixed(1)} out of 5</span>
                <strong>${selected.price.toFixed(2)}</strong>
              </p>
              <button className="add-button modal-add-button" onClick={() => addToCart(selected)} aria-label={`Add ${selected.name} to cart`}>
                Add to cart
              </button>
              {cartQty(selected.name) > 0 && (
                <p className="in-cart">In cart: {cartQty(selected.name)}</p>
              )}
              <button aria-pressed={favorites.includes(selected.name)} className="details-button" onClick={() => toggleFavorite(selected.name)} type="button">
                {favorites.includes(selected.name) ? "♥ Saved to favorites" : "♡ Save to favorites"}
              </button>
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="cart-backdrop" onClick={() => setCartOpen(false)}>
          <div
            className="cart-drawer"
            ref={cartRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-header">
              <h2 id="cart-title">Your cart</h2>
              <button className="cart-close" ref={cartCloseButtonRef} onClick={() => setCartOpen(false)} aria-label="Close cart">×</button>
            </div>
            <p className="cart-note">Cart preview only. There is no checkout or payment here.</p>
            {cart.length === 0 ? (
              <div className="cart-empty">
                <p>Your cart is empty.</p>
                <button className="button" onClick={() => setCartOpen(false)}>Browse the menu</button>
              </div>
            ) : (
              <>
                <ul className="cart-list">
                  {cart.map((item) => {
                    const product = PRODUCTS.find((entry) => entry.name === item.name);
                    if (!product) return null;
                    return (
                      <li className="cart-item" key={item.name}>
                        <img alt={product.name} loading="lazy" onError={handleImageError} src={product.image} />
                        <div className="cart-item-body">
                          <strong>{product.name}</strong>
                          <span>${product.price.toFixed(2)} each</span>
                          <div className="qty-controls">
                            <button onClick={() => changeQty(item.name, -1)} aria-label={`Decrease quantity for ${product.name}`}>−</button>
                            <span aria-label={`Quantity for ${product.name}`}>{item.qty}</span>
                            <button onClick={() => changeQty(item.name, 1)} aria-label={`Increase quantity for ${product.name}`}>+</button>
                          </div>
                          <button className="cart-remove" onClick={() => removeFromCart(item.name)} aria-label={`Remove ${product.name} from cart`}>Remove</button>
                        </div>
                        <strong className="cart-line-total">${(product.price * item.qty).toFixed(2)}</strong>
                      </li>
                    );
                  })}
                </ul>
                <div className="cart-footer">
                  <button className="cart-clear" onClick={clearCart}>Clear cart</button>
                  <p className="cart-total">Total <strong>${cartTotal.toFixed(2)}</strong></p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="footer" id="about">
        <h2 className="footer-about">About FreshBite</h2>
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <a className="logo footer-logo" href="#top"><span className="logo-mark" aria-hidden="true">F</span>Fresh<span>Bite</span></a>
              <p>FreshBite is a short, clear food menu. Twelve dishes in five categories, with prices and ratings on every card. Search by name, sort by price or rating, filter by price range, save favorites, and open any dish for its full description.</p>
              <p>12 dishes · 5 categories · Highest rating 4.9</p>
            </div>
            <nav className="footer-column" aria-label="Explore">
              <h3>Explore</h3>
              <ul>
                <li><a href="#top">Home</a></li>
                <li><a href="#menu">Menu</a></li>
                <li><a href="#about">About FreshBite</a></li>
                <li><a href="#contact">Contact</a></li>
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
