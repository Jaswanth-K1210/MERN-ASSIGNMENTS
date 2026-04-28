import React from 'react'
import { useAuth } from '../store/useAuth'
import { useNavigate } from 'react-router'

function UserProfile() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const onlogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="bg-gray-200 flex-1 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        {currentUser?.profileImageUrl && (
          <img
            src={currentUser.profileImageUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
        )}
        <h1 className="text-3xl font-bold mb-2">
          {currentUser?.firstName} {currentUser?.lastName}
        </h1>
        <p className="text-gray-600 text-lg mb-2">{currentUser?.email}</p>
        <span className="inline-block bg-sky-100 text-sky-700 text-sm font-semibold px-3 py-1 rounded-full mb-6">
          {currentUser?.role}
        </span>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/change-password')}
            className="bg-sky-400 text-white px-4 py-2 rounded hover:bg-sky-500 cursor-pointer"
          >
            Change Password
          </button>
          <button
            onClick={onlogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
