import { createSlice } from '@reduxjs/toolkit';

/**
 * CartSlice - Redux Toolkit slice for managing shopping cart state
 * 
 * State Structure:
 * {
 *   items: Array<{id, title, price, image, quantity, totalPrice}>,
 *   totalPrice: number,
 *   totalQuantity: number
 * }
 */

const initialState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * addItem - Add a new item to cart or increase quantity if exists
     * @param {Object} action.payload - { id, title, price, image }
     */
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        // Item already in cart - increase quantity
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        // New item - add to cart
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.image,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      // Update cart totals
      state.totalQuantity++;
      state.totalPrice += newItem.price;
    },

    /**
     * addToCart - Alias for addItem (backward compatibility)
     */
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.image,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      state.totalQuantity++;
      state.totalPrice += newItem.price;
    },

    /**
     * removeItem - Remove item from cart completely
     * @param {number} action.payload - Product ID to remove
     */
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalPrice -= existingItem.totalPrice;
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },

    /**
     * removeFromCart - Alias for removeItem (backward compatibility)
     */
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalPrice -= existingItem.totalPrice;
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },

    /**
     * updateQuantity - Set item quantity to specific value
     * @param {Object} action.payload - { id, quantity }
     */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem && quantity > 0) {
        // Calculate difference in quantity
        const quantityDifference = quantity - existingItem.quantity;
        const priceDifference = quantityDifference * existingItem.price;

        // Update item
        existingItem.quantity = quantity;
        existingItem.totalPrice = quantity * existingItem.price;

        // Update cart totals
        state.totalQuantity += quantityDifference;
        state.totalPrice += priceDifference;
      } else if (quantity === 0) {
        // Remove item if quantity is 0
        state.totalPrice -= existingItem.totalPrice;
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },

    /**
     * increaseQuantity - Increment item quantity by 1
     * @param {number} action.payload - Product ID
     */
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
        state.totalPrice += existingItem.price;
        state.totalQuantity++;
      }
    },

    /**
     * decreaseQuantity - Decrement item quantity by 1, remove if equals 0
     * @param {number} action.payload - Product ID
     */
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          // Remove item when quantity reaches 0
          state.totalPrice -= existingItem.totalPrice;
          state.totalQuantity--;
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          // Decrease quantity
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
          state.totalPrice -= existingItem.price;
          state.totalQuantity--;
        }
      }
    },

    /**
     * clearCart - Remove all items from cart
     */
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const cartActions = CartSlice.actions;
export default CartSlice;
