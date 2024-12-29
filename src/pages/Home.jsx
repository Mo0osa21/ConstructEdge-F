import { useNavigate } from 'react-router-dom'


const Home = () => {
  let navigate = useNavigate()

  return (
    <div className="home-container col">
      

      <section className="welcome-signin">
        <button onClick={() => navigate('/signin')}>
          Click Here To Start
        </button>
      </section>
    </div>
  )
}

export default Home
