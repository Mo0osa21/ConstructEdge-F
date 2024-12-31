import { useEffect, useState } from 'react'
import { getProducts, deleteProduct } from '../services/ProductServices'
import { addToCart } from '../services/CartServices'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Offers = (user) => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

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

  const handleAddToCart = async (productId, quantity, price, discount = 0) => {
    try {
      const products = [
        {
          product: productId,
          quantity: quantity,
          price: price,
          discount: discount
        }
      ]
      await addToCart(products)
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: 0
      }))
      toast.success('Product added to cart successfully!')
    } catch (err) {
      console.error('Error adding product to cart:', err)
      toast.error('Failed to add product. Please try again.')
    }
  }

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId)
      toast.success('Product deleted successfully!')
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      )
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message)
      toast.error('Failed to delete product. Please try again.')
    }
  }

  const handleQuantityChange = (productId, event) => {
    const newQuantity = Math.max(1, event.target.value)
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity
    }))
  }

  return (
    <div className="offers-page">
      <ToastContainer />
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
                Price with discount: $
                {(product.price * (1 - product.discount / 100)).toFixed(2)}
              </p>
              <p className="product-discount">Discount: {product.discount}%</p>

              {/* Check stock quantity */}
              {product.stockQuantity > 0 ? (
                <>
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
                        product.price,
                        product.discount
                      )
                    }
                    className="action-button add-to-cart"
                  >
                    Add to Cart
                  </button>
                </>
              ) : (
                <p className="out-of-stock">Out of Stock</p>
              )}

              <div>
                <button
                  onClick={() => navigate(`/edit-product/${product._id}`)}
                  className="action-button edit-button"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(product._id)}
                  className="action-button delete-button"
                >
                  Delete Product
                </button>
              </div>
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
