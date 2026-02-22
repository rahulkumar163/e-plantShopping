import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/CartSlice';
import productList from '../data/productList';
import './ProductList.css';

/**
 * ProductList Component
 * Displays all products with filtering, sorting, and complete cart operations
 */
const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [filteredProducts, setFilteredProducts] = useState(productList);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', ...new Set(productList.map((product) => product.category))];

  /**
   * Get quantity of item in cart
   */
  const getCartItemQuantity = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  /**
   * Check if item is in cart
   */
  const isItemInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  /**
   * Add item to cart
   */
  const handleAddToCart = (product) => {
    dispatch(
      cartActions.addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );
  };

  /**
   * Increase item quantity
   */
  const handleIncreaseQuantity = (productId) => {
    dispatch(cartActions.increaseQuantity(productId));
  };

  /**
   * Decrease item quantity
   */
  const handleDecreaseQuantity = (productId) => {
    dispatch(cartActions.decreaseQuantity(productId));
  };

  /**
   * Remove item from cart
   */
  const handleRemoveFromCart = (productId) => {
    dispatch(cartActions.removeItem(productId));
  };

  /**
   * Update quantity directly
   */
  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity > 0) {
      dispatch(cartActions.updateQuantity({ id: productId, quantity }));
    } else {
      handleRemoveFromCart(productId);
    }
  };

  /**
   * Handle category filter
   */
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    let filtered = productList;

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Apply search if any
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    applySort(filtered, sortBy);
    setFilteredProducts(filtered);
  };

  /**
   * Handle search
   */
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    let filtered = productList;

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Apply search
    if (term) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(term.toLowerCase()) ||
          product.description.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Apply sorting
    applySort(filtered, sortBy);
    setFilteredProducts(filtered);
  };

  /**
   * Handle sorting
   */
  const handleSort = (sortOption) => {
    setSortBy(sortOption);
    applySort(filteredProducts, sortOption);
  };

  /**
   * Apply sorting to products
   */
  const applySort = (products, sortOption) => {
    let sorted = [...products];

    switch (sortOption) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Default order
        break;
    }

    setFilteredProducts(sorted);
  };

  /**
   * Clear all filters
   */
  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchTerm('');
    setSortBy('default');
    setFilteredProducts(productList);
  };

  return (
    <div className="product-list-container">
      {/* Header Section */}
      <div className="product-list-header">
        <h1>🌿 Our Plant Collection</h1>
        <p>Explore our wide variety of beautiful, healthy plants</p>
      </div>

      {/* Filters and Search Section */}
      <div className="filters-section">
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search plants..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          <h3>Categories</h3>
          <div className="category-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Sorting Options */}
        <div className="sort-filter">
          <h3>Sort By:</h3>
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="sort-select"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        {(selectedCategory !== 'All' || searchTerm || sortBy !== 'default') && (
          <button className="clear-filters-btn" onClick={handleClearFilters}>
            ✕ Clear Filters
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="results-info">
        <p>
          Showing <strong>{filteredProducts.length}</strong> of{' '}
          <strong>{productList.length}</strong> products
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => {
            const cartQuantity = getCartItemQuantity(product.id);
            const inCart = isItemInCart(product.id);

            return (
              <div key={product.id} className="product-card">
                {/* Product Image */}
                <div className="product-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
                  <span className="category-badge">{product.category}</span>
                  {inCart && (
                    <span className="in-cart-badge">✓ In Cart</span>
                  )}
                </div>

                {/* Product Info */}
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>

                  <p className="product-description">{product.description}</p>

                  <p className="product-details">{product.details}</p>

                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                  </div>

                  {/* Cart Operations */}
                  <div className="cart-operations">
                    {!inCart ? (
                      <button
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(product)}
                      >
                        🛒 Add to Cart
                      </button>
                    ) : (
                      <div className="quantity-selector">
                        <button
                          className="qty-btn"
                          onClick={() => handleDecreaseQuantity(product.id)}
                          title="Decrease quantity"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={cartQuantity}
                          onChange={(e) =>
                            handleUpdateQuantity(product.id, parseInt(e.target.value) || 1)
                          }
                          className="qty-input"
                        />
                        <button
                          className="qty-btn"
                          onClick={() => handleIncreaseQuantity(product.id)}
                          title="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          className="remove-btn"
                          onClick={() => handleRemoveFromCart(product.id)}
                          title="Remove from cart"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-products">
          <p>🌾 No plants found matching your criteria.</p>
          <button className="reset-btn" onClick={handleClearFilters}>
            Clear Filters and Try Again
          </button>
        </div>
      )}

      {/* Footer Info */}
      <div className="product-list-footer">
        <p>
          💚 All our plants are hand-selected and guaranteed to be healthy. Free
          shipping on orders over $50!
        </p>
      </div>
    </div>
  );
};

export default ProductList;
