import MyPlayer from '../models/myPlayerModel.js';
import fs from 'fs';

/************************************ Get All Players ************************************/
const getAllPlayer = async (req, res) => {
  try {
    const players = await MyPlayer.find();
    const playersCount = players.length;
    res.status(200).json({ playersCount, players });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/************************************ Get Players by User ************************************/
const getMyPlayer = async (req, res) => {
  const { user_id } = req.query;

  try {
    const players = await MyPlayer.find({ user_id });
    const playersCount = players.length;
    res.status(200).json({ playersCount, players });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/************************************ Create New MyPlayer ************************************/
const createPlayer = async (req, res) => {
  const { user_id, name, country, number, position, age, height_m } = req.body;

  const img = {
    data: fs.readFileSync(req.file.path),
    contentType: req.file.mimetype,
  };

  const player = new MyPlayer({
    user_id,
    name,
    country,
    number,
    position,
    age,
    height_m,
    img,
  });

  try {
    const newMyPlayer = await player.save();
    res.status(201).json(newMyPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/************************************ Delete Player ************************************/
const deletePlayer = async (req, res) => {
  const { id } = req.params;

  try {
    const player = await MyPlayer.findByIdAndDelete(id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.status(200).json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getMyPlayer, getAllPlayer, createPlayer, deletePlayer };
