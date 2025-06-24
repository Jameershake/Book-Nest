import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema(
  {
    title:        { type: String, required: true },
    author:       { type: String, required: true },
    genre:        { type: String },
    description:  { type: String },
    price:        { type: Number, required: true },
    rating:       { type: Number, default: 0 },
    countInStock: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Book', bookSchema)
