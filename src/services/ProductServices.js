import Client from './api'

export const getProducts = async () => {
  try {
    const response = await Client.get('/products')
    return response.data
  } catch (error) {
    console.error(
      'Error fetching products:',
      error.response?.data || error.message
    )
    throw error
  }
}

export const getProduct = async (productId) => {
  try {
    const response = await Client.get(`/products/${productId}`)
    return response.data
  } catch (error) {
    console.error(
      'Error fetching product:',
      error.response?.data || error.message
    )
    throw error
  }
}
