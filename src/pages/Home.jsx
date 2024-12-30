import { useNavigate } from 'react-router-dom'
import Offers from './Offers'
import Products from "./Products"
const Home = ({ user }) => {
  const navigate = useNavigate();

  const lowStockProducts = Products.filter((product) => product.stockQuantity < 50);
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
        <section className="welcome-signin">
          <button onClick={() => navigate('/signin')}>
            Click Here To Start
          </button>
        </section>
      )}
    </div>
  );
};

export default Home
