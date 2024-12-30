import { useEffect, useState } from 'react'
import { getProducts, deleteProduct } from '../services/ProductServices'
import { addToCart } from '../services/CartServices' 
import { useNavigate } from 'react-router-dom'//
import { Link } from 'react-router-dom'
const Offers=(user)=>{
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  // State for managing quantities
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  const [quantities, setQuantities] = useState({})

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data.filter((product) => product.discount > 0))
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to fetch products.')
      }
    }
    fetchProducts()
  }, [])

  const handleAddToCart = async (productId, quantity, price) => {
    try {
      const products = [
        {
          product: productId,
          quantity,
          price
        }
      ]
      await addToCart(products)
      alert('Product added to cart')
    } catch (err) {
      console.error('Error adding product to cart:', err)
      setError('Failed to add product to cart. Please try again.')
    }
  }

  const handleQuantityChange = (productId, event) => {
    const newQuantity = Math.max(
      1,
      Math.min(
        event.target.value,
        products.find((product) => product._id === productId).stockQuantity
      )
    )
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity
    }))
  }
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    )
    if (confirmDelete) {
      try {
        await deleteProduct(productId)
        alert('Product deleted successfully!')
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        )
      } catch (err) {
        console.error('Error details:', err.response?.data || err.message)
        setError('Failed to delete product. Please try again.')
      }
    }
  }

  return (
    <div className="offers-page">
      {error && <p className="error-message">{error}</p>}
      {products.length > 0 ? (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />
              </Link>
              <h2 className="product-name">{product.name}</h2>

              <p className="product-price">
                Price with discount: ${product.price * (product.discount / 100)}
              </p>
              <p className="product-discount">Discount: {product.discount}%</p>

              <div className="quantity-container">
                <label htmlFor={`quantity-${product._id}`}>Quantity:</label>
                <input
                  type="number"
                  id={`quantity-${product._id}`}
                  name="quantity"
                  min="1"
                  max={product.stockQuantity}
                  value={quantities[product._id] || 1}
                  onChange={(e) => handleQuantityChange(product._id, e)}
                  className="quantity-input"
                />
              </div>

              <button
                onClick={() =>
                  handleAddToCart(
                    product._id,
                    quantities[product._id] || 1,
                    product.price
                  )
                }
                className="action-button add-to-cart"
              >
                Add to Cart
              </button>

              <button
                onClick={() => navigate(`/edit-product/${product._id}`)}
                className="action-button edit-button"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleDelete(product._id)}
                aria-label={`Delete ${product.name}`}
              >
                Delete Product
              </button>
            </div>
          ))}
        </div>

      ) : (
        <p className="empty-state-message">No products available</p>
      )}
    </div>
  )
}

export default Offers
