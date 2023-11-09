import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ isLoggedIn, handleLogout }) {
  // If not logged in, do not render the NavBar
  if (!isLoggedIn) {
    return null;
  }

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
          <Link to="/createorders" className="nav-link">
            Create Orders
          </Link>
          <Link to="/allorders" className="nav-link">
            All Orders
          </Link>
          <button onClick={handleLogout} className="nav-link">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
