import { useState } from 'react'
import { updateUser } from '../services/UserServices'

const Profile = ({ user, setUser }) => {
  const [formValues, setFormValues] = useState({
    username: user?.username || '',
    password: '',
  })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  