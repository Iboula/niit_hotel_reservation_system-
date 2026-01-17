import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  // Debug: log user data
  React.useEffect(() => {
    if (user) {
      console.log('Current user:', user);
      console.log('isAdmin:', isAdmin);
      console.log('Role:', user.role);
    }
  }, [user, isAdmin]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.username || 'User';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🏨 Hotel Reservation
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/rooms">Rooms</Link></li>
          {isAuthenticated ? (
            <>
              {!isAdmin && <li><Link to="/reservations">My Reservations</Link></li>}
              {isAdmin && <li><Link to="/admin">Dashboard</Link></li>}
              <li>
                <span className="user-info">Welcome, {getDisplayName()}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
