import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer.js';
import Navbar from '../components/Navbar.js';
import Card from '../components/Card';

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    //ye first time page loading pe khud hi post request mardega is endpoint pe
    const res = await fetch('http://localhost:8000/foodData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    setFoodCat(json[0]);
    setFoodItem(json[1]);
  };
  useEffect(() => {
    loadData();
  }, []);


  return (
    <div>
      <div>
        <Navbar />
      </div>
    <div className="search_bar my-8 mx-auto flex justify-center items-center">
              <label for="simple-search" class="sr-only">
                Search
              </label>
              <div class="relative ">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="simple-search"
                  class="bg-gray-50 border text-black border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-purple-300 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  // required
                  value={search}
                  onChange={(e)=>{setSearch(e.target.value);}}
                />
              </div>
          </div>
      <div className="main_section  ">
        {/* <div className="carousel">
          <Carousel/>
        </div> */}

        {foodCat !== [] ? (
          foodCat.map((f) => (
            <div key={f._id}>
              <h2 className=" text-center py-5 text-xl ">{f.CategoryName}</h2>
              <hr />
              {
                <div className="cards grid grid-cols-4 gap-4 py-8">
                  {foodItem !== [] ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === f.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                      )
                      .map((fi) => (
                        <div key={fi._id} className="">
                          <Card
                            // name={fi.name}
                            // img={fi.img}
                            // options={fi.options}
                            // desc={fi.description}
                            foodItems={fi}
                          />
                        </div>
                      ))
                  ) : (
                    <div>No Items</div>
                  )}
                </div>
              }
            </div>
          ))
        ) : (
          <div >
            
          </div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
