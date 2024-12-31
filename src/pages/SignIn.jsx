import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SignIn = ({ setUser }) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = await SignInUser(formValues)
      setFormValues({ email: '', password: '' })
      setUser(payload)

      navigate('/products')
      toast.success('You siggned in successfully')
    } catch (error) {
      console.error('Sign-in failed:', error)
      toast.error('Sign-in failed:', error)
    }
  }

  return (
    <div className="login-form">
      <ToastContainer />
      <h1 className="form-title">Sign In</h1>
      <form onSubmit={handleSubmit}>
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
        <button
          className="form-submit-button"
          type="submit"
          disabled={!formValues.email || !formValues.password}
        >
          SignIn
        </button>
      </form>
    </div>
  )
}

export default SignIn
