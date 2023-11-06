import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

// Import your components
import About from './Pages/About';
import Pricing from './components/Landing/Pricing';
import Login from './components/Landing/Login';
import SignUp from './components/Landing/SignUp';
import Landing from './Pages/Landing';
import Map from './components/Landing/Map';
import CreateOrder from './Pages/CreateOrder';
import Orders from './Pages/Orders';

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
      <Link to="/signup" className="nav-link">SignUp</Link>
      


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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/map" element={<Map />} />
        <Route path="/CreateOrder" element={<CreateOrder />} />
        <Route path="/Orders" element={<Orders />} />
      </Routes>
    </div>
  </Router>
);

export default App;
