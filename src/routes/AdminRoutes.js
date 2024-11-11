import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../screens/AdminDashboard/AdminDashboard';
import CreateGame from '../screens/CreateGame/CreateGame';
import AdminLoginRoutes from './AdminLoginRoutes';
import ManageStadium from '../screens/ManageStadium/ManageStadium';
import ManageGame from '../components/ManageGame/ManageGame';

function AdminRoutes({ isAuthenticated, onLogin }) {
  return (
    <Routes>
      {isAuthenticated && (
        <>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/create-game" element={<CreateGame />} />
          <Route path="/manage-stadium" element={<ManageStadium />} />
          <Route path="/manage-game/:gameId" element={<ManageGame />} />

        </>
      )}
      {!isAuthenticated && <Route path="/*" element={<AdminLoginRoutes onLogin={onLogin} />} />}
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default AdminRoutes;
