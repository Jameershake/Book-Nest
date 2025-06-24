import Order from '../models/Order.js'
import Book  from '../models/Book.js'

// POST /api/orders
export const addOrder = async (req, res) => {
  const { orderItems, totalPrice } = req.body
  if (!orderItems || !orderItems.length) {
    return res.status(400).json({ message: 'No order items' })
  }
  // Deduct stock
  for (const item of orderItems) {
    const book = await Book.findById(item.book)
    if (book.countInStock < item.qty) {
      return res.status(400).json({ message: `Not enough stock for ${book.title}` })
    }
    book.countInStock -= item.qty
    await book.save()
  }
  const order = new Order({ user: req.user._id, orderItems, totalPrice })
  const created = await order.save()
  res.status(201).json(created)
}

// GET /api/orders/myorders
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate(
    'orderItems.book',
    'title author price'
  )
  res.json(orders)
}
