import { useEffect, useState } from 'react'
import CategoryDropdown from '../components/CategoryDropdown'
import { getProductsByCategory } from '../services/ProductServices'
import { getProducts, deleteProduct } from '../services/ProductServices'
import { addToCart } from '../services/CartServices'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductsPage = ({ user }) => {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [quantities, setQuantities] = useState({})

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let data
        if (selectedCategory) {
          console.log(`Fetching products for category: ${selectedCategory}`)
          data = await getProductsByCategory(selectedCategory)
        } else {
          console.log('Fetching all products')
          data = await getProducts()
        }
        console.log('Fetched products:', data)
        setProducts(data)
      } catch (err) {
        console.error('Error fetching products:', err)
        toast.error('Failed to fetch products.')
      }
    }

    fetchProducts()
  }, [selectedCategory])

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
    <div>
      <ToastContainer />
      <div className="browse-products-header">
        <h1>Browse Products</h1>
      </div>

      <CategoryDropdown
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="products-grid">
        {error && <p className="error-message">{error}</p>}
        {products && products.length > 0 ? (
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

              {product.stockQuantity === 0 ? (
                <p className="out-of-stock">Out of Stock</p>
              ) : (
                <div className="quantity-container">
                  <label htmlFor={`quantity-${product._id}`}>Quantity:</label>
                  <input
                    type="number"
                    id={`quantity-${product._id}`}
                    name="quantity"
                    min="1"
                    max={product.stockQuantity}
                    value={quantities[product._id] || 1} // Controlled input
                    onChange={(e) => handleQuantityChange(product._id, e)} // Update quantity
                    className="quantity-input"
                  />
                </div>
              )}

              {product.stockQuantity > 0 && (
                <button
                  onClick={() => {
                    const quantityInput = document.getElementById(
                      `quantity-${product._id}`
                    )
                    const quantity = parseInt(quantityInput.value, 10)

                    if (!quantity || quantity <= 0) {
                      alert('Please enter a valid quantity.')
                      return
                    }

                    handleAddToCart(product._id, quantity, product.price) // Pass the product's price
                  }}
                  className="action-button add-to-cart"
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to Cart
                </button>
              )}

              <button
                onClick={() => navigate(`/edit-product/${product._id}`)}
                className="action-button edit-button"
                aria-label={`Edit details for ${product.name}`}
              >
                Edit
              </button>

              <button type="button" onClick={() => handleDelete(product._id)}>
                Delete Product
              </button>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
