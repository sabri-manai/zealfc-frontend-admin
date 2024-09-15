import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const idToken = localStorage.getItem('idToken');
      const response = await axios.get('http://localhost:5000/admin/games', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      setGames(response.data);
    };

    fetchGames();
  }, []);

  return (
    <div>
      <h1>Manage Games</h1>
      {games.map(game => (
        <div key={game._id}>
          <p>{game.name}</p>
          {/* Add buttons for Edit and Delete */}
        </div>
      ))}
    </div>
  );
};

export default ManageGames;
