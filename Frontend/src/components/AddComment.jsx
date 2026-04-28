import React from 'react'
import { Navigate } from 'react-router'

function AddComment() {
  // comments are handled inline on the ArticleCard page
  return <Navigate to="/user-dashboard" />
}

export default AddComment
