import React, { useEffect, useState } from 'react'
import { getUserOrders } from '../services/OrderServices'

const UserOrders = () => {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getUserOrders()
        setOrders(orders)
      } catch (error) {
        console.error('Error fetching orders:', error.message)
        setError('Failed to fetch orders. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return (
    <div>
      <h1>My Orders</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {orders.length === 0 && !loading && !error && <p>No orders available</p>}
      {orders.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Products</th>
              <th>Status</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  {order.products.map((p) => (
                    <div key={p.product._id}>
                      {p.product.name} (x{p.quantity})
                    </div>
                  ))}
                </td>
                <td>{order.status}</td>
                <td>{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UserOrders
