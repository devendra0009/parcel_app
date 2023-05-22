import express from 'express';
import connectDb from './db/connectDb.js';
import create_router from './routes/createUser.js';
import cors from 'cors';
import display_router from './routes/displayData.js';
import order_router from './routes/orderData.js';

const DB_URL =
  'mongodb+srv://devendrabedwal4:qnwffeIrQwDe0Tzv@cluster0.ovbg9kx.mongodb.net/foodie?retryWrites=true&w=majority';
const app = express();

connectDb(DB_URL);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('yo'));
app.use('/', create_router);
app.use('/', display_router);
app.use('/', order_router);

app.listen(8000, () => console.log('Server running...'));
