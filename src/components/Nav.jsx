import { Link } from 'react-router-dom'
const Nav = ({ user, handleLogOut }) => {
  let userOptions
  if (user?.isAdmin) {
    userOptions = (
      <nav className="nav">
        <h3 className="nav-welcome">Welcome {user.name} to Construct Edge!</h3>
        <Link to="/products" className="nav-link">
          Products
        </Link>
        <Link to="Offers" className="nav-link">
          Offers
        </Link>

        <Link to="/admin" className="nav-link">
          Add New Product
        </Link>
        <Link to="/categories" className="nav-link">
          Add New Category
        </Link>
        <Link to="/orders" className="nav-link">
          Manage Orders
        </Link>

        <Link onClick={handleLogOut} to="/" className="nav-link">
          Sign Out
        </Link>
      </nav>
    )
  } else if (user) {
    userOptions = (
      <nav>
        <h3 className="nav-welcome">Welcome {user.name} to Construct Edge!</h3>
        <Link to="/products" className="nav-link">
          products
        </Link>
        <Link to="Offers" className="nav-link">
          Offers
        </Link>
        <Link to="/cart" className="nav-link">
          cart
        </Link>
        <Link to="/userorders" className="nav-link">
          orders
        </Link>

        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </nav>
    )
  }
  const publicOptions = (
    <nav className="nav">
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
