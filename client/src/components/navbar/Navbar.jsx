import { useContext } from "react";
import "./navbar.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to='/' style={{color: "inherit", textDecoration: "none"}}>
        <span className="logo">Jayabooking</span>
        </Link>
        {user ? (
          <span>{user.username}</span>
        ) : (
          <div className="navItems">
            {/* Add Link for Register */}
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>
            {/* Add Link for Login */}
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
        
      </div>
    </div>
  )
}

export default Navbar