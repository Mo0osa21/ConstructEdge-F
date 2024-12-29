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
}
