import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes"; // Main admin route component
import Navbar from "./components/Navbar/Navbar"; // Admin navbar
import Footer from "./components/Footer/Footer";

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem("idToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle user login, store tokens in localStorage
  const handleLogin = (idToken, accessToken, refreshToken) => {
    localStorage.setItem("idToken", idToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setIsAuthenticated(true);
  };

  // Handle user logout, clear tokens from localStorage
  const handleLogout = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar receives isAuthenticated and handleLogout */}
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        
        {/* AdminRoutes receives isAuthenticated and handleLogin */}
        <AdminRoutes isAuthenticated={isAuthenticated} onLogin={handleLogin} />
        <Footer />  {/* Add Footer component */}

      </div>
    </Router>
  );
}

export default App;
