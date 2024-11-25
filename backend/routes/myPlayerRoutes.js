import express from 'express';
import requireAuth from '../middlewares/requireAuth.js';
import {
  getMyPlayer,
  getAllPlayer,
  createPlayer,
  deletePlayer,
} from '../controllers/myPlayerController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // configure multer storage

// require auth for all routes
router.use(requireAuth);

// GET Players by User
router.get('/', getMyPlayer);

// GET all Players
router.get('/all', getAllPlayer);

// POST a new player
router.post('/', upload.single('img'), createPlayer);

// DELETE a player
router.delete('/:id', deletePlayer);

export default router;
