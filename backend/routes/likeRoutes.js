import express from 'express';
import {
  getLikes,
  createLike,
  getLikesByUser,
  deleteLike,
} from '../controllers/likeController.js';
import requireAuth from '../middlewares/requireAuth.js';

const router = express.Router();

// require auth for all Likes routes
router.use(requireAuth);

// GET Like by User
router.get('/', getLikesByUser);

// GET all Likes
router.get('/all', getLikes);

// POST a new player
router.post('/', createLike);

// DELETE a player
router.delete('/:id', deleteLike);

export default router;
