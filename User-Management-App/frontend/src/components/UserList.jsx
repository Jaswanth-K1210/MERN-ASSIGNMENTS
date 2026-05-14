import { useEffect, useState } from "react";
import { use } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function UserList() {
  let [loading, setLoading] = useState(true);
  let [users, setUsers] = useState([]);
  let [error, setError] = useState(null);
  let [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  // use axios to fetch data from backend and store it in users state variable

  useEffect(() => {
    setLoading(true);
    async function fetchUsers() {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        let res = await axios.get(`${API_URL}/user-api/users`);
        if (res.status === 200) {
          setUsers(res.data.users);
          console.log("Fetched users:", res.data.users);
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (err) {
        console.log("Error fetching users:", err);
        setError(err.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  //const users = [
  //   { id: 1, name: 'John Doe', email: 'hauh@gmaail.com', dateOfBirth: '1990-01-01', mobileNumber: '1234567890' },
  //  { id: 2, name: 'Jane Doe', email: 'jane@example.com', dateOfBirth: '1992-05-15', mobileNumber: '0987654321' }
  // ];
  const handleCardClick = (userObj) => {
    navigate(`/usercard/${userObj._id}`, { state: userObj });
  };
  const handleSearch = async (id) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      let res = await fetch(`${API_URL}/user-api/users/${id}`);
      if (res.status === 200) {
        let data = await res.json();
        navigate(`/usercard/${id}`, { state: data.user });
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      console.log("Error searching user:", err);
      alert("Error searching user: " + err.message);
    }
  };

  // display

  const userCards = users.map((user) => (
    <div
      key={user._id}
      className="bg-white p-6 rounded-lg w-full items-center text-center shadow-md shadow-gray-300 hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => handleCardClick(user)}
    >
      <h3 className="font-bold text-3xl mb-4">{user.name}</h3>
      <p className="text-xl mb-2">Email: {user.email}</p>
      <p className="text-xl mb-2">DOB: {new Date(user.dateOfBirth).toISOString().split('T')[0]}</p>
      <p className="text-xl">Mobile: {user.mobileNumber}</p>
    </div>
  ));

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <h2 className="py-6 text-center text-4xl font-bold bg-blue-600 text-white mb-8 shadow-md">
        User List
      </h2>
      <form
        className="flex items-center justify-center gap-4 p-4 mb-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchTerm);
        }}
      >
        <input
          type="text"
          placeholder="Search by MongoDB ID..."
          className="border border-gray-300 p-2 w-full max-w-md rounded focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
        >
          Search
        </button>
      </form>
      {loading ? (
        <div className="text-center text-2xl">Loading users...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-xl">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 max-w-7xl mx-auto">
          {userCards}
        </div>
      )}
    </div>
  );
}

export default UserList;
