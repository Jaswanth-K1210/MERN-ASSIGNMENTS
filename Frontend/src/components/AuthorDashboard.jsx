import React from 'react'
import { useAuth } from '../store/useAuth'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import API_URL from '../api'

function AuthorDashboard() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        `${API_URL}/author-api/articles/${currentUser._id}`,
        { withCredentials: true }
      )
      setArticles(res.data.payload || [])
      setLoading(false)
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || 'Failed to fetch articles')
      setLoading(false)
    }
  }

  useEffect(() => {
    if (currentUser?._id) fetchArticles()
  }, [currentUser])

  const toggleStatus = async (articleId) => {
    try {
      const res = await axios.patch(
        `${API_URL}/author-api/articles/${articleId}`,
        {},
        { withCredentials: true }
      )
      toast.success(res.data.message)
      fetchArticles()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update article')
    }
  }

  if (loading) {
    return (
      <div className="bg-gray-200 flex-1 flex items-center justify-center p-6">
        <h1 className="text-3xl font-bold">Loading articles...</h1>
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
      <h1 className="text-4xl font-bold mb-2">Author Dashboard</h1>
      <p className="text-lg text-gray-700 mb-6">Welcome, {currentUser?.firstName}!</p>

      <button
        onClick={() => navigate('/add-article')}
        className="bg-sky-400 text-white text-lg font-bold px-6 py-3 rounded mb-6 hover:bg-sky-500 cursor-pointer"
      >
        + Write New Article
      </button>

      {articles.length === 0 ? (
        <p className="text-gray-500 text-lg">You haven't published any articles yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {articles.map((article) => (
            <div key={article._id} className="bg-white rounded-lg shadow-md p-6 relative">
              {/* Status Badge */}
              <span className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full ${article.isArticleActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {article.isArticleActive ? 'ACTIVE' : 'DELETED'}
              </span>

              <span className="text-xs font-semibold text-sky-600 uppercase tracking-wide">{article.category}</span>
              <h2 className="text-xl font-bold mb-2 mt-1 pr-16">{article.title}</h2>
              <p className="text-gray-700 mb-4 line-clamp-2">{article.content}</p>
              <p className="text-gray-500 text-sm mb-4">
                {new Date(article.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium' })}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate('/article-card', { state: { article } })}
                  className="bg-gray-200 text-gray-800 px-3 py-1.5 rounded text-sm hover:bg-gray-300 cursor-pointer"
                >
                  Read
                </button>
                <button
                  onClick={() => navigate('/edit-article', { state: { article } })}
                  className="bg-sky-400 text-white px-3 py-1.5 rounded text-sm hover:bg-sky-500 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleStatus(article._id)}
                  className={`px-3 py-1.5 rounded text-sm cursor-pointer ${article.isArticleActive ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
                >
                  {article.isArticleActive ? 'Delete' : 'Restore'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AuthorDashboard
