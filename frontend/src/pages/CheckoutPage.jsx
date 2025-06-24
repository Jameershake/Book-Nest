import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../context/Store.jsx';
import api from '../utils/api.js';
import '../css/CheckoutPage.css'; // Optional CSS

export default function CheckoutPage() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { items },
    userInfo,
  } = state;

  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Default: Cash on Delivery

  const total = items.reduce((sum, item) => sum + item.qty * item.price, 0).toFixed(2);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!address.trim()) {
      alert('Please enter a valid shipping address.');
      return;
    }

    try {
      const orderPayload = {
        orderItems: items.map(item => ({
          book: item.book,
          qty: item.qty,
        })),
        totalPrice: Number(total),
        shippingAddress: address,  // ✅ Ensure backend expects "shippingAddress"
        paymentMethod,             // ✅ Should match backend model if used
      };

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await api.post('/orders', orderPayload, config);

      dispatch({ type: 'CART_CLEAR' });
      localStorage.removeItem('cartItems');

      alert('✅ Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      alert(error.response?.data?.message || '❌ Order failed. Please try again.');
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      <form onSubmit={submitHandler} className="checkout-form">
        <div className="form-group">
          <label>Shipping Address</label>
          <input
            type="text"
            placeholder="Enter full address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="UPI">UPI</option>
            <option value="Card">Credit/Debit Card</option>
          </select>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          {items.map(item => (
            <div key={item.book} className="summary-item">
              <span>{item.title} x {item.qty}</span>
              <span>${(item.qty * item.price).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-total">
            <strong>Total:</strong>
            <span>${total}</span>
          </div>
        </div>

        <button type="submit" className="place-order-btn">Place Order</button>
      </form>
    </div>
  );
}
