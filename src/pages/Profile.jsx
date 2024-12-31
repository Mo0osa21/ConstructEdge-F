import { useState } from 'react'
import { RegisterUser } from '../services/Auth' // Update this import to reflect your existing Auth.js functions

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
      // Assuming Auth.js has a function to register/update user
      const updatedUser = await RegisterUser({
        name: formValues.username, // Replace with the correct property name from your backend
        password: formValues.password
      })
      setUser(updatedUser) // Update the user in state
      setMessage('Profile updated successfully!')
    } catch (err) {
      console.error('Error updating profile:', err.message)
      setMessage('Failed to update profile. Please try again.')
    }
  }

  if (!user) {
    return <p>Loading user data...</p>
  }

  return (
    <div className="profile-page">
      <h1>Update Profile</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default Profile
