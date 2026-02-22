import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/CartSlice';
import './CartItems.css';

/**
 * CartItems Component
 * Displays shopping cart with all items and cart management functionality
 */
const CartItems = ({ onContinueShopping = null }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');

  /**
   * Calculate shipping cost (Free over $50)
   */
  const calculateShipping = () => {
    return totalPrice > 50 ? 0 : 9.99;
  };

  /**
   * Calculate tax (10%)
   */
  const calculateTax = () => {
    return parseFloat(((totalPrice - discount) * 0.1).toFixed(2));
  };

  /**
   * Calculate final total
   */
  const calculateTotal = () => {
    const shipping = calculateShipping();
    const tax = calculateTax();
    return parseFloat((totalPrice - discount + shipping + tax).toFixed(2));
  };

  /**
   * Handle quantity change directly
   */
  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch(cartActions.updateQuantity({ id, quantity }));
    } else {
      handleRemoveItem(id);
    }
  };

  /**
   * Remove item from cart
   */
  const handleRemoveItem = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  /**
   * Increase item quantity
   */
  const handleIncreaseQuantity = (id) => {
    dispatch(cartActions.increaseQuantity(id));
  };

  /**
   * Decrease item quantity
   */
  const handleDecreaseQuantity = (id) => {
    dispatch(cartActions.decreaseQuantity(id));
  };

  /**
   * Apply coupon code
   */
  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'PARADISE10') {
      const discountAmount = parseFloat((totalPrice * 0.1).toFixed(2));
      setDiscount(discountAmount);
      setAppliedCoupon('PARADISE10');
      alert('✓ Coupon applied! 10% discount saved.');
    } else if (couponCode.toUpperCase() === 'SAVE20') {
      const discountAmount = parseFloat((totalPrice * 0.2).toFixed(2));
      setDiscount(discountAmount);
      setAppliedCoupon('SAVE20');
      alert('✓ Coupon applied! 20% discount saved.');
    } else {
      alert('❌ Invalid coupon code. Try PARADISE10 or SAVE20');
      setDiscount(0);
      setAppliedCoupon('');
    }
    setCouponCode('');
  };

  /**
   * Remove coupon
   */
  const handleRemoveCoupon = () => {
    setDiscount(0);
    setAppliedCoupon('');
  };

  /**
   * Handle checkout
   */
  const handleCheckout = () => {
    alert(`✓ Order placed! Total: $${calculateTotal().toFixed(2)}`);
    dispatch(cartActions.clearCart());
  };

  /**
   * Clear entire cart
   */
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear the entire cart?')) {
      dispatch(cartActions.clearCart());
    }
  };

  // Empty cart display
  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <h1>🛒 Shopping Cart</h1>
        </div>

        <div className="empty-cart-section">
          <div className="empty-cart-icon">🌾</div>
          <h2>Your cart is empty</h2>
          <p>Start shopping to add plants to your cart!</p>
          {onContinueShopping ? (
            <button className="continue-shopping-btn" onClick={onContinueShopping}>
              ← Continue Shopping
            </button>
          ) : (
            <button
              className="continue-shopping-btn"
              onClick={() => (window.location.href = '/')}
            >
              ← Continue Shopping
            </button>
          )}
        </div>
      </div>
    );
  }

  // Cart with items display
  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>🛒 Shopping Cart</h1>
        <p>
          {totalQuantity} item{totalQuantity !== 1 ? 's' : ''} in cart
        </p>
      </div>

      <div className="cart-content">
        {/* Cart Items Section */}
        <div className="cart-items-section">
          <div className="cart-items-header">
            <h2>Cart Items ({cartItems.length})</h2>
            <button className="clear-all-btn" onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>

          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                {/* Item Image */}
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>

                {/* Item Details */}
                <div className="item-info">
                  <h3>{item.title}</h3>
                  <p className="item-price">${item.price.toFixed(2)} each</p>
                </div>

                {/* Quantity Controls */}
                <div className="quantity-section">
                  <button
                    className="qty-btn"
                    onClick={() => handleDecreaseQuantity(item.id)}
                    title="Decrease"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                    className="qty-input"
                  />
                  <button
                    className="qty-btn"
                    onClick={() => handleIncreaseQuantity(item.id)}
                    title="Increase"
                  >
                    +
                  </button>
                </div>

                {/* Item Total */}
                <div className="item-total">
                  <p className="price">${item.totalPrice.toFixed(2)}</p>
                </div>

                {/* Remove Button */}
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.id)}
                  title="Remove from cart"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="order-summary-section">
          <div className="order-summary">
            <h2>Order Summary</h2>

            {/* Summary Details */}
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span className="amount">${totalPrice.toFixed(2)}</span>
              </div>

              {/* Discount */}
              {discount > 0 && (
                <div className="summary-row discount-row">
                  <span>Discount ({appliedCoupon}):</span>
                  <span className="amount discount">
                    -${discount.toFixed(2)}
                  </span>
                </div>
              )}

              {/* Shipping */}
              <div className="summary-row">
                <span>
                  Shipping:
                  {calculateShipping() === 0 && (
                    <span className="free-badge">FREE</span>
                  )}
                </span>
                <span className="amount">
                  ${calculateShipping().toFixed(2)}
                </span>
              </div>

              {/* Tax */}
              <div className="summary-row">
                <span>Tax (10%):</span>
                <span className="amount">${calculateTax().toFixed(2)}</span>
              </div>

              {/* Total */}
              <div className="summary-row total-row">
                <span>Total:</span>
                <span className="amount total">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="coupon-section">
              <h3>Apply Coupon Code</h3>
              {appliedCoupon ? (
                <div className="applied-coupon">
                  <p>✓ Applied: {appliedCoupon}</p>
                  <button
                    className="remove-coupon-btn"
                    onClick={handleRemoveCoupon}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="coupon-input-group">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="coupon-input"
                  />
                  <button
                    className="apply-coupon-btn"
                    onClick={handleApplyCoupon}
                  >
                    Apply
                  </button>
                </div>
              )}
              <p className="coupon-hint">
                Try: PARADISE10 (10% off) or SAVE20 (20% off)
              </p>
            </div>

            {/* Checkout Button */}
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>

            {/* Continue Shopping */}
            {onContinueShopping && (
              <button
                className="continue-shopping-link"
                onClick={onContinueShopping}
              >
                ← Continue Shopping
              </button>
            )}
          </div>

          {/* Shipping Info */}
          <div className="shipping-info">
            <h3>🚚 Shipping Information</h3>
            <ul>
              <li>Free shipping on orders over $50</li>
              <li>Standard delivery: 3-5 business days</li>
              <li>Express delivery available</li>
              <li>Plants carefully packaged for safety</li>
            </ul>
          </div>

          {/* Guarantee */}
          <div className="guarantee-section">
            <h3>✓ Our Guarantee</h3>
            <p>
              7-day plant survival guarantee. If your plant doesn't arrive
              healthy, we'll replace it free!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
