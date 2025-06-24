import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../context/Store.jsx';
import api from '../utils/api.js';
import '../css/CheckoutPage.css'; // Optional: Create this CSS file if needed

export default function CheckoutPage() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { items },
    userInfo,
  } = state;
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Cash on Delivery

  const total = items.reduce((sum, x) => sum + x.qty * x.price, 0).toFixed(2);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!address) {
      alert('Please enter your shipping address');
      return;
    }

    try {
      const { data } = await api.post(
        '/orders',
        {
          orderItems: items.map(item => ({
            book: item.book,
            qty: item.qty,
          })),
          totalPrice: total,
          address,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      // Clear cart after order
      dispatch({ type: 'CART_CLEAR' });
      localStorage.removeItem('cartItems');

      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to place order');
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
