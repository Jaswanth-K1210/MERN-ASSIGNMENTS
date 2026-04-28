import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../store/useAuth.js'
import { toast } from 'react-hot-toast'

function Login() {
  const { login } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  let onSubmit = async (data) => {
    setLoading(true)
    setError(null)
    try {
      await login(data)
      const { isAuthenticated, currentUser, error: storeError } = useAuth.getState()
      if (isAuthenticated && currentUser) {
        toast.success('Login successful!')
        if (currentUser.role === 'USER') {
          navigate('/user-dashboard')
        } else if (currentUser.role === 'AUTHOR') {
          navigate('/author-dashboard')
        } else if (currentUser.role === 'ADMIN') {
          navigate('/admin-dashboard')
        }
      } else {
        setError(storeError || 'Login failed. Please try again.')
        toast.error(storeError || 'Login failed. Please try again.')
      }
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || 'An error occurred during login')
      toast.error(err.response?.data?.message || 'An error occurred during login')
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="bg-gray-200 flex-1 flex items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-6">Logging in...</h1>
      </div>
    )
  }

  return (
    <div className="bg-gray-200 flex-1 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      {error && <p className="text-red-500 text-lg mb-4">{error}</p>}
      <div className="w-full max-w-lg p-8">
        <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit(onSubmit)}>

          {/* Select Role */}
          <div className="flex items-center gap-4 mb-2">
            <span className="text-xl font-semibold">Select Role</span>
            <label className="flex items-center gap-1 text-lg">
              <input type="radio" value="USER" {...register('role', { required: 'Role is required' })} defaultChecked className="accent-sky-400 w-5 h-5" />
              User
            </label>
            <label className="flex items-center gap-1 text-lg">
              <input type="radio" value="AUTHOR" {...register('role', { required: 'Role is required' })} className="accent-sky-400 w-5 h-5" />
              Author
            </label>
            <label className="flex items-center gap-1 text-lg">
              <input type="radio" value="ADMIN" {...register('role', { required: 'Role is required' })} className="accent-sky-400 w-5 h-5" />
              Admin
            </label>
          </div>
          {errors.role && <p className="text-red-500 text-sm -mt-4">{errors.role.message}</p>}

          {/* Email */}
          <div className="w-full flex flex-col">
            <input type="email" placeholder="Email" {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })} className="bg-gray-300 p-3 text-center text-lg font-semibold placeholder-gray-600 w-full" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="w-full flex flex-col">
            <input type="password" placeholder="Password" {...register('password', { required: 'Password is required', minLength: { value: 4, message: 'Password must be at least 4 characters' } })} className="bg-gray-300 p-3 text-center text-lg font-semibold placeholder-gray-600 w-full" />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Forgot Password Link */}
          <div className="w-full text-center">
            <a href="/change-password" className="text-sky-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <button type="submit" className="bg-sky-400 text-white text-xl font-bold px-8 py-3 rounded mt-2 hover:bg-sky-500 cursor-pointer">Login</button>

          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-sky-500 hover:underline">Register</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
