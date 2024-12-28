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
