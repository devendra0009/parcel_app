import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderScehma = new Schema({
    email: {
      type: String,
      required: true,
      unique:true
    },
    order_data:{
        type:Array,
        required:true
    }
  });

const orderModel= mongoose.model('order',orderScehma)

export default orderModel;