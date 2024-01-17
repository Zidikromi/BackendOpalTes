import React, { useEffect, useState } from 'react'
import { GetUser, deleteData } from './api';
import { MdDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const GetData = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()

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
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleLogout = () => {
    // Remove the token from localStorage or wherever it is stored
    localStorage.removeItem('token');
    // Redirect to the login page or any other appropriate page
    // Replace '/login' with your actual login route
    navigate('/login');
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
    </div>
  )
}

export default GetData