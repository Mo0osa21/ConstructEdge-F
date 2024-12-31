import { useState } from 'react'
import { createCategory } from '../services/CategoryServices'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CategoryForm = () => {
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: ''
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setCategoryData({ ...categoryData, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createCategory(categoryData)
      toast.success('Category added successfully!')
      setError(null)
      setCategoryData({ name: '', description: '' })
    } catch (err) {
      console.error('Error creating category:', err)
      toast.error('Failed to add category. Please try again.')
      setSuccess(null)
    }
  }

  return (
    <div>
      <ToastContainer />
      <h1>Add Category</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category Name:</label>
          <input
            type="text"
            name="name"
            value={categoryData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={categoryData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit">Add Category</button>
      </form>
    </div>
  )
}

export default CategoryForm
