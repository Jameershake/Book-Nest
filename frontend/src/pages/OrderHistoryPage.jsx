import React, { useEffect, useContext, useState } from 'react';
import api from '../utils/api';
import { Store } from '../context/Store.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import '../css/OrderHistoryPage.css';

export default function OrderHistoryPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await api.get('/orders/myorders', config);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchOrders();
    }
  }, [userInfo]);

  if (!userInfo) {
    return <Message>Please log in to view your orders.</Message>;
  }

  if (loading) return <Loader />;
  if (error) return <Message>{error}</Message>;

  return (
    <div className="order-history-container">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <Message>You have no orders.</Message>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <p className="order-id"><strong>Order ID:</strong> {order._id}</p>
            <p className="order-date"><strong>Placed on:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p className="order-total"><strong>Total:</strong> ${order.totalPrice?.toFixed(2)}</p>
            <p className={`order-status ${order.isPaid ? 'status-paid' : 'status-unpaid'}`}>
              <strong>Status:</strong> {order.isPaid ? '✅ Paid' : '❌ Not Paid'}
            </p>

            <div className="order-items">
              <h4>Items:</h4>
              <ul>
                {order.orderItems.map((item, idx) => {
                  const book = item.book || {};
                  return (
                    <li key={idx}>
                      {book.title || 'Untitled Book'} x {item.qty} = $
                      {(book.price ? book.price * item.qty : 0).toFixed(2)}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
