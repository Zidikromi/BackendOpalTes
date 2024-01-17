// RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const baseUrl = 'http://localhost:3000';


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    pass: '',
    pass_confirm: '',
    name: '',
    address: '',
    cityId: '',
    hobbies: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const postRegister = async () => {
    try {
      const register = await axios.post(`${baseUrl}/api/user`, formData);
      console.log({ Register: register.data });
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postRegister();
    window.location.href = '/login'
  };

  return (
    <div className="container mx-auto mt-8">
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 border shadow-md">
      <h2 className="text-2xl font-bold mb-6">Registrasi</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-600 text-sm font-semibold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
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
          value={formData.pass}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="pass_confirm" className="block text-gray-600 text-sm font-semibold mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          id="pass_confirm"
          name="pass_confirm"
          value={formData.pass_confirm}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-600 text-sm font-semibold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-600 text-sm font-semibold mb-2">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="cityId" className="block text-gray-600 text-sm font-semibold mb-2">
          City ID
        </label>
        <input
          type="text"
          id="cityId"
          name="cityId"
          value={formData.cityId}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="hobbies" className="block text-gray-600 text-sm font-semibold mb-2">
          Hobbies
        </label>
        <input
          type="text"
          id="hobbies"
          name="hobbies"
          value={formData.hobbies}
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
          Daftar
        </button>
      </div>
      <p className="text-sm text-gray-600">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login disini
          </Link>
        </p>
    </form>
  </div>
  );
};

export default RegisterForm;