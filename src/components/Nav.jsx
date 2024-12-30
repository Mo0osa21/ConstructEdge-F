import { Link } from 'react-router-dom'


const Nav = ({ user, handleLogOut}) => {

  let userOptions
  if (user?.isAdmin) {
    userOptions = (
      <nav >
        <h3>Welcome {user.email} to Construct Edge!</h3>

        
        <Link to="/">
        Home 
        </Link>
   
        <Link to="Offers">Offers</Link>

        <Link to="/products">products</Link>
        <Link to="/admin">add new product</Link>

        <Link onClick={handleLogOut} to="/">
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
    <nav>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/signin">Sign In</Link>
      
    </nav>
  )

  return (
    <header>
      <Link to="/">
        <div className="logo-wrapper" alt="logo">
          
        </div>
      </Link>
      {user ? userOptions : publicOptions}
    </header>
  )
}

export default Nav
