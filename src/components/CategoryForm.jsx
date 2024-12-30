import { useState } from 'react'
import { createCategory } from '../services/CategoryServices'

const CategoryForm = () => {
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: ''
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
}

export default CategoryForm
