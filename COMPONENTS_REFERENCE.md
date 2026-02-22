# Components Reference Guide

Complete documentation of all components in the Paradise Nursery project.

---

## 📑 Table of Contents

1. [App.jsx](#appjsx)
2. [AddCart.jsx](#addcartjsx)
3. [CartItems.jsx](#cartitemsjsx)
4. [AboutUs.jsx](#aboutusjsx)
5. [Redux Store](#redux-store)

---

## App.jsx

### Overview
Main application component managing the entire app state and routing logic.

### Location
`src/App.jsx`

### State Management
```javascript
const [currentPage, setCurrentPage] = useState('home');
const [selectedProduct, setSelectedProduct] = useState(null);
const totalQuantity = useSelector((state) => state.cart.totalQuantity);
```

### Props
None (Root component)

### Features
- Page routing without React Router
- Navigation bar with active link highlighting
- Product grid display
- Shopping cart management
- Responsive layout
- Footer component

### Pages Provided
1. **Home** - Hero section with featured products
2. **Shop** - All products grid
3. **Details** - Individual product details
4. **Cart** - Shopping cart display
5. **About** - Company information

### Key Functions

**Navigation Handler:**
```javascript
setCurrentPage('shop');  // Navigate to shop
setCurrentPage('about'); // Navigate to about
```

**Product Selection:**
```javascript
setSelectedProduct(product); // Set selected product
setCurrentPage('details');   // Navigate to details page
```

### Navigation Structure
```
Home → Shop → Details → Cart
     → About
```

### Styling
CSS File: `src/App.css`
- Responsive grid layouts
- Color gradients
- Animation effects
- Mobile-first design

### Dependencies
- React hooks (useState, useSelector)
- Redux (useSelector)
- AddCart component
- CartItems component
- AboutUs component
- productList data

---

## AddCart.jsx

### Overview
Reusable button component for adding products to shopping cart.

### Location
`src/components/AddCart.jsx`

### Props
```javascript
{
  product: {
    id: number,
    title: string,
    price: number,
    image: string
  }
}
```

### State
None (Stateless component)

### Functionality
```javascript
const handleAddToCart = () => {
  // 1. Dispatch add to cart action
  dispatch(cartActions.addToCart({...}));
  // 2. Show confirmation alert
  alert(`${product.title} added to cart!`);
};
```

### Usage Example
```jsx
import AddCart from './components/AddCart';

function MyComponent() {
  const product = { id: 1, title: 'Plant', price: 50, image: 'url' };
  return <AddCart product={product} />;
}
```

### Output
```
🛒 Add to Cart  [Button with gradient]
```

### Styling
CSS File: `src/components/AddCart.css`
- Purple gradient background
- Hover animations
- Active state effects
- Full width on mobile

### Event Handlers
- `onClick`: Dispatches Redux action

### Redux Integration
- Uses `useDispatch` hook
- Dispatches `cartActions.addToCart` action
- Passes product data to reducer

### Dependencies
- React
- Redux (useDispatch, cartActions)

---

## CartItems.jsx

### Overview
Complete shopping cart display component with item management.

### Location
`src/components/CartItems.jsx`

### State
```javascript
const cartItems = useSelector(state => state.cart.items);
const totalPrice = useSelector(state => state.cart.totalPrice);
```

### Features
- Display all cart items
- Quantity increase/decrease
- Remove individual items
- Clear entire cart
- Empty cart message
- Real-time total calculation

### Cart Item Structure
```
├─ Product Image
├─ Product Title
├─ Unit Price
├─ Quantity Controls
│  ├─ Decrease Button (-)
│  ├─ Current Quantity
│  └─ Increase Button (+)
├─ Total Price (qty × price)
└─ Remove Button (✕)
```

### Usage Example
```jsx
import CartItems from './components/CartItems';

function CartPage() {
  return <CartItems />;
}
```

### Output Display
```
🛒 Shopping Cart

[Product Image] Plant Name     Qty: 2
                Unit: $45.99   Total: $91.98
                [-] 2 [+]      [Remove ✕]

Order Summary
Total Price: $500.00
[Proceed to Checkout] [Clear Cart]
```

### Functions

**Remove Item:**
```javascript
const handleRemove = (id) => {
  dispatch(cartActions.removeFromCart(id));
};
```

**Increase Quantity:**
```javascript
const handleIncreaseQuantity = (id) => {
  dispatch(cartActions.increaseQuantity(id));
};
```

**Decrease Quantity:**
```javascript
const handleDecreaseQuantity = (id) => {
  dispatch(cartActions.decreaseQuantity(id));
};
```

**Clear Cart:**
```javascript
dispatch(cartActions.clearCart());
```

### Styling
CSS File: `src/components/CartItems.css`
- Card-based layout
- Product list styling
- Button styling
- Order summary box
- Summary gradient background

### Redux Integration
- Uses `useDispatch` for actions
- Uses `useSelector` for cart data
- Dispatches multiple cart actions

### Dependencies
- React
- Redux (useDispatch, useSelector, cartActions)

---

## AboutUs.jsx

### Overview
Static page component displaying company information and values.

### Location
`src/pages/AboutUs.jsx`

### Props
None

### State
None

### Content Sections

1. **Header**
   - Company name with emoji
   - Tagline

2. **Company Story**
   - Founded in 2010
   - Growth narrative

3. **Mission Statement**
   - Company goals
   - Eco-friendly focus

4. **Product Offerings**
   - Fresh plants
   - Gardening supplies
   - Eco-friendly products
   - Expert advice
   - Fast delivery
   - Customer support

5. **Why Choose Us**
   - Quality guaranteed
   - Competitive prices
   - Easy shopping
   - Sustainability
   - (4 reason cards with gradients)

6. **Vision**
   - Long-term goals
   - Community building

7. **Contact Section**
   - Email: info@paradisenursery.com
   - Phone: 1-800-PLANTS-1
   - Address: 123 Green Street
   - Hours: Mon-Sun, 9-6 PM

### Usage Example
```jsx
import AboutUs from './pages/AboutUs';

function App() {
  return <AboutUs />;
}
```

### Styling
CSS File: `src/pages/AboutUs.css`
- Header gradient background
- Section cards
- Reason cards with hover effects
- Responsive grid layout
- Contact section styling

### Structure
```
┌─────────────────────────────┐
│  Header with Logo & Tagline │
├─────────────────────────────┤
│ Our Story (paragraph)       │
├─────────────────────────────┤
│ Mission (paragraph)         │
├─────────────────────────────┤
│ What We Offer (list)        │
├─────────────────────────────┤
│ Why Choose Us               │
│ ┌──────────┬──────────┐     │
│ │  Card 1  │  Card 2  │     │
│ │  Card 3  │  Card 4  │     │
│ └──────────┴──────────┘     │
├─────────────────────────────┤
│ Vision (paragraph)          │
├─────────────────────────────┤
│ Get in Touch (contact)      │
└─────────────────────────────┘
```

### Responsive Design
- Mobile (< 480px): Single column
- Tablet (480-768px): 2-column grid
- Desktop (> 768px): 2-column grid

### Dependencies
- React (only, no external deps)

---

## Redux Store

### Location
`src/store/CartSlice.jsx` and `src/store/index.js`

### Store Structure

**State Shape:**
```javascript
{
  cart: {
    items: Array<CartItem>,
    totalPrice: number,
    totalQuantity: number
  }
}
```

**CartItem Shape:**
```javascript
{
  id: number,
  title: string,
  price: number,
  image: string,
  quantity: number,
  totalPrice: number
}
```

### Actions

#### 1. addToCart
```javascript
dispatch(cartActions.addToCart({
  id: 1,
  title: 'Plant Name',
  price: 45.99,
  image: 'url'
}));
```
- Adds new item or increases existing item quantity
- Updates totals
- Shows browser alert

#### 2. removeFromCart
```javascript
dispatch(cartActions.removeFromCart(productId));
```
- Removes item completely
- Updates totals
- Handles edge cases

#### 3. increaseQuantity
```javascript
dispatch(cartActions.increaseQuantity(productId));
```
- Increases item quantity by 1
- Updates item total price
- Updates cart totals

#### 4. decreaseQuantity
```javascript
dispatch(cartActions.decreaseQuantity(productId));
```
- Decreases item quantity by 1
- If qty becomes 0, removes item
- Updates totals

#### 5. clearCart
```javascript
dispatch(cartActions.clearCart());
```
- Empties entire cart
- Resets all totals to 0
- Removes all items

### Selectors

**Get Cart Items:**
```javascript
const items = useSelector(state => state.cart.items);
```

**Get Total Price:**
```javascript
const total = useSelector(state => state.cart.totalPrice);
```

**Get Total Quantity:**
```javascript
const qty = useSelector(state => state.cart.totalQuantity);
```

### Store Configuration
```javascript
const store = configureStore({
  reducer: {
    cart: CartSlice.reducer
  }
});
```

### Usage Example
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/CartSlice';

function MyComponent() {
  const dispatch = useDispatch();
  const cartTotal = useSelector(state => state.cart.totalPrice);

  const handleAdd = () => {
    dispatch(cartActions.addToCart(productData));
  };

  return (
    <div>
      <p>Total: ${cartTotal}</p>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
```

---

## Component Lifecycle

```
App Loads
  ↓
Store Initialized (Redux)
  ↓
Navigation Renders
  ↓
Page Content Renders (based on currentPage state)
  ↓
User Interactions (click, add to cart, etc.)
  ↓
Redux Store Updates
  ↓
Component Re-renders with New Data
```

---

## Communication Between Components

```
App.jsx
├── Navbar
│   └── Navigation Links → setCurrentPage()
├── Main Content
│   ├── ProductCard
│   │   └── AddCart → Redux Store
│   └── CartPage
│       └── CartItems → Redux Store
└── Footer
```

**Data Flow:**
```
AddCart → Redux dispatch → Store Update
                          ↓
                    CartItems (useSelector)
                          ↓
                    Quantity Display
```

---

## Styling Conventions

### CSS Classes
- `.container`: Max-width wrapper
- `.section`: Main divisions
- `.card`: Card components
- `.btn`: Button styling
- `.grid`: Grid layouts
- `-btn`: Suffix for buttons
- `-card`: Suffix for cards
- `-container`: Suffix for containers

### Colors
```
Primary: #667eea (blue-purple)
Secondary: #764ba2 (purple)
Background: #f5f5f5 (light gray)
Text: #333 (dark)
Accent: #ff6b6b (red)
```

### Breakpoints
```
Mobile: < 480px
Tablet: 480px - 768px
Desktop: > 768px
```

---

## Best Practices

1. **Keep Components Focused**: Each component has single responsibility
2. **Props Validation**: Type-check props in production
3. **Redux for Global State**: Use for cart-related state
4. **CSS Modules**: Consider for larger projects
5. **Performance**: Use React.memo for expensive components
6. **Accessibility**: Add ARIA labels where needed
7. **Mobile First**: Design for mobile, scale up

---

## Troubleshooting

### AddCart Not Adding to Cart
- Check Redux dispatch
- Verify CartSlice reducer
- Check browser console for errors

### Cart Not Updating
- Check useSelector connection
- Verify action dispatch
- Check Redux DevTools

### Styling Issues
- Check CSS file is imported
- Verify class names match
- Check responsive breakpoints
- Test browser zoom levels

---

## Future Enhancements

- Add image lazy loading
- Implement search functionality
- Add product filters
- Create user authentication
- Add wishlist feature
- Implement payment processing
- Add order history
- Create admin dashboard

---

For more information, see PROJECT_GUIDE.md
