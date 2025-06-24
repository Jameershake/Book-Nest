import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api.js';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import '../css/HomePage.css';

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/books');
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <Loader />;
  if (error) return <Message>{error}</Message>;

  return (
    <div className="home-container">
      <h1 className="home-heading">Explore Our Library</h1>
      <div className="home-grid">
        {books.map(book => (
          <div className="book-card" key={book._id}>
            <img
              src={book.cover || 'https://www.lamar.edu/arts-sciences/_files/images/engl-mod-lang/homepage/humanities-bookart.jpeg'}
              alt={book.title}
              className="book-image"
            />
            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">by <span>{book.author}</span></p>
              <p className="book-description">
                {book.description?.slice(0, 80)}...
              </p>
              <p className="book-price">${book.price.toFixed(2)}</p>
              <Link to={`/book/${book._id}`}  className="view-button">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
