import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ isLoggedIn }) {

    function logout(e) {
      e.preventDefault();
      fetch("http://127.0.0.1:5555/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', 
      }).then((response) => {
        if (response.ok) {
          
          window.location.href = '/'; 
        } else {
          console.error('Logout failed');
        }
      }).catch((error) => {
        console.error('Error during logout:', error);
      });
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
          
            <Link to="/createorder" className="nav-link">
              Create Orders
            </Link>
            <Link to="/orders" className="nav-link">
              All Orders
            </Link>
            <button onClick={logout} className="nav-link">
                Logout
              </button>
            {isLoggedIn ? (
              <>
              
              <Link to="/createorders" className="nav-link">
                Create Orders
              </Link>
              <Link to="/allorders" className="nav-link">
                All Orders
              </Link>
              </> 
            ) : (
              <>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
