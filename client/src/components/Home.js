import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
    <div className='Navcomponent'>
      <img src='https://cdn-icons-png.flaticon.com/128/75/75784.png?uid=R122397876&track=ais' alt='alt' className='nav-icon' />
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
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/signup" className="nav-link">
            SignUp
          </Link>
          <Link to="/createorder" className="nav-link">
            CreateOrder
          </Link>
          <Link to="/orders" className="nav-link">
            Orders
          </Link>
        </div>
      </div>
    </div>
  );

export default NavBar;
