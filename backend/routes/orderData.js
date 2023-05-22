import express from 'express';
import orderModel from '../models/Orders.js';
const order_router = express.Router();

order_router.post('/orderData', async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });

  let eId = await orderModel.findOne({ email: req.body.email });
  // console.log(eId);
  if (!eId) {
    //if user doesn't exist create his order
    try {
      const orderDoc = new orderModel({
        email: req.body.email,
        order_data: [data],
      });
      await orderDoc.save();
      res.json({ success: true });
    } catch (error) {
      res.status(500).send('Internal Server error');
      console.log(error);
    }
  } else {
    try {
      await orderModel.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ); //$push to append the data corresponding to the user
      res.json({ success: true });
    } catch (error) {
      res.status(500).send('Internal Server error');
      console.log(error);
    }
  }
});

order_router.post('/myOrders', async (req, res) => {
  try {
    const myData=await orderModel.findOne({email:req.body.email})
    res.json({orderData:myData})
  } catch (error) {
    res.status(500).send('Internal Server error');
  }
});

export default order_router;
