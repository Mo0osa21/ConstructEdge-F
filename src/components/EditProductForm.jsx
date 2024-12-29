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
    try {
      await updateProduct(productId, productData)
      alert('Product updated successfully!')
      navigate('/products') 
    } catch (err) {
      console.error('Error updating product:', err)
      setError('Failed to update product. Please try again.')
    }
  }

  if (error) {
    return <p className="error-message">{error}</p>
  }
}
