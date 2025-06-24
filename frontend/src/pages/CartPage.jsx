import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../context/Store.jsx';
import '../css/CartPage.css';

export default function CartPage() {
  const { state, dispatch } = useContext(Store);
  const navigate = useNavigate();
  const {
    cart: { items },
    userInfo,
  } = state;

  // Handle quantity update
  const updateQty = (bookId, qty) => {
    const existingItem = items.find((item) => item.book === bookId);
    if (existingItem) {
      dispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...existingItem, qty },
      });
    }
  };

  // Handle item removal
  const removeItem = (bookId) => {
    dispatch({
      type: 'CART_REMOVE_ITEM',
      payload: { book: bookId },
    });
  };

  // Navigate to checkout or login if not authenticated
  const checkoutHandler = () => {
    if (!userInfo) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  const total = items
    .reduce((sum, item) => sum + item.qty * item.price, 0)
    .toFixed(2);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>

      {items.length === 0 ? (
        <p className="empty-message">
          Your cart is empty. <Link to="/">Go Shopping</Link>
        </p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.book} className="cart-item">
              <Link to={`/book/${item.book}`} className="item-title">
                {item.title}
              </Link>

              <select
                value={item.qty}
                onChange={(e) => updateQty(item.book, Number(e.target.value))}
                className="item-select"
                aria-label="Select quantity"
              >
                {[...Array(item.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>

              <span className="item-price">
                ${(item.qty * item.price).toFixed(2)}
              </span>

              <button
                onClick={() => removeItem(item.book)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="cart-total">
            <strong>Total:</strong> ${total}
          </div>

          <button onClick={checkoutHandler} className="checkout-btn">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
