import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProduct, updateProduct } from '../services/ProductServices'
import { deleteProduct } from '../services/ProductServices'
import { getCategories } from '../services/CategoryServices'

const EditProductForm = () => {
  const { productId } = useParams()
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stockQuantity: '',
    discount: ''
  })
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([]) // To store categories
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const product = await getProduct(productId)
        setProductData(product)
      } catch (err) {
        console.error('Error fetching product details:', err)
        setError('Failed to load product details.')
      }
    }
    const fetchCategories = async () => {
      try {
        const categoriesFromDB = await getCategories()
        setCategories(categoriesFromDB)
      } catch (error) {
        console.error('Error fetching categories:', error)
        alert('Failed to load categories. Please try again.')
      }
    }

    fetchProductDetails()
    fetchCategories()
  }, [productId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData({ ...productData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedData = {
      ...productData,
      price: productData.price,
      stockQuantity: (productData.stockQuantity, 10)
    }

    try {
      console.log('Submitting data to update:', updatedData)
      await updateProduct(productId, updatedData)
      alert('Product updated successfully!')
      navigate('/products')
    } catch (err) {
      console.error(
        'Error updating product:',
        err.response?.data || err.message
      )
      setError('Failed to update product. Please try again.')
    }
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    )
    if (confirmDelete) {
      try {
        await deleteProduct(productId)
        alert('Product deleted successfully!')
        navigate('/products')
      } catch (err) {
        console.error('Error deleting product:', err)
        setError('Failed to delete product. Please try again.')
      }
    }
  }

  if (error) {
    return <p className="error-message">{error}</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={productData.imageUrl}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          name="category"
          value={productData.category}
          onChange={handleChange}
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
      <div>
        <label>Stock Quantity:</label>
        <input
          type="number"
          name="stockQuantity"
          value={productData.stockQuantity}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Discount:</label>
        <input
          type="number"
          name="discount"
          value={productData.discount}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Update Product</button>
      <button
        type="button"
        onClick={handleDelete}
        style={{ backgroundColor: 'red', color: 'white' }}
      >
        Delete Product
      </button>
    </form>
  )
}

export default EditProductForm
