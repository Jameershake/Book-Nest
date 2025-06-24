import mongoose from 'mongoose';
import dotenv   from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('🛑 MongoDB connection error:', err.message);
    process.exit(1);
  }
};
