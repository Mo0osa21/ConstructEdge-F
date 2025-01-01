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
        const initialQuantities = {}
        cartData.products.forEach((item) => {
          initialQuantities[item.product._id] = item.quantity
        })
        setQuantities(initialQuantities)
      } catch (error) {
        console.error('Error fetching cart:', error.message)
        toast.error('Failed to load cart. Please try again.')
        setError('Failed to load cart. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [])

  const handleQuantityChange = async (productId, event) => {
    const newQuantity = Math.max(1, event.target.value)

    try {
      const product = await getProduct(productId)
      if (newQuantity > product.stockQuantity) {
        toast.error(
          `Only ${product.stockQuantity} units of "${product.name}" are available.`
        )
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [productId]: product.stockQuantity
        }))
        return
      }

      await updateCartItem(productId, newQuantity)
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: newQuantity
      }))
    } catch (error) {
      toast.error('Error updating cart item quantity:', error.message)
    }
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
      let needsUpdate = false

      // Validate cart items against real-time stock
      for (const item of cart.products) {
        const product = await getProduct(item.product._id)
        const desiredQuantity = quantities[item.product._id]

        if (desiredQuantity > product.stockQuantity) {
          needsUpdate = true
          toast.error(
            `Adjusted "${item.product.name}" quantity to ${product.stockQuantity} due to stock limitations.`
          )
          setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [item.product._id]: product.stockQuantity
          }))
          await updateCartItem(item.product._id, product.stockQuantity)
        }
      }

      if (needsUpdate) {
        toast.info(
          'Your cart has been updated to match current stock. Please review and checkout again.'
        )
        return
      }

      // Proceed with order placement if no updates are needed
      await placeOrder()
      toast.success('Order placed successfully!')
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

  const calculateTotalPrice = () => {
    return cart.products.reduce((total, item) => {
      return total + item.product.price * quantities[item.product._id]
    }, 0)
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
                  value={quantities[item.product._id] || 1}
                  onChange={(e) => handleQuantityChange(item.product._id, e)}
                  className="quantity-input"
                />
              </td>
              <td>
                ${item.product.price * (quantities[item.product._id] || 1)}
              </td>
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
        <h2>Total: ${calculateTotalPrice().toFixed(2)}</h2>
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  )
}

export default CartPage
