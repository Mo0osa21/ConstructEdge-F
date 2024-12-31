import { Link } from 'react-router-dom'
const Nav = ({ user, handleLogOut }) => {
  let userOptions
  if (user?.isAdmin) {
    userOptions = (
      <nav className="nav">
        <h3>Welcome {user.email} to Construct Edge!</h3>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="Offers" className="nav-link">
          Offers
        </Link>
        <Link to="/products" className="nav-link">
          Products
        </Link>
        <Link to="/admin" className="nav-link">
          Add New Product
        </Link>
        <Link onClick={handleLogOut} to="/" className="nav-link">
          Sign Out
        </Link>
      </nav>
    )
  }else if(user){
    userOptions = (
      <nav >
        <h3>Welcome {user.email} to Construct Edge!</h3>

        
        <Link to="/">
        Home 
        </Link>
   
        <Link to="Offers">Offers</Link>

        <Link to="/products">products</Link>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
       
      </nav>
    )
  }
  const publicOptions = (
    <nav className="nav">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/register" className="nav-link">
        Register
      </Link>
      <Link to="/signin" className="nav-link">
        Sign In
      </Link>
    </nav>
  )
  return (
    <header className="header">
      <Link to="/">
        <div className="logo-wrapper" alt="logo">
          {/* Add logo here if you have one */}
        </div>
      </Link>
      {user ? userOptions : publicOptions}
    </header>
  )
}
export default Nav
