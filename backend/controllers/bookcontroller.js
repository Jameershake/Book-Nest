import Book from '../models/Book.js'

// GET /api/books
export const getBooks = async (req, res) => {
  const { genre, author, title } = req.query
  const filter = {}
  if (genre) filter.genre = genre
  if (author) filter.author = author
  if (title)  filter.title  = new RegExp(title, 'i')
  const books = await Book.find(filter)
  res.json(books)
}

// GET /api/books/:id
export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id)
  if (!book) return res.status(404).json({ message: 'Book not found' })
  res.json(book)
}

// POST /api/books
export const createBook = async (req, res) => {
  const newBook = new Book(req.body)
  const created = await newBook.save()
  res.status(201).json(created)
}

// PUT /api/books/:id
export const updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id)
  if (!book) return res.status(404).json({ message: 'Book not found' })
  Object.assign(book, req.body)
  const updated = await book.save()
  res.json(updated)
}

// DELETE /api/books/:id
export const deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id)
  res.json({ message: 'Book removed' })
}
