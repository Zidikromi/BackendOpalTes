import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PutData } from '../api'; 

const EditForm = () => {
  const { id } = useParams(); 

  const [editData, setEditData] = useState({
    pass: '',
    pass_confirm: '',
    name: '',
  });

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEdit = async () => {
    try {
      await PutData(id, editData); 

    } catch (error) {
      console.error('Error during edit:', error);
     
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit();
    window.location.href = '/data'
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 border shadow-md">
        <h2 className="text-2xl font-bold mb-6">Edit Data</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 text-sm font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={editData.name}
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
            value={editData.pass}
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
            value={editData.pass_confirm}
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
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
