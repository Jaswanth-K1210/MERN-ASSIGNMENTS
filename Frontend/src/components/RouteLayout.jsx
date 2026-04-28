import React from 'react'
import { Outlet, useLocation } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import UserNavBar from './UserNavBar'
import { useAuth } from '../store/useAuth'
import { useEffect } from 'react'

function RouteLayout() {
  const { isAuthenticated, checkAuth } = useAuth()
  const { pathname } = useLocation()
  const hideNavBar = ['/login', '/register', '/'].includes(pathname)

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <div className='flex flex-col min-h-screen mx-0'>
      <Header />
      {isAuthenticated && !hideNavBar && <UserNavBar />}
      <Outlet />
      <Footer />
    </div>
  )
}

export default RouteLayout
