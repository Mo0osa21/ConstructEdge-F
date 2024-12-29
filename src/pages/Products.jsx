import { useEffect, useState } from 'react'
import { getProducts } from '../services/ProductServices'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to fetch products.')
      }
    }

    fetchProducts()
  }, [])

}

export default ProductsPage