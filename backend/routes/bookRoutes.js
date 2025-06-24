import express from 'express';
import mongoose from 'mongoose';
import Book from '../models/Book.js';

const router = express.Router();

// ✅ Add a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, description, price, cover, countInStock } = req.body;
    const book = new Book({ title, author, description, price, cover, countInStock });
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Fetch all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Fetch a single book by ID (with ObjectId validation)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid book ID format' });
  }

  try {
    const book = await Book.findById(id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
