import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProduct, updateProduct } from '../services/ProductServices'

const EditProductForm = () => {
  const { productId } = useParams()
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stockQuantity: ''
  })
  const [error, setError] = useState(null)
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

    fetchProductDetails()
  }, [productId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData({ ...productData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    
    const updatedData = {
      ...productData,
      price: (productData.price),
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
        <input
          type="text"
          name="category"
          value={productData.category}
          onChange={handleChange}
          
        />
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
      <button type="submit">Update Product</button>
    </form>
  )
}

export default EditProductForm