import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- MAIN APP COMPONENT ---
// This component manages the view (cart or checkout)
export default function App() {
  const [view, setView] = useState('cart'); // 'cart' or 'checkout'

  // CORRECTED: Initialize cartItems state from localStorage here.
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // NEW: useEffect to save cart state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const navigateToCheckout = () => setView('checkout');
  const navigateToCart = () => setView('cart');

  // Handlers for cart modifications
  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId); // Remove item if quantity is zero
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  return (
    <>
      <style>{`
/* Your existing CSS remains unchanged */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

body {
  font-family: 'Poppins', Arial, sans-serif;
  background-color: #e9eef2;
  margin: 0;
  color: #333;
}

.back-link {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s;
}

.back-link:hover {
  color: #000;
}

.page-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
}

.cart-layout {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.cart-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
}

.continue-shopping {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s;
}

.continue-shopping:hover {
  color: #000;
}

.cart-main {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  background: #2C3E50;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: #ffffff;
}

.cart-items-header {
  display: grid;
  grid-template-columns: 3fr 1fr 1.5fr 1fr 0.5fr;
  padding-bottom: 10px;
  border-bottom: 1px solid #4a627a;
  font-weight: 600;
  color: #bdc3c7;
  font-size: 0.9rem;
  text-transform: uppercase;
  text-align: center;
}

.cart-items-header span:first-child {
  text-align: left;
}

.cart-item {
  display: grid;
  grid-template-columns: 3fr 1fr 1.5fr 1fr 0.5fr;
  align-items: center;
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid #4a627a;
}

.product-details {
  display: flex;
  align-items: center;
  gap: 15px;
  text-align: left;
}

.product-details img {
  border-radius: 8px;
  background-color: #f5f5f5;
}

.product-info h4 {
  margin: 0 0 5px;
  font-size: 1rem;
  color: #ffffff;
}

.product-info p {
  margin: 0;
  font-size: 0.85rem;
  color: #bdc3c7;
}

.price-details {
  font-weight: 600;
  font-size: 1rem;
  color: #ffffff;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
}

.quantity-selector button {
  background: #34495e;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
  transition: background-color 0.3s;
  color: #fff;
}

.quantity-selector button:hover {
  background: #4a627a;
}

.quantity-selector span {
  font-weight: 600;
  color: #ffffff;
}

.item-total {
  font-weight: 700;
  font-size: 1.1rem;
  color: #ffffff;
}

.remove-item-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #bdc3c7;
  transition: color 0.3s;
}

.remove-item-btn:hover {
  color: #e74c3c;
}

.cart-summary {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  color: #2C3E50;
  height: fit-content;
}

.cart-summary h4 {
  color: #2C3E50;
  margin: 0 0 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: #2C3E50;
}

.summary-total {
  font-weight: 700;
  font-size: 1.2rem;
  border-top: 1px solid #e0e0e0;
  padding-top: 15px;
  color: #2C3E50;
}

.checkout-button {
  width: 100%;
  background-color: #2C3E50;
  color: #fff;
  border: 1px solid #2C3E50;
  padding: 15px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.checkout-button:hover {
  background-color: #ffffff;
  color: #2C3E50;
  border: 1px solid #2C3E50;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 40px;
  background-color: #2C3E50;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: #ffffff;
}

.checkout-layout h2 {
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 20px;
}

.billing-info .form-group {
  margin-bottom: 20px;
}

.billing-info label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  color: #ecf0f1;
}

.billing-info input {
  width: 100%;
  padding: 12px;
  border: 1px solid #bdc3c7;
  background-color: transparent;
  color: #ffffff;
  border-radius: 6px;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-row .form-group {
  flex: 1;
}

.order-summary {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  color: #2C3E50;
}

.order-summary h3 {
  margin-top: 0;
  color: #2C3E50;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #555;
}

.summary-item strong {
  color: #2C3E50;
}

.order-summary .summary-total {
  margin-top: 20px;
}

.place-order-btn {
  width: 100%;
  background-color: #ffffff;
  color: #2C3E50;
  border: 1px solid #2C3E50;
  padding: 15px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  margin-top: 20px;
}

.back-to-cart-link {
  text-align: center;
  display: block;
  margin-top: 20px;
  color: #2C3E50;
  text-decoration: none;
  font-weight: bold;
  padding: 10px;
  border-radius: 6px;
  transition: background-color 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s;
}

.back-to-cart-link:hover {
  background-color: #f0f0f0;
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 992px) {

  .cart-main,
  .checkout-layout {
    grid-template-columns: 1fr;
  }

  .cart-items-header {
    display: none;
  }

  .cart-item {
    grid-template-columns: 1fr;
    gap: 15px;
    text-align: center;
    position: relative;
    padding: 20px;
  }

  .product-details {
    flex-direction: column;
  }

  .price-details,
  .quantity-selector,
  .item-total {
    justify-content: center;
  }

  .remove-item-btn {
    position: absolute;
    top: 15px;
    right: 15px;
  }
}

@media (max-width: 768px) {
  .page-container {
    padding: 10px;
    margin: 10px auto;
  }

  .cart-main,
  .checkout-layout {
    padding: 15px;
  }

  .cart-header {
    flex-direction: column;
    gap: 15px;
  }
}
            `}</style>
      <div className="page-container">
        {view === 'cart' ? (
          <ShoppingCart
            items={cartItems}
            onCheckout={navigateToCheckout}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
          />
        ) : (
          <CheckoutPage items={cartItems} onBack={navigateToCart} />
        )}
      </div>
    </>
  );
}

