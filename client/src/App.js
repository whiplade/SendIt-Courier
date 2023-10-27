import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

// Import your components
import About from './components/Landing/About';
import Pricing from './components/Landing/Pricing';
import Login from './components/Landing/Login';
import SignUp from './components/Landing/Signup';
import Landing from './components/Landing/Landing';
const NavBar = () => (
 <div className='Navcomponent'>
  <img src='https://cdn-icons-png.flaticon.com/128/75/75784.png?uid=R122397876&track=ais' alt='alt' className='nav-icon' />
  <div className='headers'>
    <h1><Link to="/" className="header">SENDIT</Link></h1>
  </div>
  <div className='Nav'>
    <div className="NavBar">
      <Link to="/about" className="nav-link">About</Link>
      <Link to="/pricing" className="nav-link">Pricing</Link>
      <Link to="/login" className="nav-link">Login</Link>
      <Link to="/signin" className="nav-link">SignUp</Link>
    </div>
  </div>
 </div>
);

const App = () => (
  <Router>
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignUp />} />
      </Routes>
    </div>
  </Router>
);

export default App;
