import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../screens/AdminDashboard/AdminDashboard'; // Main admin dashboard component
import AdminLoginRoutes from './AdminLoginRoutes'; // Routes related to login and authentication

function AdminRoutes({ isAuthenticated, onLogin }) {
  return (
    <Routes>
      {/* Main dashboard route */}
      {isAuthenticated && <Route path="/dashboard" element={<AdminDashboard />} />}

      {/* Redirect unauthenticated users to login */}
      {!isAuthenticated && <Route path="/*" element={<AdminLoginRoutes onLogin={onLogin} />} />}

      {/* Redirect to dashboard if authenticated */}
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default AdminRoutes;
