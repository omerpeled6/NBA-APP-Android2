import mongoose from 'mongoose';
import DreamTeam from '../models/dreamTeamModel.js';

/************************************ Get Dream Team By User ID ************************************/
export const getDreamTeam = async (req, res) => {
  const { user_id } = req.query;

  try {
    const dreamTeams = await DreamTeam.find({ user_id });
    const dreamTeamCount = dreamTeams.length;
    res.status(200).json({ dreamTeamCount, dreamTeams });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/************************************ Add Dream Team ************************************/
export const addDreamTeam = async (req, res) => {
  const { user_id, player_ids } = req.body;

  if (!player_ids || player_ids.length > 5) {
    return res
      .status(400)
      .json({ message: 'Dream team can contain a maximum of 5 players' });
  }

  const dreamTeam = new DreamTeam({
    user_id,
    player_ids: player_ids.map(String), // Ensure player_ids are stored as strings
  });

  try {
    const newDreamTeam = await dreamTeam.save();
    res.status(201).json(newDreamTeam);
  } catch (error) {
    console.error('Error saving dream team:', error);
    res.status(400).json({ message: error.message });
  }
};

/************************************ Remove Dream Team ************************************/
export const removeDreamTeam = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Incorrect ID' });
  }

  const dreamTeam = await DreamTeam.findById(req.params.id);
  if (!dreamTeam) {
    return res.status(400).json({ error: 'Dream team not found' });
  }

  try {
    await dreamTeam.deleteOne();
    res.status(200).json({ success: 'Dream team was deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/************************************ Get All Dream Teams ************************************/
export const getAllDreamTeams = async (req, res) => {
  try {
    const dreamTeams = await DreamTeam.find();
    res.status(200).json(dreamTeams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
