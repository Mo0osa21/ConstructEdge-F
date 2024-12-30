import { useState, useEffect } from 'react'
import { createProduct } from '../services/ProductServices'
import { getCategories } from '../services/CategoryServices'

const AdminProductForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stockQuantity: '',
    discount: ''
  })

  const [categories, setCategories] = useState([]) // To store categories

  // Fetch categories when the component loads
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesFromDB = await getCategories()
        setCategories(categoriesFromDB)
      } catch (error) {
        console.error('Error fetching categories:', error)
        alert('Failed to load categories. Please try again.')
      }
    }

    fetchCategories()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData({ ...productData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createProduct(productData)
      alert('Product added successfully!')
      setProductData({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: '',
        stockQuantity: '',
        discount: ''
      })
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Failed to add product. Please try again.')
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add New Product</h2>
      <div className="form-group">
        <label className="form-label">Name:</label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Description:</label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          className="form-textarea"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Price:</label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={productData.imageUrl}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Category:</label>
        <select
          name="category"
          value={productData.category}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Stock Quantity:</label>
        <input
          type="number"
          name="stockQuantity"
          value={productData.stockQuantity}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Discount:</label>
        <input
          type="number"
          name="discount"
          value={productData.discount}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <button type="submit" className="form-submit-button">
        Add Product
      </button>
    </form>
  )
}

export default AdminProductForm
