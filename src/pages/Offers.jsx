import { useEffect, useState } from 'react'
import { getProducts } from '../services/ProductServices'
import { addToCart } from '../services/CartServices' 
import { useNavigate } from 'react-router-dom'//
const Offers=(user)=>{
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  // State for managing quantities
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

  const handleAddToCart = async (productId, quantity, price) => {
    try {
      // Create the products array with the required structure
      const products = [
        {
          product: productId,
          quantity: quantity,
          price: price
        }
      ]
      // Call the addToCart API with the products array
      await addToCart(products)
      alert('Product added to cart')
    } catch (err) {
      console.error('Error adding product to cart:', err)
      alert('Failed to add product to cart')
    }
  }
   // Function to update the quantity for a product
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
  const handleDelete = async () => {
      const confirmDelete = window.confirm(
        'Are you sure you want to delete this product?'
      )
      if (confirmDelete) {
        try {
          await deleteProduct(productId)
          alert('Product deleted successfully!')
          navigate('/products')
        } catch (err) {
          console.error('Error deleting product:', err)
          setError('Failed to delete product. Please try again.')
        }
      }
    }
  return(
    <div className="products-grid">
   
      {error && <p className="error-message">{error}</p>}
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />
             <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock Quantity: {product.stockQuantity}</p>
            <p>Category: {product.category?.name || 'No Category'}</p>
            {/* Quantity Input */}
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
            <button
              onClick={() => {
                const quantity = parseInt(
                  document.getElementById(`quantity-${product._id}`).value,
                  10
                )
                handleAddToCart(product._id, quantity, product.price) // Pass the product's price
              }}
            >
              Add to Cart
            </button>
            {user?.isAdmin && (
              <>
                <button onClick={() => navigate(`/edit-product/${product._id}`)}>
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
    

export default Offers