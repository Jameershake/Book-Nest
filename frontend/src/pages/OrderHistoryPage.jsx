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
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Orders</h2>
      {orders.length === 0 ? (
        <Message>You have no orders.</Message>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 rounded shadow-sm">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Placed on:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Total:</strong> ${order.totalPrice?.toFixed(2)}</p>
            <p><strong>Status:</strong> {order.isPaid ? '✅ Paid' : '❌ Not Paid'}</p>

            <div className="mt-2">
              <h4 className="font-semibold">Items:</h4>
              <ul className="list-disc list-inside">
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
