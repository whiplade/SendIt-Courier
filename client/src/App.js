import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';


import Pricing from './components/Landing/Pricing';
import Login from './components/Landing/Login';
import SignUp from './components/Landing/SignUp';
import Landing from './components/Landing/Landing';
import User from './components/User/User';
import Admin from './components/Admin/Admin';



const App = () => (
  <Router>
      <div className="App">
        <Routes>
          <Route path="/user/*" element={<User />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/" element={<Landing />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignUp />} />
        </Routes>
        <User />
      </div>
    </Router>
);

export default App;

