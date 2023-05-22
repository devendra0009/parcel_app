import express from 'express';
import userModel from '../models/User.js';
import express_validator from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { body, validationResult } = express_validator;

const JWT_SECRET = 'faskdjfajfjajwfjasnkjfnaxowopq';

const create_router = express.Router();

create_router.post(
  '/createuser',
  [
    body('name').notEmpty(),
    body('email', 'Please Enter Correct Email').isEmail(),
    body('password').isLength({ min: 4 }),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      const userDoc = new userModel({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        location: req.body.location,
      });
      await userDoc.save();
      res.status(200).json({ success: true, userDoc });
    } catch (err) {
      res.status(500).json({ success: false });
      console.log(err);
    }
  }
);
create_router.post(
  '/getuser',
  [
    body('email', 'Please Enter Correct Email').isEmail(),
    body('password').isLength({ min: 4 }),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      const user = await userModel.findOne({ email: email });
      if (!user) res.json({ error: 'User doesnt exist' });
      const pwdComp = await bcrypt.compare(password, user.password);
      if (!pwdComp) {
        res.json({ error: 'Password wrong' });
      }
      const data = {
        userData: {
          id: user._id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success: 'true', authToken: authToken });
    } catch (error) {
      console.log(error);
    }
  }
);

export default create_router;
