import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

const Header = () => {
  const { currentUser, signOut } = useAuth();

  return (
    <header className="App-header">
      <h1>Notesy</h1>
      <nav>
        {currentUser ? (
          <div className="user-nav">
            <span>{currentUser.username}</span>
            <button onClick={signOut} className="btn-logout">Sign Out</button>
          </div>
        ) : (
          <div className="auth-nav">
            <Link to="/signin" className="nav-link">Sign In</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;