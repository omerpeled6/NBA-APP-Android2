import mongoose from 'mongoose';

const dreamTeamSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    player_ids: {
      type: [String], // Ensure this is defined as an array of strings
      required: true,
    },
  },
  { timestamps: true }
);

const DreamTeam = mongoose.model('DreamTeam', dreamTeamSchema);

export default DreamTeam;
