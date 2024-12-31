import { useEffect, useState } from 'react'
import { getProducts, deleteProduct } from '../services/ProductServices'
import { addToCart } from '../services/CartServices'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductsPage = ({ user }) => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [quantities, setQuantities] = useState({})

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (err) {
        console.error('Error fetching products:', err)
        toast.error('Failed to fetch products.')
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
    <div className="products-grid">
      <ToastContainer />
      {error && <p className="error-message">{error}</p>}
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="product-card">
            <Link to={`/product/${product._id}`}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
            </Link>
            <h2>{product.name}</h2>

            <p>Price: ${product.price}</p>

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

            {!user?.isAdmin && (
              <>
                <button
                  onClick={() => navigate(`/edit-product/${product._id}`)}
                  className="action-button edit-button"
                  aria-label={`Edit details for ${product.name}`}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(product._id)}
                  style={{ backgroundColor: 'red', color: 'white' }}
                >
                  Delete Product
                </button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  )
}

export default ProductsPage
