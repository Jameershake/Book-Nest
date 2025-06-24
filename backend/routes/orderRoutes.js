import express from 'express'
import { addOrder, getMyOrders } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()
router.post('/',      protect, addOrder)
router.get('/myorders', protect, getMyOrders)
export default router
