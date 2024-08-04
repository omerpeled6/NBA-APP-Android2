import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    player_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Like = mongoose.model('Like', likeSchema);
export default Like;
