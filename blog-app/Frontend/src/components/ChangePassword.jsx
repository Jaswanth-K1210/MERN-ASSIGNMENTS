import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../store/useAuth'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import API_URL from '../api'

function ChangePassword() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('New password and confirm password do not match')
      return
    }
    setLoading(true)
    try {
      await axios.put(
        `${API_URL}/common-api/change-password`,
        {
          email: currentUser.email,
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        { withCredentials: true }
      )
      toast.success('Password changed successfully!')
      navigate('/user-profile')
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || 'Failed to change password')
    }
    setLoading(false)
  }

  return (
    <div className="bg-gray-200 flex-1 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Change Password</h1>
      <div className="w-full max-w-md p-8">
        <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit(onSubmit)}>

          {/* Current Password */}
          <div className="w-full flex flex-col">
            <input
              type="password"
              placeholder="Current Password"
              {...register('currentPassword', { required: 'Current password is required' })}
              className="bg-gray-300 p-3 text-center text-lg font-semibold placeholder-gray-600 w-full"
            />
            {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>}
          </div>

          {/* New Password */}
          <div className="w-full flex flex-col">
            <input
              type="password"
              placeholder="New Password"
              {...register('newPassword', { required: 'New password is required', minLength: { value: 4, message: 'Password must be at least 4 characters' } })}
              className="bg-gray-300 p-3 text-center text-lg font-semibold placeholder-gray-600 w-full"
            />
            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="w-full flex flex-col">
            <input
              type="password"
              placeholder="Confirm New Password"
              {...register('confirmPassword', { required: 'Please confirm your new password' })}
              className="bg-gray-300 p-3 text-center text-lg font-semibold placeholder-gray-600 w-full"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} className="bg-sky-400 text-white text-xl font-bold px-8 py-3 rounded mt-2 hover:bg-sky-500 cursor-pointer disabled:opacity-50">
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
