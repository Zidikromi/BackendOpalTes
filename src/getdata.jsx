import React, { useEffect, useState } from 'react'
import { GetUser, deleteData } from './api';
import { MdDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const GetData = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // Check if the login was successful
    const loginSuccess = localStorage.getItem('loginSuccess');
    if (loginSuccess === 'true') {
      // Show toast message for successful login
      toast.success('Login successful', {
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
      localStorage.removeItem('loginSuccess');
    }

  }, []);

  useEffect(() => {
    // Check if the login was successful
    const editSuccess = localStorage.getItem('editSuccess');
    if (editSuccess === 'true') {
      // Show toast message for successful login
      toast.success('Edit successful', {
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
      localStorage.removeItem('editSuccess');
    }

  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        GetUser().then((result) => {
          // console.log('User data:', result);
          setData(result);
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteData(id);
      setData((prevData) => prevData.filter((user) => user.id !== id));
      toast.success('Delete Succesfull', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleLogout = () => {
    // Remove the token from localStorage or wherever it is stored
    localStorage.removeItem('token');
    localStorage.setItem('logout', 'false');
    // Redirect to the login page or any other appropriate page
    // Replace '/login' with your actual login route
    window.location.href = '/login'
  };

  return (
    <div className="p-4">
      <div className='flex justify-end'>
        <button className='bg-red-600 text-white w-20 h-10 rounded-md' onClick={handleLogout}>Logout</button>
      </div>
      <table className="min-w-full border border-gray-300 mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Password</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.pass}</td>
              <td className="border p-2 flex gap-2 justify-center">
                <button className='btn bg-red-500 rounded-md text-white w-12 h-12 justify-center flex items-center' onClick={() => handleDelete(user.id)}> <MdDelete size={30} /> </button>
                <button className='btn bg-yellow-500 rounded-md text-white w-12 h-12 justify-center flex items-center' onClick={() => navigate(`/edit/${user.id}`)}> <FiEdit2 size={30} /> </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
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
  )
}

export default GetData