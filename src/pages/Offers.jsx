import { useEffect, useState } from 'react'
import { getProducts } from '../services/ProductServices'
import { addToCart } from '../services/CartServices' //
const Offers=()=>{
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  // State for managing quantities
  const [quantities, setQuantities] = useState({})
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to fetch products.')
      }
    }
    fetchProducts()
  }, [])

  const handleAddToCart = async (productId, quantity, price) => {
    try {
      // Create the products array with the required structure
      const products = [
        {
          product: productId,
          quantity: quantity,
          price: price
        }
      ]
      // Call the addToCart API with the products array
      await addToCart(products)
      alert('Product added to cart')
    } catch (err) {
      console.error('Error adding product to cart:', err)
      alert('Failed to add product to cart')
    }
  }
  return(
    <h1>Here is our offers</h1>

    
  )
}
export default Offers