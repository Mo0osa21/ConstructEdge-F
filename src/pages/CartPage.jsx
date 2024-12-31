import React, { useState, useEffect } from 'react'
import {
  getCart,
  updateCartItem,
  removeCartItem
} from '../services/CartServices'
import { getProduct } from '../services/ProductServices'
import { placeOrder } from '../services/OrderServices'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CartPage = () => {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantities, setQuantities] = useState({})

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart()
        setCart(cartData)
      } catch (error) {
        console.error('Error fetching cart:', error.message)
        toast.error('Failed to load cart. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [])

  const handleQuantityChange = (productId, event) => {
    const newQuantity = Math.max(1, event.target.value)
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity
    }))
  }

  const handleRemoveItem = async (productId) => {
    try {
      const updatedCart = await removeCartItem(productId)
      setCart(updatedCart)
    } catch (error) {
      toast.error('Error removing cart item:', error.message)
    }
  }

  const handleCheckout = async () => {
    try {
      const response = await placeOrder()
      setCart(null)
    } catch (error) {
      toast.error('Error placing order:', error.message)
      setError('Failed to place the order. Please try again.')
    }
  }

  if (loading) return <p>Loading cart...</p>

  if (!cart || cart.products.length === 0) {
    return <p>Your cart is empty!</p>
  }

  return (
    <div className="cart-page">
      <ToastContainer />
      <h1>Your Cart</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.products.map((item) => (
            <tr key={item.product._id}>
              <td>{item.product.name}</td>
              <td>${item.product.price}</td>
              <td>
                <input
                  type="number"
                  id={`quantity-${item.product._id}`}
                  name="quantity"
                  min="1"
                  max={item.product.stockQuantity}
                  value={quantities[item.product._id] || 1} // Controlled input
                  onChange={(e) => handleQuantityChange(item.product._id, e)} // Update quantity
                  className="quantity-input"
                />
              </td>
              <td>${item.price}</td>
              <td>
                <button
                  className="remove-item-btn"
                  onClick={() => handleRemoveItem(item.product._id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-summary">
        <h2>Total: ${cart.totalPrice}</h2>
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  )
}

export default CartPage
