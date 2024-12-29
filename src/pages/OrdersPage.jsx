import React, { useState, useEffect } from 'react'
import { getAllOrders, updateOrderStatus } from '../services/OrderServices'

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getAllOrders()
        setOrders(ordersData)
      } catch (error) {
        console.error('Error fetching orders:', error.message)
        setError('Failed to fetch orders. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus)
      console.log('Updated Order:', updatedOrder)
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      )
    } catch (error) {
      console.error(
        'Error updating order status:',
        error.response?.data || error.message
      )
    }
  }

  if (loading) return <p>Loading orders...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div className="orders-page">
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Products</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user?.name || 'Guest'}</td>
              <td>
                {order.products.map((item) => (
                  <div key={item.product._id}>
                    {item.product.name} x {item.quantity}
                  </div>
                ))}
              </td>
              <td>${order.totalPrice}</td>
              <td>{order.status}</td>
              {
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersPage