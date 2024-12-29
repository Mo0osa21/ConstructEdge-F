import { useEffect, useState } from 'react'
import { getProducts } from '../services/ProductServices'
import { useNavigate } from 'react-router-dom'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to fetch products.')
      }
    }

    fetchProducts()
  }, [])

  return (
    
    <div className="products-grid">
      {error && <p className="error-message">{error}</p>}
      {products.length > 0 ? (
        products.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock Quantity: {product.stockQuantity}</p>
            <p>Category: {product.category?.name || 'No Category'}</p> 
            <button>Add to Cart</button>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  )
  
}

export default ProductsPage