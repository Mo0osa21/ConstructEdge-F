import { useState } from 'react'
import { createCategory } from '../services/CategoryServices'

const CategoryForm = () => {
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: ''
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  }
}

export default CategoryForm
