import express from 'express';
import {
  getDreamTeam,
  addDreamTeam,
  removeDreamTeam,
  getAllDreamTeams,
} from '../controllers/dreamTeamController.js';
import requireAuth from '../middlewares/requireAuth.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', getDreamTeam); // Get dream team by user ID
router.post('/add', addDreamTeam); // Add dream team
router.delete('/remove/:id', removeDreamTeam); // Remove dream team
router.get('/all', getAllDreamTeams); // Get all dream teams

export default router;
