import dotenv from 'dotenv';
import express from 'express';
import cors    from 'cors';
import { connectDB } from './config/db.js';
import authRoutes   from './routes/authRoutes.js';
import bookRoutes   from './routes/bookRoutes.js';
import orderRoutes  from './routes/orderRoutes.js';
import mongoose from 'mongoose';


dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
  


app.use('/api/auth',  authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/orders',orderRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
