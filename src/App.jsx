import { useState } from 'react'
import { Route, Routes } from 'react-router'
import Nav from './components/Nav'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Home from './pages/Home'

import ProductsPage from './pages/Products'
import AdminPage from './pages/AdminPage'

import CartPage from './pages/CartPage'
import OrdersPage from './pages/OrdersPage'
import Offers from './pages/Offers'
import './App.css'
import { CheckSession } from './services/Auth'
import { useEffect } from 'react'
import UserOrders from './pages/UserOrders'
import EditProductPage from './pages/EditProductPage'

import ProductDetails from './pages/ProductDetails'
const App = () => {
  
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    // Check if token exists before requesting to validate the token
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
        <Route path="/" element={<Home user={user} />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          <Route path='/products' element={<ProductsPage/>}/>
          <Route path='/offers' element={<Offers/>}/>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/userorders" element={<UserOrders />} />

          <Route path="/edit-product/:productId" element={<EditProductPage />}/>

          <Route path="/product/:productId" element={<ProductDetails />} />

        </Routes>
      </main>
    </div>
  )
}

export default App
