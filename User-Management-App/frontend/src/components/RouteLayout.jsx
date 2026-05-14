import React from 'react'
import { NavLink, Outlet } from 'react-router'
import home from './home';
import UserList from './UserList';
import UserCard from './UserCard';
import Header from './Header';
import Footer from './Footer';

function RouteLayout() {
  return (
   <div className='flex flex-col min-h-screen mx-0'>
    <Header />
        

      {/* Render the matched child route */}
    <Outlet />
    <Footer />

   </div>
  )
}

export default RouteLayout