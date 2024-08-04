import express from 'express';

import { loginUser, signupUser } from '../controllers/userController.js';

// Create a new router object
const router = express.Router();

// Route for user login
router.post('/login', loginUser);

// Route for user signup
router.post('/signup', signupUser);

export default router;
