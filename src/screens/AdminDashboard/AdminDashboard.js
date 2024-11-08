// src/screens/AdminDashboard/AdminDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import './AdminDashboard.css';
import CreateGameInit from "../../components/CreateGameInit/CreateGameInit";
import UpcomingGames from "../../components/UpcomingGames/UpcomingGames";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const idToken = localStorage.getItem("idToken");
      if (!idToken) {
        setError("No token found, please log in.");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/adminProfile/admin-profile`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <CreateGameInit userData={userData} />
      <UpcomingGames />
    </div>
  );
};

export default Dashboard;
