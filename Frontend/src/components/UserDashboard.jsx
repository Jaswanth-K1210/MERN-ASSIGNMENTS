import React from 'react'
import { useAuth } from '../store/useAuth'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import API_URL from '../api'

function UserDashboard() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  let [articles, setArticles] = useState([])
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState(null)

  const gotoarticle = (articleObj) => {
    navigate('/article-card', { state: { article: articleObj } })
  }

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${API_URL}/user-api/articles`, { withCredentials: true })
        setArticles(res.data.payload || [])
        setLoading(false)
      } catch (err) {
        console.log(err)
        setError(err.response?.data?.message || 'An error occurred while fetching articles')
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  if (loading) {
    return (
      <div className="bg-gray-200 flex-1 flex items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-6">Loading articles...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-200 flex-1 flex items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-6 text-red-500">{error}</h1>
      </div>
    )
  }

  return (
    <div className="bg-gray-200 flex-1 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>
      <p className="text-lg text-gray-700 mb-6">Welcome, {currentUser?.firstName}!</p>
      {articles.length === 0 ? (
        <p className="text-gray-500 text-lg">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {articles.map((article) => (
            <div key={article._id} onClick={() => gotoarticle(article)} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <span className="text-xs font-semibold text-sky-600 uppercase tracking-wide">{article.category}</span>
              <h2 className="text-2xl font-bold mb-2 mt-1">{article.title}</h2>
              <p className="text-gray-700 mb-4 line-clamp-3">{article.content}</p>
              <p className="text-gray-500 text-sm">
                By {article.author?.firstName} · {new Date(article.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserDashboard
