import { useState } from 'react'
import { createProduct } from '../services/ProductServices'

const AdminProductForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stockQuantity: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData({...productData,[name]: value,})
  }

  
}