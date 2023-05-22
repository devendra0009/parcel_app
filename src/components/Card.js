import React, { useEffect, useRef, useState } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';

const Card = ({ foodItems }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  let dispatch = useDispatchCart();
  let data = useCart();
  const opt = foodItems.options[0];
  const priceRef = useRef();
  // opt.nothing = '0';
  let priceOptions = Object.keys(opt);
  const handleSelectChange = (e) => {
    setQuantity(e.target.value);
  };
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  let price = parseInt(opt[size]) * quantity;

  const handleAddToCart = async () => {
    // console.log(data);
    let food = [];
    for (const item of data) {
      // console.log('inside data arr');
      //if the item we are trying to add is already existing in our cart then,
      if (item.id === foodItems._id) {
        food = item;
        break;
      }
    }
    // console.log(food);
    //means koi item update hua h, jo ki phle se hi exist krra tha
    if (food.length!==0) {
      //hme update tb krna h agr quantity change ho, agr size hi change hora h to vo to new order h => append it as a new Order
      // console.log('update ho skta',food.sz,size);
      if (food.sz === size) {
        //this means size m koi change nhi aya, update kr
        // console.log('update hoga pkka');
        await dispatch({
          type: 'UPDATE',
          id: foodItems._id,
          name: foodItems.name,
          price: price,
          img: foodItems.img,
          desc: foodItems.description,
          qty: quantity,
          sz: size,
        });
        return;
      } else if (food.size !== size)
        {await dispatch({
          type: 'ADD',
          id: foodItems._id,
          name: foodItems.name,
          price: price,
          img: foodItems.img,
          desc: foodItems.description,
          qty: quantity,
          sz: size,
        }); return;}
        return;
    }
    await dispatch({
      type: 'ADD',
      id: foodItems._id,
      name: foodItems.name,
      price: price,
      img: foodItems.img,
      desc: foodItems.description,
      qty: quantity,
      sz: size,
    });
    // await console.log(data);
  };
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  // console.log(opt);
  return (
    <div className="max-w-md text-center mx-auto bg-white rounded-xl shadow-md overflow-hidden ">
      <div className="md:flex flex-col">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover "
            src={foodItems.img}
            alt="Card"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {foodItems.name}
          </div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black ">
            {foodItems.description}
          </p>
          <div className="select flex justify-evenly ">
            <select
              className=" py-2 px-4 mt-3 border border-gray-400 rounded-md shadow-sm "
              value={size}
              ref={priceRef}
              onChange={handleSizeChange}
            >
              {priceOptions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <select
              className=" py-2 px-4 mt-3 border border-gray-400 rounded-md shadow-sm "
              value={quantity}
              onChange={handleSelectChange}
            >
              {Array.from(Array(5), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="footer_card flex mt-5 justify-center gap-6 items-center">
            <div className="  rounded-md bg-purple-300 px-4 py-3">
              Total Price Rs.{price}
            </div>
            <div
              className="addToCart cursor-pointer rounded-md bg-green-400 px-4 py-3 hover:bg-green-500"
              onClick={handleAddToCart}
            >
              Add To Cart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
