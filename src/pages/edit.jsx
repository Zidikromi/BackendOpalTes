import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { GetUserId, PutData } from '../api';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [editData, setEditData] = useState({
    pass: '',
    pass_confirm: '',
    name: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await GetUserId(id);
        setEditData({
          pass: userData.pass,
          pass_confirm: userData.pass_confirm,
          name: userData.name,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error as needed
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEdit = async () => {
    try {
      // Check for empty fields
      if (!editData.name || !editData.pass || !editData.pass_confirm) {
        toast.error('Please fill in all fields.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
        return;
      }
      if (editData.pass !== editData.pass_confirm) {
        toast.error('Password and Confirm Password do not match.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
        return;
      }

      await PutData(id, editData);
      localStorage.setItem('editSuccess', 'true');
    } catch (error) {
      console.error('Error during edit:', error);
      toast.error('Edit failed. Please check your credentials.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      localStorage.setItem('editSuccess', 'false');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleEdit(); 
    navigate('/data'); 
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} noValidate className="max-w-md mx-auto bg-white p-8 border shadow-md">
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
            className="w-full  bg-red-500 text-white py-2 px-4 rounded-2xl transition-all  hover:bg-red-700 focus:outline-none"
          >
            Edit
          </button>
        </div>
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
        transition={{ bounce: 'bounce', duration: 500 }}
      />
    </div>
  );
};

export default EditForm;
