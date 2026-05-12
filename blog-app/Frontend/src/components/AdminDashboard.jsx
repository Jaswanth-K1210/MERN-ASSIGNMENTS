import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import API_URL from '../api'

function AdminDashboard() {
  const [articles, setArticles] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('articles')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [articlesRes, usersRes] = await Promise.all([
        axios.get('${API_URL}/admin-api/articles', { withCredentials: true }),
        axios.get('${API_URL}/admin-api/users', { withCredentials: true })
      ])
      setArticles(articlesRes.data.articles || [])
      setUsers(usersRes.data.users || [])
      setLoading(false)
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || 'Failed to fetch data')
      setLoading(false)
    }
  }

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      await axios.put(
        `${API_URL}/admin-api/users/${userId}`,
        { isActive: !currentStatus },
        { withCredentials: true }
      )
      toast.success(`User ${!currentStatus ? 'activated' : 'blocked'} successfully!`)
      fetchData()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update user status')
    }
  }

  if (loading) {
    return (
      <div className="bg-gray-200 flex-1 flex items-center justify-center p-6">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-200 flex-1 flex items-center justify-center p-6">
        <h1 className="text-3xl font-bold text-red-500">{error}</h1>
      </div>
    )
  }

  return (
    <div className="bg-gray-200 flex-1 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('articles')}
          className={`px-6 py-2 rounded font-semibold cursor-pointer ${activeTab === 'articles' ? 'bg-sky-400 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          Articles ({articles.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-2 rounded font-semibold cursor-pointer ${activeTab === 'users' ? 'bg-sky-400 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          Users ({users.length})
        </button>
      </div>

      {/* Articles Tab */}
      {activeTab === 'articles' && (
        <div className="w-full max-w-6xl">
          {articles.length === 0 ? (
            <p className="text-gray-500 text-lg text-center">No articles found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div key={article._id} className="bg-white rounded-lg shadow-md p-6 relative">
                  <span className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full ${article.isArticleActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {article.isArticleActive ? 'ACTIVE' : 'DELETED'}
                  </span>
                  <span className="text-xs font-semibold text-sky-600 uppercase tracking-wide">{article.category}</span>
                  <h2 className="text-xl font-bold mb-2 mt-1 pr-16">{article.title}</h2>
                  <p className="text-gray-700 mb-2 line-clamp-2">{article.content}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(article.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium' })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="w-full max-w-4xl">
          {users.length === 0 ? (
            <p className="text-gray-500 text-lg text-center">No users found.</p>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{user.firstName} {user.lastName}</td>
                      <td className="px-6 py-4 text-sm">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-sky-100 text-sky-700">{user.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {user.isActive ? 'ACTIVE' : 'BLOCKED'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleUserStatus(user._id, user.isActive)}
                          className={`px-3 py-1.5 rounded text-sm cursor-pointer text-white ${user.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                        >
                          {user.isActive ? 'Block' : 'Unblock'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
