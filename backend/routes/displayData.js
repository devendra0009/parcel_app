import express from 'express';
import userModel from '../models/User.js';
const display_router = express.Router();

display_router.post('/foodData', (req, res) => {
  try {
    const food_data = [global.food_categories, global.food_content];
    res.send(food_data);
  } catch (error) {
    console.log(error);
    res.status(500).send('server errror');
  }
});

export default display_router;
