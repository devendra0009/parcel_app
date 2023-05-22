import mongoose from 'mongoose';

const connectDb = async (DB_URL) => {
  try {
    await mongoose.connect(DB_URL);
    console.log('Connected!');
    let fetched_categories =
      mongoose.connection.db.collection('food_categories');
    const cat_data = await fetched_categories.find({}).toArray();
    global.food_categories = cat_data;
    let fetched_items = mongoose.connection.db.collection('food_content');
    const items_data = await fetched_items.find({}).toArray();
    global.food_content = items_data;
    // console.log(global.food_categories,global.food_content);
    // console.log(data);
  } catch (error) {
    console.log('err: ', error);
    process.exit();
  }
};

export default connectDb;
