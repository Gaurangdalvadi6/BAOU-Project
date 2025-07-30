import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🚗 CarRental
        </Link>
        
        <div className="nav-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/cars" className="nav-link">
            Cars
          </Link>
          
          {isAuthenticated ? (
            <>
              {isAdmin ? (
                <Link to="/admin" className="nav-link">
                  Admin Dashboard
                </Link>
              ) : (
                <Link to="/bookings" className="nav-link">
                  My Bookings
                </Link>
              )}
              <div className="nav-user">
                <span className="user-name">Welcome, {user?.name || user?.email}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;