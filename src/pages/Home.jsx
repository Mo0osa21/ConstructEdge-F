import { useNavigate } from 'react-router-dom'
import Offers from './Offers'


const Home = ({ user }) => {
  const navigate = useNavigate();


  return (
    <div className="home-container">
      {user ? (
        <section className="welcome-user">
          <h2>Welcome To Construction Edge</h2>
          <p>Explore our products That they are on Offer</p>
          <div className="offers-container">
            <Offers user={user} />
          </div>
          
        </section>
      ) : (
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
      )}

    </div>
  );
};

export default Home
