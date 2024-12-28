import Client from './api'

export const addToCart = async (productId, quantity) => {
  try {
    const response = await Client.post('/cart/add', { productId, quantity })
    return response.data
  } catch (error) {
    console.error(
      'Error adding to cart:',
      error.response?.data || error.message
    )
    throw error
  }
}
