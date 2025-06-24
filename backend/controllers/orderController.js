// controllers/orderController.js

import Order from '../models/Order.js';
import Book from '../models/Book.js';

// POST /api/orders
export const addOrder = async (req, res) => {
  const { orderItems, totalPrice, shippingAddress, paymentMethod } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  try {
    for (const item of orderItems) {
      const book = await Book.findById(item.book);
      if (!book || book.countInStock < item.qty) {
        return res.status(400).json({ message: `Not enough stock for ${book?.title || 'book'}` });
      }
      book.countInStock -= item.qty;
      await book.save();
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
    });

    const created = await order.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ THIS EXPORT WAS MISSING
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      'orderItems.book',
      'title author price'
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};
