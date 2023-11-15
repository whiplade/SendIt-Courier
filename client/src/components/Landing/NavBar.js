import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ isLoggedIn, handleLogout }) {
  return (
    <div className='Navcomponent'>
      <img
        src='https://cdn-icons-png.flaticon.com/128/75/75784.png?uid=R122397876&track=ais'
        alt='alt'
        className='nav-icon'
      />
      <div className='headers'>
        <h1>
          <Link to="/" className="header">
            SENDIT
          </Link>
        </h1>
      </div>
      <div className='Nav'>
        <div className="NavBar">
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/pricing" className="nav-link">
            Pricing
          </Link>
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} className="nav-link">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
