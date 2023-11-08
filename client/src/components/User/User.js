import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Delivery from './Delivery';
import Profile from './Profile';
import Cart from './Cart';
import PlacedOrder from './PlacedOrder';

export default function User() {
  return (
    <div className=''>
      <Routes>
        <Route path="/user/home" element={<Home />} />
        <Route path="/user/delivery" element={<Delivery />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/cart" element={<Cart />} />
        <Route path="/user/order" element={<PlacedOrder />} />
      </Routes>
    </div>
  );
}
