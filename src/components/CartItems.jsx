import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/CartSlice';
import './CartItems.css';

const CartItems = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const handleRemove = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(cartActions.increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(cartActions.decreaseQuantity(id));
  };

  return (
    <div className="cart-container">
      <h2>🛒 Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty. Start shopping!</p>
      ) : (
        <div>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <p className="price">${item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecreaseQuantity(item.id)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(item.id)}>
                      +
                    </button>
                  </div>
                  <p className="total">Total: ${item.totalPrice.toFixed(2)}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <p>Total Price: <strong>${totalPrice.toFixed(2)}</strong></p>
            <button className="checkout-btn">Proceed to Checkout</button>
            <button
              className="clear-cart-btn"
              onClick={() => dispatch(cartActions.clearCart())}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
