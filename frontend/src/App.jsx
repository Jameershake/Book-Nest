import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import BookPage from './pages/BookPage.jsx';
import CartPage from './pages/CartPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import OrderHistoryPage from './pages/OrderHistoryPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import Success from './components/Success';



export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main style={{ paddingBottom: '80px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/orders" element={<OrderHistoryPage
           />} />
           <Route path="/checkout" element={<CheckoutPage />} />
           <Route path="/success" element={<Success />} />
           <Route path="/cancel" element={<Cancel />} />


        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}