// --- ShoppingCart Component ---
// No changes needed here.
const ShoppingCart = ({ items, onCheckout, onQuantityChange, onRemoveItem }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 150.00 : 0;
  const total = subtotal + shipping;

  return (
    <div className="cart-layout">
      <div className="cart-header">
        <h1>My Cart</h1>
        <Link to="/" className="back-link">
          &larr; Back
        </Link>
      </div>
      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 20px', background: '#2C3E50', borderRadius: '12px', color: 'white' }}>
          <h2>Your cart is empty!</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
        </div>
      ) : (
        <div className="cart-main">
          <div className="cart-items-list">
            <div className="cart-items-header">
              <span>Product</span>
              <span>Price</span>
              <span>Qty</span>
              <span>Total</span>
              <span></span>
            </div>
            {items.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="product-details">
                  <img src={item.image} alt={item.name} width="80" height="80" />
                  <div className="product-info">
                    <h4>{item.name}</h4>
                    <p>{item.sku}</p>
                    <p>Color: {item.color}</p>
                  </div>
                </div>
                <div className="price-details">₹{item.price.toFixed(2)}</div>
                <div className="quantity-selector">
                  <button onClick={() => onQuantityChange(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-total">₹{(item.price * item.quantity).toFixed(2)}</div>
                <button className="remove-item-btn" onClick={() => onRemoveItem(item.id)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h4>Choose shipping mode:</h4>
            <div className="summary-row">
              <span>Subtotal TTC</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping > 0 ? `₹${shipping.toFixed(2)}` : 'Free'}</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button className="checkout-button" onClick={onCheckout}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- CheckoutPage Component ---
// No changes needed here.
const CheckoutPage = ({ items, onBack }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 150.00;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.firstname.value.trim();
    if (form.checkValidity()) {
      console.log(`Order placed successfully! Thank you, ${name}!`);
      alert(`🎉 Order placed successfully!\n\nThank you, ${name}!`);
      onBack();
    } else {
      form.reportValidity();
    }
  };

  return (
    <div className="checkout-layout">
      <div className="billing-info">
        <h2>Billing Information</h2>
        <form id="checkout-form" onSubmit={handlePlaceOrder} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstname">First Name *</label>
              <input type="text" id="firstname" name="firstname" required />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name *</label>
              <input type="text" id="lastname" name="lastname" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address *</label>
            <input type="text" id="address" name="address" placeholder="Street address" required />
            <input type="text" id="address2" name="address2" placeholder="Apartment, suite, unit etc. (optional)" style={{ marginTop: '10px' }} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
          </div>
          <button type="submit" className="place-order-btn">PLACE ORDER</button>
        </form>
      </div>
      <div className="order-summary">
        <h3>CART TOTALS</h3>
        <div className="summary-item">
          <span>Cart Subtotal</span>
          <strong>₹{subtotal.toFixed(2)}</strong>
        </div>
        <div className="summary-item">
          <span>Shipping and Handling</span>
          <strong>₹{shipping.toFixed(2)}</strong>
        </div>
        <div className="summary-item summary-total">
          <span>Order Total</span>
          <strong>₹{total.toFixed(2)}</strong>
        </div>
        <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} className="back-to-cart-link"> &larr; Back to Bag</a>
      </div>
    </div>
  );
};