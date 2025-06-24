import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import api from '../utils/api.js';
import { Store } from '../context/Store.jsx';
import Message from '../components/Message.jsx';
import Loader from '../components/Loader.jsx';
import "../css/SignupPage.css";


export default function SignupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect') || '/';
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitHandler = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.post('/auth/signup', { name, email, password });
      dispatch({ type: 'USER_LOGIN', payload: data });
      setLoading(false);
      navigate(redirect);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

 return (
  <div className="signup-container">
    <h2 className="signup-heading">Sign Up</h2>
    {error && <Message>{error}</Message>}
    {loading && <Loader />}
    <form onSubmit={submitHandler} className="signup-form">
      <div>
        <label>Name</label>
        <input type="text" className="signup-input" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" className="signup-input" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" className="signup-input" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <div>
        <label>Confirm Password</label>
        <input type="password" className="signup-input" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
      </div>
      <button type="submit" className="signup-button">Register</button>
    </form>
    <div className="signup-footer">
      Already have an account? <Link to={`/login?redirect=${redirect}`}>Log in</Link>
    </div>
  </div>
);
}
