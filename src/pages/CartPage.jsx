import React, { useState, useEffect } from 'react'
import {
  getCart,
  updateCartItem,
  removeCartItem
} from '../services/CartServices'
import { placeOrder } from '../services/OrderServices'

const CartPage = () => {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart()
        setCart(cartData)
      } catch (error) {
        console.error('Error fetching cart:', error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [])

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return

    try {
      const updatedCart = await updateCartItem(productId, newQuantity)
      setCart(updatedCart)
    } catch (error) {
      console.error('Error updating cart item:', error.message)
    }
  }

  const handleRemoveItem = async (productId) => {
    try {
      const updatedCart = await removeCartItem(productId)
      setCart(updatedCart)
    } catch (error) {
      console.error('Error removing cart item:', error.message)
    }
  }

  const handleCheckout = async () => {
    try {
      const response = await placeOrder()
      setCart(null)
    } catch (error) {
      console.error('Error placing order:', error.message)
      setError('Failed to place the order. Please try again.')
    }
  }

  if (loading) return <p>Loading cart...</p>

  if (!cart || cart.products.length === 0) {
    return <p>Your cart is empty!</p>
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}{' '}
      <table>
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
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.product._id,
                      parseInt(e.target.value)
                    )
                  }
                />
              </td>
              <td>${item.price}</td>
              <td>
                <button onClick={() => handleRemoveItem(item.product._id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Total: ${cart.totalPrice}</h2>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  )
}

export default CartPage
