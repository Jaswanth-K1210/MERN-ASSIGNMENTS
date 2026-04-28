import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import API_URL from '../api'

function AddArticle() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  async function onSubmit(data) {
    setLoading(true)
    try {
      let res = await axios.post(
        '${API_URL}/author-api/articles',
        data,
        { withCredentials: true }
      )
      toast.success('Article published successfully!')
      navigate('/author-dashboard')
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.error || err.response?.data?.message || 'Failed to publish article')
    }
    setLoading(false)
  }

  return (
    <div className="bg-gray-200 flex-1 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Add Article</h1>
      <div className="w-full max-w-lg p-8">
        <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit(onSubmit)}>

          {/* Title */}
          <div className="w-full flex flex-col">
            <input type="text" placeholder="Title" {...register('title', { required: 'Title is required', minLength: { value: 5, message: 'Title must be at least 5 characters' } })} className="bg-gray-300 p-3 text-center text-lg font-semibold placeholder-gray-600 w-full" />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Category */}
          <div className="w-full flex flex-col">
            <select {...register('category', { required: 'Category is required' })} className="bg-gray-300 p-3 text-center text-lg font-semibold text-gray-600 w-full appearance-auto">
              <option value="">Category</option>
              <option value="Technology">Technology</option>
              <option value="Programming">Programming</option>
              <option value="AI">AI</option>
              <option value="Web Development">Web Development</option>
              <option value="Science">Science</option>
              <option value="Health">Health</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          {/* Content */}
          <div className="w-full flex flex-col">
            <textarea placeholder="Write your article content here..." rows="8" {...register('content', { required: 'Content is required', minLength: { value: 50, message: 'Content must be at least 50 characters' } })} className="bg-gray-300 p-3 text-lg font-semibold placeholder-gray-600 w-full resize-none"></textarea>
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} className="bg-sky-400 text-white text-xl font-bold px-8 py-3 rounded mt-2 hover:bg-sky-500 cursor-pointer disabled:opacity-50">
            {loading ? 'Publishing...' : 'Publish Article'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddArticle
