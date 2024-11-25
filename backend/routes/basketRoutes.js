import express from 'express';
import {
  getBasket,
  addToBasket,
  removeFromBasket,
  clearBasket,
} from '../controllers/basketController.js';
import requireAuth from '../middlewares/requireAuth.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', getBasket); // Get basket by user ID
router.post('/', addToBasket); // Add to basket
router.delete('/:id', removeFromBasket); // Remove from basket
router.post('/clear', clearBasket); // Clear basket

export default router;
