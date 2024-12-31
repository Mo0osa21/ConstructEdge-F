import { useNavigate } from 'react-router-dom'

const Home = ({ user }) => {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <section className="welcome-section">
        <h1>Welcome to ConstructionEdge</h1>
        <p>
          Your one-stop shop for construction materials, tools, and equipment.
          Browse our wide range of products, order online, and get fast
          delivery.
        </p>
        <button onClick={() => navigate('/signin')} className="start-button">
          Get Started
        </button>
      </section>
    </div>
  )
}

export default Home
