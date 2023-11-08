import React from 'react'
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className='Navcomponent'>
     <img src='https://cdn-icons-png.flaticon.com/128/75/75784.png?uid=R122397876&track=ais' alt='alt' className='nav-icon' />
     <div className='headers'>
       <h1><Link to="/" className="header">SENDIT</Link></h1>
     </div>
     <div className='Nav'>
       <div className="NavBar">
         <Link to="/" className="nav-link">Home</Link>
         <Link to="/pricing" className="nav-link">Pricing</Link>
         <Link to="/login" className="nav-link">Login</Link>
         <Link to="/signin" className="nav-link">SignUp</Link>
       </div>
     </div>
    </div>
  )
}


