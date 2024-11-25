import mongoose from 'mongoose';
import Like from '../models/likeModel.js';

/************************************ Get All Likes ************************************/
const getLikes = async (req, res) => {
  try {
    const likes = await Like.find();
    const likesCount = likes.length;
    res.status(200).json({ likesCount, likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/************************************ Get Likes by User ************************************/
const getLikesByUser = async (req, res) => {
  const { user_id } = req.query;

  try {
    const likes = await Like.find({ user_id });
    const likesCount = likes.length;
    res.status(200).json({ likesCount, likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/************************************ Create New Like ************************************/
const createLike = async (req, res) => {
  const { user_id, player_id } = req.body;

  const like = new Like({
    user_id,
    player_id,
  });

  try {
    const newLike = await like.save();
    res.status(201).json(newLike);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/************************************ Delete Like ************************************/
// const deleteLike = async (req, res) => {
//   // Check the ID is valid type
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ error: 'Incorrect ID' });
//   }

//   // Check the post exists
//   const like = await Like.findById(req.params.id);
//   if (!like) {
//     return res.status(400).json({ error: 'Like not found' });
//   }

//   try {
//     await like.deleteOne();
//     res.status(200).json({ success: 'Like was deleted.' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const deleteLike = async (req, res) => {
  const { user_id } = req.body;
  const player_id = req.params.id;

  try {
    const like = await Like.findOneAndDelete({ user_id, player_id });
    if (!like) {
      return res.status(400).json({ error: 'Like not found' });
    }
    res.status(200).json({ success: 'Like was deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getLikes, createLike, getLikesByUser, deleteLike };
