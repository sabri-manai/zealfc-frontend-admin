// src/components/UpcomingGames/UpcomingGames.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpcomingGames.css';
import GameCard from '../GameCard/GameCard'; // Import the GameCard component
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UpcomingGames = () => {
  const [gamesByDate, setGamesByDate] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

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
              <div
                key={game._id}
                className="game-card-wrapper"
                onClick={() => navigate(`/manage-game/${game._id}`)}
              >
                <GameCard
                  imageSrc={game.stadium?.image}
                  name={game.stadium?.name}
                  subtitle={game.type}
                  dayOrDate={new Date(game.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                  timeOrCapacity={game.time}
                  id={game._id}
                  isGame={true}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingGames;
