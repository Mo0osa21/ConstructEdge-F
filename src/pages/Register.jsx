import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (formValues.password !== formValues.confirmPassword) {
        alert('Passwords do not match!')
        return
      }
      await RegisterUser({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password
      })
      setFormValues({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      navigate('/signin')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className="register-form">
      <h1 className="form-title">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Username
          </label>
          <input
            className="form-input"
            type="text"
            name="name"
            id="name"
            placeholder="Enter your username"
            value={formValues.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-input"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-input"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="form-input"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Re-enter your password"
            value={formValues.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="form-submit-button"
          type="submit"
          disabled={
            !formValues.name ||
            !formValues.email ||
            !formValues.password ||
            formValues.password !== formValues.confirmPassword
          }
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
