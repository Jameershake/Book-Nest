import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../context/Store.jsx';
import '../css/CartPage.css';

export default function CartPage() {
  const { state, dispatch } = useContext(Store);
  const navigate = useNavigate();
  const { items } = state.cart;
  const { userInfo } = state; // ✅ FIXED: Extract userInfo

  const updateQty = (book, qty) => {
    dispatch({ type: 'CART_ADD_ITEM', payload: { book, qty } });
  };

  const removeItem = (book) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: { book } });
  };

  const checkoutHandler = () => {
    console.log('User Info:', userInfo);
    if (!userInfo) {
      navigate('/login?redirect=/orders');
    } else {
      navigate('/orders');
    }
  };

  const total = items.reduce((sum, x) => sum + x.qty * x.price, 0).toFixed(2);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      {items.length === 0 ? (
        <p className="empty-message">Your cart is empty. <Link to="/">Go Shopping</Link></p>
      ) : (
        <>
          {items.map(item => (
            <div key={item.book} className="cart-item">
              <Link to={`/book/${item.book}`} className="item-title">{item.title}</Link>
              <select
                value={item.qty}
                onChange={e => updateQty(item.book, Number(e.target.value))}
                className="item-select"
              >
                {[...Array(item.countInStock || 5).keys()].map(x => (
                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                ))}
              </select>
              <span className="item-price">${(item.price * item.qty).toFixed(2)}</span>
              <button onClick={() => removeItem(item.book)} className="remove-btn">Remove</button>
            </div>
          ))}
          <div className="cart-total">Total: ${total}</div>
          <button onClick={checkoutHandler} className="checkout-btn">Proceed to Checkout</button>
        </>
      )}
    </div>
  );
}
