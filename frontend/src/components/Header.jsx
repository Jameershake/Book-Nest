import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../context/Store.jsx';
import '../css/Header.css'; // <-- Add this line

export default function Header() {
  const { state, dispatch } = useContext(Store);
  const navigate = useNavigate();
  const { userInfo, cart: { items } } = state;

  const logoutHandler = () => {
    dispatch({ type: 'USER_LOGOUT' });
    navigate('/login');
  };

  const cartCount = items.reduce((sum, x) => sum + x.qty, 0);

  return (
    <nav className="header">
  <Link to="/" className="logo">BookNest</Link>
  <div className="nav-links">
    <Link to="/cart">Cart ({cartCount})</Link>
    <Link to="/orders">Orders</Link>
    <Link to="/book/:id">Books</Link>
    {userInfo ? (
      <button onClick={logoutHandler}>Logout</button>
    ) : (
      <Link to="/login">Login</Link>
    )}
  </div>
</nav>
  );
}
