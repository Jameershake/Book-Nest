// seedBooks.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/Book.js'; // Adjust path if needed

dotenv.config();

const sampleBooks = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Classic',
    description: 'A novel about the American dream.',
    price: 10.99,
    rating: 4.5,
    countInStock: 10,
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    description: 'A dystopian novel about totalitarianism.',
    price: 12.5,
    rating: 4.7,
    countInStock: 8,
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Historical Fiction',
    description: 'A powerful story of racial injustice in the Deep South.',
    price: 9.99,
    rating: 4.8,
    countInStock: 15,
  },
];

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Book.deleteMany(); // Clear existing books
    const inserted = await Book.insertMany(sampleBooks);
    console.log('✅ Sample books inserted:', inserted);
    process.exit();
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedBooks();
