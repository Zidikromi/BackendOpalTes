// LoginForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const baseUrl = 'http://localhost:3000';


const LoginForm = () => {
  const navigate = useNavigate()
  const [loginData, setloginData] = useState({
    email: '',
    pass: '',
  });


  useEffect(() => {
    // Check if the login was successful
    const logout = localStorage.getItem('logout');
    if (logout === 'false') {
      // Show toast message for successful login
      toast.success('Logout successful', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      // Clear the flag after displaying the toast
      localStorage.removeItem('logout');
    }

  }, []);

  const handleChange = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const postLogin = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/user/auth`, loginData);
      const { token } = response.data;
  
      localStorage.setItem('token', token);
  
      console.log('Login successful');
  
      // Set a flag to indicate successful login
      localStorage.setItem('loginSuccess', 'true');
  
      navigate('/data');
  
    } catch (error) {
      console.error('Error during login:', error);
  
      // Show toast message for login failure
      toast.error('Login failed. Please check your credentials.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    postLogin();
    
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 border shadow-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="pass" className="block text-gray-600 text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="pass"
            name="pass"
            value={loginData.pass}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>



        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
          >
            Login
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Belum Punya akun?{' '}
          <Link to="/" className="text-blue-500 hover:underline">
            Register disini
          </Link>
        </p>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={{ bounce: "bounce", duration: 500 }}
      />
    </div>
  );
};

export default LoginForm;