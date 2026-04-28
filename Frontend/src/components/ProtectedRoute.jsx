import React from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../store/useAuth'

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, currentUser, loading } = useAuth()

  if (loading) {
    return (
      <div className="bg-gray-200 flex-1 flex items-center justify-center p-6">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
    return (
      <div className="bg-gray-200 flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Unauthorized</h1>
        <p className="text-lg text-gray-700">You do not have permission to access this page.</p>
      </div>
    )
  }

  return children
}

export default ProtectedRoute
