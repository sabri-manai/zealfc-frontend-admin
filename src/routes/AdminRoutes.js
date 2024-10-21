import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../screens/AdminDashboard/AdminDashboard'; // Main admin dashboard component
import CreateGame from '../screens/CreateGame/CreateGame'; // Import the CreateGame component
import AdminLoginRoutes from './AdminLoginRoutes'; // Routes related to login and authentication
import ManageStadium from '../screens/ManageStadium/ManageStadium';

function AdminRoutes({ isAuthenticated, onLogin }) {
  return (
    <Routes>
      {/* Main dashboard route */}
      {isAuthenticated && (
        <>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/create-game" element={<CreateGame />} /> {/* New route for CreateGame */}
          <Route path="/manage-stadium" element={<ManageStadium />} />

        </>
      )}

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
