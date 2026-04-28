import React from 'react'
import { useAuth } from '../store/useAuth'
import { useNavigate } from 'react-router'

function Home() {
  const { isAuthenticated, currentUser } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="bg-gray-200 flex-1 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold mb-4">Welcome to Blog Platform</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
        Discover articles on Technology, Programming, AI, Web Development and more. Share your thoughts and engage with the community.
      </p>

      {!isAuthenticated ? (
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-sky-400 text-white text-lg font-bold px-8 py-3 rounded hover:bg-sky-500 cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-gray-800 text-white text-lg font-bold px-8 py-3 rounded hover:bg-gray-900 cursor-pointer"
          >
            Register
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            if (currentUser?.role === 'USER') navigate('/user-dashboard')
            else if (currentUser?.role === 'AUTHOR') navigate('/author-dashboard')
            else if (currentUser?.role === 'ADMIN') navigate('/admin-dashboard')
          }}
          className="bg-sky-400 text-white text-lg font-bold px-8 py-3 rounded hover:bg-sky-500 cursor-pointer"
        >
          Go to Dashboard
        </button>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        {['Technology', 'Programming', 'AI', 'Web Development'].map((cat) => (
          <div key={cat} className="bg-white rounded-lg shadow-md px-6 py-4 text-center">
            <p className="text-sm font-semibold text-gray-700">{cat}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
