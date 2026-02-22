import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddCart from './components/AddCart';
import CartItems from './components/CartItems';
import AboutUs from './pages/AboutUs';
import ProductList from './components/ProductList';
import productList from './data/productList';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo" onClick={() => setCurrentPage('home')}>
            🌴 Paradise Nursery
          </div>
          <ul className="nav-menu">
            <li>
              <button
                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => {
                  setCurrentPage('home');
                  setSelectedProduct(null);
                }}
              >
                🏠 Home
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${currentPage === 'shop' ? 'active' : ''}`}
                onClick={() => {
                  setCurrentPage('shop');
                  setSelectedProduct(null);
                }}
              >
                🛍️ Shop
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
                onClick={() => setCurrentPage('about')}
              >
                ℹ️ About Us
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${currentPage === 'cart' ? 'active' : ''}`}
                onClick={() => setCurrentPage('cart')}
              >
                🛒 Cart ({totalQuantity})
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Home Page */}
        {currentPage === 'home' && (
          <div className="home-page">
            <banner className="hero-banner">
              <div className="hero-content">
                <h1>Welcome to Paradise Nursery</h1>
                <p>Your Ultimate Plant Shopping Destination</p>
                <button
                  className="cta-button"
                  onClick={() => setCurrentPage('shop')}
                >
                  Start Shopping
                </button>
              </div>
            </banner>

            <section className="featured-section">
              <h2>Featured Plants</h2>
              <div className="products-grid">
                {productList.slice(0, 4).map((product) => (
                  <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.title} />
                    <div className="product-info">
                      <h3>{product.title}</h3>
                      <p className="category">{product.category}</p>
                      <p className="description">{product.description}</p>
                      <p className="price">${product.price}</p>
                      <AddCart product={product} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="view-all">
                <button
                  className="view-all-btn"
                  onClick={() => setCurrentPage('shop')}
                >
                  View All Products →
                </button>
              </div>
            </section>

            <section className="benefits-section">
              <div className="benefit-card">
                <span className="icon">✨</span>
                <h3>Premium Quality</h3>
                <p>All plants hand-selected and expertly cared for</p>
              </div>
              <div className="benefit-card">
                <span className="icon">🚚</span>
                <h3>Fast Delivery</h3>
                <p>Quick shipping to your doorstep</p>
              </div>
              <div className="benefit-card">
                <span className="icon">💯</span>
                <h3>100% Satisfaction</h3>
                <p>Money-back guarantee on all orders</p>
              </div>
              <div className="benefit-card">
                <span className="icon">💚</span>
                <h3>Eco-Friendly</h3>
                <p>Sustainable practices in all operations</p>
              </div>
            </section>
          </div>
        )}

        {/* Shop Page */}
        {currentPage === 'shop' && <ProductList />}

        {/* Product Details Page */}
        {currentPage === 'details' && selectedProduct && (
          <div className="details-page">
            <button
              className="back-btn"
              onClick={() => {
                setCurrentPage('shop');
                setSelectedProduct(null);
              }}
            >
              ← Back to Shop
            </button>
            <div className="details-container">
              <div className="details-image">
                <img src={selectedProduct.image} alt={selectedProduct.title} />
              </div>
              <div className="details-info">
                <h1>{selectedProduct.title}</h1>
                <p className="category">{selectedProduct.category}</p>
                <p className="price-large">${selectedProduct.price}</p>
                <p className="description-full">
                  {selectedProduct.description}
                </p>
                <div className="details-section">
                  <h3>Product Details</h3>
                  <p>{selectedProduct.details}</p>
                </div>
                <div className="features">
                  <h3>Key Features</h3>
                  <ul>
                    <li>✓ Healthy and vibrant plant</li>
                    <li>✓ Comes with care instructions</li>
                    <li>✓ Safely packaged for shipping</li>
                    <li>✓ 7-day plant survival guarantee</li>
                  </ul>
                </div>
                <AddCart product={selectedProduct} />
              </div>
            </div>
          </div>
        )}

        {/* About Us Page */}
        {currentPage === 'about' && <AboutUs />}

        {/* Cart Page */}
        {currentPage === 'cart' && <CartItems />}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>🌴 Paradise Nursery</h4>
            <p>Your Ultimate Plant Shopping Destination</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#shop">Shop</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@paradisenursery.com</p>
            <p>Phone: 1-800-PLANTS-1</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#facebook">Facebook</a>
              <a href="#instagram">Instagram</a>
              <a href="#twitter">Twitter</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Paradise Nursery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
