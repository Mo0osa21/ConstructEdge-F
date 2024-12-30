import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProduct } from '../services/ProductServices'

const ProductDetails = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productData = await getProduct(productId)
        setProduct(productData)
      } catch (err) {
        console.error('Error fetching product details:', err)
        setError('Failed to load product details.')
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetails()
  }, [productId])

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!product) return <p>Product not found.</p>

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Stock Quantity: {product.stockQuantity}</p>
      <p>Category: {product.category?.name || 'No Category'}</p>
      <button>Add to Cart</button>
    </div>
  )
}

export default ProductDetails
