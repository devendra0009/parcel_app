import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsCartCheckFill } from 'react-icons/bs';
import Modal from '../screens/Modal';
import { useCart } from './ContextReducer';

const Navbar = ({ searchFromChild }) => {
  const navigate = useNavigate();
  let data = useCart();
  let qtty=data.length
  const [modal,setModal]=useState(false)
  const [navbar, setNavbar] = useState(false);
  return (
    <div>
      <nav className="w-full shadow bg-purple-300">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link to="/">
                <h2 className="text-2xl font-bold">FOODIE</h2>
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'block' : 'hidden'
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-gray-600 hover:text-blue-600">
                  <Link to="/">Home</Link>
                </li>
                <li className="text-gray-600 hover:text-blue-600">
                  <Link to="/about">About US</Link>
                </li>
                <li className="text-gray-600 hover:text-blue-600">
                  <Link to="/contact"> Contact US</Link>
                </li>
                {localStorage.getItem('authToken') ? (
                  <>
                    <li className=''>
                      <Link to='/myOrders'>My Orders</Link>
                    </li>
                    <li className='relative '>
                      <button className=" py-2 rounded-md text-2xl ">
                        <BsCartCheckFill onClick={()=>setModal(!modal)}/>
                      </button>
                      {qtty>0&&<span class="bg-red-500 text-white text-xs font-medium absolute top-0 left-[15px] px-2.5 py-1 rounded-full ">{qtty}</span>}
                    </li>
                    <li className="text-white ">
                      <button
                        onClick={() => {
                          localStorage.removeItem('authToken');
                          navigate('/login');
                        }}
                        className="bg-red-500 px-4 py-2 md:ml-4 rounded-md hover:bg-red-600"
                      >
                        Log Out
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="text-white ">
                      <Link to="/login">
                        <button className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600">
                          Log In
                        </button>
                      </Link>
                    </li>
                    <li className="text-white ">
                      <Link to="/register">
                        <button className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
                          Sign Up
                        </button>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          {
            modal? <div className='absolute right-0 top-0'><Modal/></div> : <div className='absolute right-0'></div>
          }
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
