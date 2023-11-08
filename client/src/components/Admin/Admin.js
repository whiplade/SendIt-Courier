import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Modal from './Modal';

export default function Admin() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit" element={<Modal />} />
      </Routes>
    </div>
  );
}
