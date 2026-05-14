import React from 'react'
import { NavLink } from 'react-router'

function Header() {
   return (
    <div className='flex justify-between items-center p-4 bg-gray-800 text-white'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0qCreqkTZL0F0bF9kZctFE1XVFocO__70kw&s" 
        alt="Logo" 
        className='h-15 w-15 rounded-full' />
        <nav>
            <ul className='flex space-x-4'>
                <li>
                    <NavLink to="/" className={({isActive})=> isActive ? ' text-blue-500 px-2 py-1 rounded' : 'text-white hover:text-red-500 px-2'}>Home</NavLink>

                </li>
                <li> 
                    <NavLink to="/userlist" className={({isActive})=> isActive ? ' text-blue-500 px-2 py-1 rounded' : 'text-white hover:text-red-500 px-2'}>User List</NavLink>
                </li>
                
            </ul>
        </nav>
    </div>
  )
}

export default Header