import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api.js';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { Store } from '../context/Store.jsx';
import "../css/BookPage.css";


export default function BookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useContext(Store);
  const [book, setBook] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/books/${id}`);
        setBook(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const addToCartHandler = () => {
    dispatch({ type: 'CART_ADD_ITEM', payload: { book: book._id, qty, title: book.title, price: book.price } });
    navigate('/cart');
  };

  if (loading) return <Loader />;
  if (error) return <Message>{error}</Message>;

 return book ? (
  <div className="book-page">
    <h2 className="book-title">{book.title}</h2>
    <p className="book-author"><strong>Author:</strong> {book.author}</p>
    <p className="book-description">{book.description}</p>
    <p className="book-price"><strong>Price:</strong> ${book.price.toFixed(2)}</p>

    <div className="qty-selector">
      <label>Quantity:</label>
      <select value={qty} onChange={e => setQty(Number(e.target.value))}>
        {[...Array(book.countInStock).keys()].map(x => (
          <option key={x+1} value={x+1}>{x+1}</option>
        ))}
      </select>
    </div>

    <button onClick={addToCartHandler} className="add-to-cart-btn">
      Add to Cart
    </button>
  </div>
) : null;

}
