import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth(); //useContext(AuthContext);
  return (
    <nav className="navbar">
        <div className="navbar-container">
            <Link to="/" className="navbar-brand">Ecommerce</Link>
             <div className="navbar-links">
                <Link to="/" className='navbar-link'>Home</Link>
                <Link to="/checkout" className='navbar-link'>Cart</Link>
            </div>
            {!user ? (
                <div className="navbar-auth">
                <Link to="/auth" className="btn btn-secondary">Login</Link>
                <Link to="/auth" className="btn btn-primary">Sign Up</Link>
                </div>
            ) : (
                <div className="navbar-auth">
                    <span className="navbar-user">Welcome, {user.email}</span>
                    <button onClick={logout} className="btn btn-secondary">Logout</button>
                </div>
            )}
                   
        </div>
    </nav>
  )
}