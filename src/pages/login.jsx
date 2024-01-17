// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const baseUrl = 'http://localhost:3000';


const LoginForm = () => {
    const navigate = useNavigate()
  const [loginData, setloginData] = useState({
    email: '',
    pass: '',
  });

  const handleChange = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const postLogin = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/user/auth`, loginData);
      const { token } = response.data;

      // Save the token to local storage
      localStorage.setItem('token', token);
      
      console.log('Login successful');
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
    postLogin();
    window.location.href = '/data'
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
    </form>
  </div>
  );
};

export default LoginForm;