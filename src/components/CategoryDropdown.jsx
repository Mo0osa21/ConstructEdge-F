import { useEffect, useState } from 'react'
import { getCategories } from '../services/CategoryServices'

const CategoryDropdown = ({ selectedCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getCategories()
        setCategories(categoryData)
      } catch (err) {
        console.error('Error fetching categories:', err)
        setError('Failed to load categories.')
      }
    }

    fetchCategories()
  }, [])

  return (
    <div>
      <label htmlFor="category-select">Filter by Category:</label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CategoryDropdown
