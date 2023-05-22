import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate=useNavigate();
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/getuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      // console.log(res);
      const json = await res.json();
      if(!json.success) alert('Invalid credentials')
      else {
        localStorage.setItem('authToken',json.authToken)
        localStorage.setItem('userEmail',credentials.email)
        navigate('/')
      }
      // console.log(json);
    } catch (error) {
      console.log('hi',error);
    }
  };
  const onChange = async (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="main h-screen">
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
        <input type="email" id="email" name="email" value={credentials.email} onChange={onChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
        <input type="password" id="password" name="password" value={credentials.password} onChange={onChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Log In</button>
        <Link to='/register'>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</button>
        </Link>
      </div>
    </form>
    </div>
    <div>
        <Footer />
      </div>
    </div>
  );
}

export default Login