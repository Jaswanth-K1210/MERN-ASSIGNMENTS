import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();

  // State as an object with proper setter name
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    dateOfBirth: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //  Unique function name — not conflicting with state setter
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let res = await axios.post('http://localhost:3000/user-api/register', user);
      if (res.status === 201) {
        console.log('User added:', res.data);
        alert('User added successfully!');
        navigate('/userlist');
      } else {
        throw new Error('Failed to add user');
      }
    } catch (err) {
      console.log('Error adding user:', err);
      alert('Error adding user: ' + (err.response?.data?.message || err.message));
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">User Management App</h1>
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-200"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Register New User</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={user.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={user.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Enter mobile number"
              value={user.mobileNumber}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={user.dateOfBirth}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors w-full"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;