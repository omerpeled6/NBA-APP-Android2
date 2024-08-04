import mongoose from 'mongoose';

const myPlayerSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    height_m: {
      type: Number,
      required: true,
    },
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

const MyPlayer = mongoose.model('MyPlayer', myPlayerSchema);
export default MyPlayer;
