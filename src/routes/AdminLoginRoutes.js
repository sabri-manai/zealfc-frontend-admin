import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../screens/AdminLogin/AdminLogin'; 
import Register from '../screens/Register/Register';
import ConfirmAccount from '../screens/AdminLogin/ConfirmAccount'; // Add this import

function AdminLoginRoutes({ onLogin }) {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin onLogin={onLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/confirm" element={<ConfirmAccount onLogin={onLogin} />} /> {/* Add confirmation route */}
      <Route path="*" element={<AdminLogin onLogin={onLogin} />} />
    </Routes>
  );
}

export default AdminLoginRoutes;
