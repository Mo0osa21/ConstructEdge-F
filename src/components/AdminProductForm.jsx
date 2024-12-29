import { useState } from 'react'
import { createProduct } from '../services/ProductServices'

const AdminProductForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stockQuantity: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData({...productData,[name]: value,})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      })
    } catch (error) {
      console.error('Error adding product:', error)
      alert('fail add product. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={productData.imageUrl}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={productData.category}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Stock Quantity:</label>
        <input
          type="number"
          name="stockQuantity"
          value={productData.stockQuantity}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>discount:</label>
        <input
          type="number"
          name="discount"
          value={productData.discount}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Add Product</button>

      </form>
  )


}
export default AdminProductForm