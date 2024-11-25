// import mongoose from 'mongoose';
import Basket from '../models/basketModel.js';

/************************************ Get Basket By Id ************************************/
const getBasket = async (req, res) => {
  const { user_id } = req.query;

  try {
    const baskets = await Basket.find({ user_id });
    const basketCount = baskets.length;
    res.status(200).json({ basketCount, baskets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/************************************ Add to Basket ************************************/
const addToBasket = async (req, res) => {
  const { user_id, player_id } = req.body;

  const basket = new Basket({
    user_id,
    player_id,
  });

  try {
    const newBasket = await basket.save();
    res.status(201).json(newBasket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/************************************ Remove from Basket ************************************/
const removeFromBasket = async (req, res) => {
  const { user_id } = req.body;
  const player_id = req.params.id;

  try {
    const basket = await Basket.findOneAndDelete({ user_id, player_id });
    if (!basket) {
      return res.status(400).json({ error: 'Basket not found' });
    }
    res.status(200).json({ success: 'Basket was deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Corrected typo: changed `res.status500` to `res.status(500)`
  }
};

/************************************ Clear Basket ************************************/
const clearBasket = async (req, res) => {
  const { user_id } = req.body;

  try {
    await Basket.deleteMany({ user_id });
    res.status(200).json({ success: 'Basket was cleared.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getBasket, removeFromBasket, addToBasket, clearBasket };
