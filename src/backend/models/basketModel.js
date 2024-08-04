import mongoose from 'mongoose';

const basketSchema = new mongoose.Schema(
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

const Basket = mongoose.model('Basket', basketSchema);
export default Basket;
