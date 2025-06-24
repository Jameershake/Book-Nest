import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  book: { type: mongoose.Types.ObjectId, ref: 'Book', required: true },
  qty:  { type: Number, required: true },
})

const orderSchema = new mongoose.Schema(
  {
    user:       { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    orderItems: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    isPaid:     { type: Boolean, default: false },
    paidAt:     { type: Date },
  },
  { timestamps: true }
)

export default mongoose.model('Order', orderSchema)
