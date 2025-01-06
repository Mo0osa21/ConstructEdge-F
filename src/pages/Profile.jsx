import { useState } from 'react'
import { updateUser } from '../services/Auth'

const Profile = ({ userId, setUser, user }) => {
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
        await updateUser(userId, formValues)
      setUser(updateUser)
      setMessage('Profile is updated!')
    } catch (err) {
      console.error('Error updating profile:', err.message)
      setMessage('Failed to update profile. Please try again.')
    }
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

<label>password:</label>
          <input
            type="text"
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
