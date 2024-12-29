import Client from './api'

export const addToCart = async (products) => {
  try {
    const response = await Client.post('/cart/add', { products })
    return response.data
  } catch (error) {
    console.error(
      'Error adding to cart:',
      error.response?.data || error.message
    )
    throw error
  }
}

export const getCart = async () => {
  try {
    const response = await Client.get('/cart')
    return response.data
  } catch (error) {
    console.error('Error fetching cart:', error.response?.data || error.message)
    throw error
  }
}

export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await Client.put('/cart', { productId, quantity })
    return response.data
  } catch (error) {
    console.error(
      'Error updating cart item:',
      error.response?.data || error.message
    )
    throw error
  }
}

export const removeCartItem = async (productId) => {
  try {
    const response = await Client.delete(`/cart/${productId}`)
    return response.data
  } catch (error) {
    console.error(
      'Error removing cart item:',
      error.response?.data || error.message
    )
    throw error
  }
}
