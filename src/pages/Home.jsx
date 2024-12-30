import { useNavigate } from 'react-router-dom'


const Home = ({user}) => {
  let navigate = useNavigate()

  return (
    <div className="home-container col">
    {user ? ( // Check if user is logged in
        <section className="welcome-user">
          {/* Content for logged-in users */}
          <h2>Welcome, {user.name}!</h2> {/* Display user's name */}
          <p>Explore our products and services.</p>
          {/* Add other content for logged-in users here */}
        </section>
      ) : ( // Content for non-logged-in users
        <section className="welcome-signin">
          <button onClick={() => navigate('/signin')}>
            Click Here To Start
          </button>
        </section>
      )}
    </div>
  )
}

export default Home
