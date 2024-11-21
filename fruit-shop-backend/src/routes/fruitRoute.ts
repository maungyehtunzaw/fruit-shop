import express from 'express';
const router = express.Router();
import { getAllFruits, getFeaturedFruits, getFruitById, getFruitWithPagination } from '../controllers/fruitController';
router.route('/').get(getAllFruits);
router.route('/features').get(getFeaturedFruits);
router.route('/:id').get(getFruitById);
router.route('/pagin').get(getFruitWithPagination);
export default router;