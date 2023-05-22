import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import {AiFillDelete} from 'react-icons/ai'

const Modal = () => {
  let data = useCart();
  const dispatch = useDispatchCart();
  const handleCheckout=async(e)=>{
    e.preventDefault();
    try {
      let userEmail=localStorage.getItem('userEmail');
      const res=await fetch('http://localhost:8000/orderData',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail,
          order_data: data,
          order_date: new Date().toDateString()
        }),
      })
      let d=await res.json()
      if(d.success) 
      {
        dispatch({type:'DROP'})
      }
      // console.log(userEmail,data);
    } catch (error) {
      console.log('ERROR!!',error);
    }
  }
  // console.log(data);
  if (data.length === 0)
    return <div className="bg-black text-white py-8 px-5">No Items!!</div>;
  return (
    <div className="bg-black text-white py-8 px-5">
      <table className=''>
        <thead className="">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr>
              <td>{d.name}</td>
              <td>{d.price}</td>
              <td>{d.qty}</td>
              <td>{d.sz}</td>
              <td>
                <AiFillDelete className=" text-red-400 text-lg cursor-pointer"
                onClick={() => {
                  dispatch({ type: 'REMOVE', index: i });
                }} />
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-green-500 text-black text-sm rounded-md p-2 hover:bg-green-600 mt-5"
        onClick={handleCheckout}
      >
        CheckOut
      </button>
    </div>
  );
};

export default Modal;
