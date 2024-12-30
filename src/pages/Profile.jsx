import { useState } from 'react'
import { updateUser } from '../services/UserServices'

const Profile = ({ user, setUser }) => {
  const [formValues, setFormValues] = useState({
    username: user?.username || '',
    password: ''
  })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updateUser = await updateUser(user.id, formValues)
      setUser(updateUser)
      setMessage('Profile is updated!')
    } catch (err) {
      console.error('Error updating profile:', err.message)
      setMessage('Failed to update profile. Please try again.')
    }
  }
}
