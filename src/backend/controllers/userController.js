import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const createToken = (_id, fullName) => {
  return jwt.sign({ _id, fullName }, process.env.SECRET, { expiresIn: '3d' });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id, user.fullName);

    res.status(200).json({ email, fullName: user.fullName, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const user = await User.signup(fullName, email, password);

    // create a token
    const token = createToken(user._id, user.fullName);

    res.status(200).json({ email, fullName: user.fullName, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { signupUser, loginUser };
