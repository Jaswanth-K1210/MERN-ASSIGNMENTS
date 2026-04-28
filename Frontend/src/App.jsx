import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RouteLayout from './components/RouteLayout'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import AddArticle from './components/AddArticle'
import EditArticle from './components/EditArticle'
import UserDashboard from './components/UserDashboard'
import AuthorDashboard from './components/AuthorDashboard'
import AdminDashboard from './components/AdminDashboard'
import UserProfile from './components/UserProfile'
import ChangePassword from './components/ChangePassword'
import ArticleCard from './components/ArticleCard'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RouteLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/register', element: <Register /> },
        { path: '/login', element: <Login /> },
        {
          path: '/user-dashboard',
          element: <ProtectedRoute allowedRoles={['USER']}><UserDashboard /></ProtectedRoute>
        },
        {
          path: '/author-dashboard',
          element: <ProtectedRoute allowedRoles={['AUTHOR']}><AuthorDashboard /></ProtectedRoute>
        },
        {
          path: '/add-article',
          element: <ProtectedRoute allowedRoles={['AUTHOR']}><AddArticle /></ProtectedRoute>
        },
        {
          path: '/edit-article',
          element: <ProtectedRoute allowedRoles={['AUTHOR']}><EditArticle /></ProtectedRoute>
        },
        {
          path: '/admin-dashboard',
          element: <ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>
        },
        {
          path: '/article-card',
          element: <ProtectedRoute allowedRoles={['USER', 'AUTHOR', 'ADMIN']}><ArticleCard /></ProtectedRoute>
        },
        {
          path: '/user-profile',
          element: <ProtectedRoute allowedRoles={['USER', 'AUTHOR', 'ADMIN']}><UserProfile /></ProtectedRoute>
        },
        {
          path: '/change-password',
          element: <ProtectedRoute allowedRoles={['USER', 'AUTHOR', 'ADMIN']}><ChangePassword /></ProtectedRoute>
        },
      ]
    }
  ])

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  )
}

export default App
