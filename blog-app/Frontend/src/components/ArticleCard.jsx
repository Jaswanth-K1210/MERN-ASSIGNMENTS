import React from 'react'
import { useAuth } from '../store/useAuth'
import { useNavigate, useLocation } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import API_URL from '../api'

function ArticleCard() {
  const { state } = useLocation()
  const article = state?.article
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState(article?.comments || [])
  const [submitting, setSubmitting] = useState(false)

  if (!article) {
    return (
      <div className="bg-gray-200 flex-1 flex items-center justify-center p-6">
        <h1 className="text-2xl font-bold text-red-500">Article not found.</h1>
      </div>
    )
  }

  const isAuthor = currentUser?.role === 'AUTHOR' && currentUser?._id === article.author?._id
  const isUser = currentUser?.role === 'USER'

  const handleComment = async (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    setSubmitting(true)
    try {
      const res = await axios.put(
        `${API_URL}/user-api/comment/articleid/${article._id}`,
        { comment: commentText },
        { withCredentials: true }
      )
      setComments(res.data.payload.comments)
      setCommentText('')
      toast.success('Comment added!')
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || 'Failed to add comment')
    }
    setSubmitting(false)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this article?')) return
    try {
      await axios.patch(
        `${API_URL}/author-api/articles/${article._id}`,
        {},
        { withCredentials: true }
      )
      toast.success('Article deleted!')
      navigate('/author-dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete article')
    }
  }

  return (
    <div className="bg-gray-200 flex-1 flex flex-col items-center p-6">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl">
        <span className="text-xs font-semibold text-sky-600 uppercase tracking-wide">{article.category}</span>
        <h1 className="text-4xl font-bold mb-4 mt-2">{article.title}</h1>
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-6 border-y border-gray-200 py-3">
          <span>By {article.author?.firstName}</span>
          <span>·</span>
          <span>{new Date(article.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium' })}</span>
          <span>·</span>
          <span>{new Date(article.createdAt).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', timeStyle: 'short' })}</span>
        </div>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">{article.content}</p>

        {isAuthor && (
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => navigate('/edit-article', { state: { article } })}
              className="bg-sky-400 text-white px-4 py-2 rounded hover:bg-sky-500 cursor-pointer"
            >
              Edit Article
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
            >
              Delete Article
            </button>
          </div>
        )}

        {/* Comments Section */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-2xl font-bold mb-4">Comments ({comments.length})</h3>

          {comments.length === 0 ? (
            <p className="text-gray-500 mb-4">No comments yet.</p>
          ) : (
            <div className="space-y-3 mb-6">
              {comments.map((c, idx) => (
                <div key={idx} className="bg-gray-100 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-800 uppercase">
                    {c.user?.firstName || c.user?.email || 'User'}
                  </p>
                  <p className="text-gray-700 mt-1">{c.comment}</p>
                </div>
              ))}
            </div>
          )}

          {isUser && (
            <form className="space-y-3" onSubmit={handleComment}>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                placeholder="Write your comment here..."
                rows="3"
              ></textarea>
              <button
                type="submit"
                disabled={submitting}
                className="bg-sky-400 text-white px-6 py-2 rounded hover:bg-sky-500 cursor-pointer disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Add Comment'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
