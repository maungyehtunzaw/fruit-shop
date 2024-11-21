import express from 'express';
import { getOrders, getOrderById } from '../controllers/orderController';
import  authMiddleware  from '../middleware/authMiddleware'; // Make sure this import is correct

const router = express.Router();
router.get('/',authMiddleware,getOrders); // Add authMiddleware here
router.get('/:id',authMiddleware, getOrderById); // Add authMiddleware here as well
// router.post('/',authMiddleware, createOrder); // POST create new order (logged in)

export default router;