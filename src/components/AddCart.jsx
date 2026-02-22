import React from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/CartSlice';
import './AddCart.css';

const AddCart = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      cartActions.addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );
    alert(`${product.title} added to cart!`);
  };

  return (
    <button className="add-to-cart-btn" onClick={handleAddToCart}>
      🛒 Add to Cart
    </button>
  );
};

export default AddCart;
