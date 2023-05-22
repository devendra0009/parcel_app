import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyOrders = () => {
  const [orderData, setOrderData] = useState({});
  const fetchMyOrder = async () => {
    const res = await fetch('http://localhost:8000/myOrders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail'),
      }),
    });
    const d = await res.json();
    console.log(d);
    await setOrderData(d);
  };
  useEffect(() => {
    fetchMyOrder();
  }, []);
  console.log(orderData);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="">
        {orderData !== {} ? (
          Array(orderData).map((data) => {
            return data.orderData ? (
              data.orderData.order_data
                .slice(0)
                .reverse()
                .map((item) =>( <div className=''>
                  {item.map((arrData) => (arrData.Order_date ? (
                        <div className="mt-5 text-center bg-emerald-300 p-4">
                          {(data = arrData.Order_date)}
                          <hr />
                        </div>
                      ) : (
                        <div className="bg-blue-300  flex flex-col justify-center items-center my-2">
                            <h3>{arrData.name}</h3>
                            <h3>{arrData.sz}</h3>
                            <h3>{arrData.price}</h3>
                            <h3>{arrData.qty}</h3>
                        </div>
                      )
                  ))
                  }</div>)
                )
            ) : (
              <div> YOO </div>
            );
          })
        ) : (
          <div>no</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MyOrders;
