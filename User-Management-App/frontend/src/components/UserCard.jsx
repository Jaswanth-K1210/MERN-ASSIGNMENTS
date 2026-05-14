import React, { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router'


function UserCard() {
    let location = useLocation();
    const navigate = useNavigate();
    let initialUser = location.state;
    const [user, setUser] = useState(initialUser);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(initialUser);

    console.log(user);
    
    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const updateUser = async () => {
        try {
            const res = await fetch(`http://localhost:3000/user-api/users/${user._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData),
            });
            if (res.status === 200) {
                const updatedUser = await res.json();
                setUser(updatedUser.user);
                setIsEditing(false);
                alert('User updated successfully');
            } else {
                throw new Error('Failed to update user');
            }
        } catch (err) {
            console.log('Error updating user:', err);
            alert('Error updating user: ' + err.message);
        }
    };

    const deleteUser = async () => {
        try {
            const res = await fetch(`http://localhost:3000/user-api/users/${user._id}`, {
                method: 'DELETE'
            });
            if (res.status === 200) {
                alert('User deleted successfully');
                navigate('/userlist');
            } else {
                throw new Error('Failed to delete user');
            }
        } catch (err) {
            console.log('Error deleting user:', err);
            alert('Error deleting user: ' + err.message);
        }
    };

    if(!user){
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">No user data available</h1>
                <NavLink to="/userlist" className="bg-blue-500 text-white px-4 py-2 rounded">Go to User List</NavLink>
            </div>
        )
    }
    console.log(user);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
    };

  return (
    <div>
        {isEditing ? (
            <div className="bg-white p-4 rounded-md w-full items-center text-center shadow-md">
                <input type="text" name="name" value={editData.name} onChange={handleChange} className="border p-2 mb-2 w-full" />
                <input type="email" name="email" value={editData.email} onChange={handleChange} className="border p-2 mb-2 w-full" />
                <input type="date" name="dateOfBirth" value={formatDate(editData.dateOfBirth)} onChange={handleChange} className="border p-2 mb-2 w-full" />
                <input type="number" name="mobileNumber" value={editData.mobileNumber} onChange={handleChange} className="border p-2 mb-2 w-full" />
                <div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded mt-2 mr-2" onClick={updateUser}>Save</button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded mt-2" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            </div>
        ) : (
            <div className="bg-white p-4 rounded-md w-full items-center text-center shadow-md">
                <h3 className='font-bold text-4xl mb-7'>{user.name}</h3>
                <p className='text-2xl mb-5'>email: {user.email}</p>
                <p className='text-2xl mb-5'>id: {user.uid || user._id}</p>
                <p className='text-2xl mb-5'>Date of Birth: {formatDate(user.dateOfBirth)}</p>
                <p className='text-2xl mb-5'>Mobile Number: {user.mobileNumber}</p>
            </div>
        )}
        <button className="bg-blue-500 text-white px-4 py-2 flex-inline items-center rounded mt-4" onClick={() => navigate('/userlist')}>Go Back</button>
        {!isEditing && <button className="bg-yellow-500 text-white px-4 py-2 rounded items-center mt-4 ml-4" onClick={() => setIsEditing(true)}>Edit</button>}
        <button className="bg-red-500 text-white px-4 py-2 rounded items-center mt-4 ml-4" onClick={deleteUser} >Delete</button>
    </div>

  )
}

export default UserCard