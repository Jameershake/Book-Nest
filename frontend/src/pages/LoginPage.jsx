import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import api from '../utils/api.js';
import { Store } from '../context/Store.jsx';
import Message from '../components/Message.jsx';
import Loader from '../components/Loader.jsx';
import '../css/LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      const { data } = await api.post('/auth/login', { email, password });
      dispatch({ type: 'USER_LOGIN', payload: data });
      setLoading(false);
      navigate(redirect);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign in to your account</h2>

        {error && <Message type="error">{error}</Message>}
        {loading && <Loader />}

        <form onSubmit={submitHandler} className="login-form">
          <div>
            <label htmlFor="email" className="login-label">Email address</label>
            <input
              type="email"
              id="email"
              className="login-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="login-label">Password</label>
            <input
              type="password"
              id="password"
              className="login-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login-button">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="login-footer">
          New customer?{' '}
          <Link to={`/signup?redirect=${redirect}`} className="login-link">
            Create your account
          </Link>
        </p>
      </div>
    </div>
  );
}
