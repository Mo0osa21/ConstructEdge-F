import Client from './api'

export const getAllOrders = async () => {
  try {
    const response = await Client.get('/orders')
    return response.data
  } catch (error) {
    console.error(
      'Error fetching all orders:',
      error.response?.data || error.message
    )
    throw error
  }
}
