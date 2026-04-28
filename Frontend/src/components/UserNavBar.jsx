import React from 'react'
import { NavLink } from 'react-router'
import { useAuth } from '../store/useAuth'

function UserNavBar() {
  const { currentUser } = useAuth()
  const role = currentUser?.role

  return (
    <div className='flex items-center gap-4 bg-blue-200 px-4 py-2'>
      <NavLink to="/user-profile" className="px-3 py-2 rounded-md text-sm font-medium text-shadow-black hover:text-white hover:bg-gray-700">
        Profile
      </NavLink>
      {role === 'USER' && (
        <NavLink to="/user-dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-shadow-black hover:text-white hover:bg-gray-700">
          Dashboard
        </NavLink>
      )}
      {role === 'AUTHOR' && (
        <>
          <NavLink to="/author-dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-shadow-black hover:text-white hover:bg-gray-700">
            Dashboard
          </NavLink>
          <NavLink to="/add-article" className="px-3 py-2 rounded-md text-sm font-medium text-shadow-black hover:text-white hover:bg-gray-700">
            Write Article
          </NavLink>
        </>
      )}
      {role === 'ADMIN' && (
        <NavLink to="/admin-dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-shadow-black hover:text-white hover:bg-gray-700">
          Dashboard
        </NavLink>
      )}
   
    </div>
  )
}

export default UserNavBar
