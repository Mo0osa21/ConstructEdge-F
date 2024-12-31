import Client from './api'

export const getProductsByCategory = async (categoryId) => {
  try {
    console.log(`Fetching products for: ${categoryId}`)
    const response = await Client.get(`/products/?category=${categoryId}`)
    console.log('Products by category:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching products by category:', error)
    throw error
  }
}

export const getProducts = async () => {
  try {
    console.log('Fetching all products')
    const response = await Client.get('/products')
    console.log('All products fetched:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
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

export const createProduct = async (productData) => {
  try {
    const response = await Client.post('/products', productData)
    return response.data
  } catch (error) {
    console.error(
      'Error creating product:',
      error.response?.data || error.message
    )
    throw error
  }
}

export const updateProduct = async (productId, updatedData) => {
  console.log(productId)
  console.log(updatedData)

  try {
    const response = await Client.put(`/products/${productId}`, updatedData)
    console.log('Backend Update Response:', response.data)
    return response.data
  } catch (error) {
    console.error(
      'Error updating product:',
      error.response?.data || error.message
    )
    throw error
  }
}

export const deleteProduct = async (productId) => {
  try {
    const response = await Client.delete(`/products/${productId}`)
    return response.data
  } catch (error) {
    console.error(
      'Error deleting product:',
      error.response?.data || error.message
    )
    throw error
  }
}
