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
  const [version, setVersion] = useState(0) // Forcing re-render

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart()
        if (!cartData || !cartData.products) {
          throw new Error('Cart data is empty or malformed')
        }
        console.log('Fetched cart:', cartData)
        setCart(cartData)
        const initialQuantities = {}
        cartData.products.forEach((item) => {
          initialQuantities[item.product._id] = item.quantity
        })
        setQuantities(initialQuantities)
      } catch (error) {
        console.error('Error fetching cart:', error.message)
        toast.error('Failed to load cart. Please refresh.')
        setError('Cart is unavailable. Please refresh.')
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [version])

  const forceUpdate = () => setVersion((prev) => prev + 1)

  const handleQuantityChange = async (productId, event) => {
    event.preventDefault() // Prevent default behavior
    const newQuantity = Math.max(1, Number(event.target.value))

    try {
      const product = await getProduct(productId)
      if (newQuantity > product.stockQuantity) {
        toast.error(
          `Only ${product.stockQuantity} units of "${product.name}" are available.`
        )
        setQuantities((prev) => ({
          ...prev,
          [productId]: product.stockQuantity
        }))
        return
      }

      await updateCartItem(productId, newQuantity)
      setQuantities((prev) => ({
        ...prev,
        [productId]: newQuantity
      }))
      forceUpdate() // Ensure re-render
    } catch (error) {
      toast.error('Error updating quantity. Please try again.')
    }
  }

  const handleRemoveItem = async (productId) => {
    try {
      const updatedCart = await removeCartItem(productId)
      setCart(updatedCart)
      setQuantities((prev) => {
        const updatedQuantities = { ...prev }
        delete updatedQuantities[productId]
        forceUpdate()
        return updatedQuantities
      })
    } catch (error) {
      toast.error('Error removing cart item:', error.message)
    }
  }

  const handleCheckout = async () => {
    try {
      let needsUpdate = false

      for (const item of cart.products) {
        const product = await getProduct(item.product._id)
        const desiredQuantity = quantities[item.product._id]

        if (desiredQuantity > product.stockQuantity) {
          needsUpdate = true
          toast.error(
            `Adjusted "${item.product.name}" quantity to ${product.stockQuantity} due to stock limitations.`
          )
          setQuantities((prev) => ({
            ...prev,
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

      await placeOrder()
      toast.success('Order placed successfully!')
      setCart({ products: [] })
      setQuantities({})
    } catch (error) {
      toast.error('Failed to place the order. Please try again.')
      setError('Checkout failed. Please try again.')
    }
  }

  if (loading) return <p>Loading cart...</p>

  if (!cart || cart.products.length === 0) {
    return <p>Your cart is empty!</p>
  }

  const calculateTotalPrice = () => {
    return cart.products.reduce((total, item) => {
      const quantity = quantities[item.product._id] || 1
      return total + item.product.price * quantity
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
                $
                {(
                  item.product.price * (quantities[item.product._id] || 1)
                ).toFixed(2)}
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
