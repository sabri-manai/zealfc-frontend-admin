// src/components/UpcomingGames/UpcomingGames.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpcomingGames.css';

const UpcomingGames = () => {
  const [gamesByDate, setGamesByDate] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcomingGames = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/games/upcoming`);
        const games = response.data;

        // Group games by date
        const groupedGames = games.reduce((acc, game) => {
          const date = new Date(game.date).toLocaleDateString('en-GB', {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
          });

          if (!acc[date]) acc[date] = [];
          acc[date].push(game);
          return acc;
        }, {});

        setGamesByDate(groupedGames);
      } catch (error) {
        console.error('Error fetching upcoming games:', error);
        setError('Failed to fetch upcoming games.');
      }
    };

    fetchUpcomingGames();
  }, []);

  return (
    <div className="upcoming-games-container">
      {error && <p className="error-message">{error}</p>}
      {Object.keys(gamesByDate).map((date) => (
        <div key={date} className="day-section">
          <h3 className="date-header">{date}</h3>
          <div className="games-row">
            {gamesByDate[date].map((game) => (
              <div key={game._id} className="game-card">
                <img src={game.stadiumImage} alt={game.stadium} className="game-image" />
                <div className="game-info">
                  <h4 className="game-stadium">{game.stadium}</h4>
                  <p className="game-level">{game.level}</p>
                  <p className="game-time">{new Date(game.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingGames;
