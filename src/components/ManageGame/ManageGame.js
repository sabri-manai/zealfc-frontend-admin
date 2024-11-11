// src/components/ManageGame/ManageGame.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GameDetails from './GameDetails';
import PlayerList from './PlayerList';
import GameStats from './GameStats';
import './ManageGame.css';

const ManageGame = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/games/${gameId}`);
        setGame(response.data);
      } catch (error) {
        console.error('Error fetching game:', error);
      }
    };
    fetchGame();
  }, [gameId]);

  if (!game) return <div>Loading...</div>;

  const handleStart = () => {
    setPhase((prevPhase) => prevPhase + 1);
  };

  const handleFinish = () => {
    // Implement finish logic here
    alert('Game has been finished!');
    // Redirect or update UI as needed
  };

  return (
    <div className="manage-game-container">
      {phase === 1 && (
        <>
          <GameDetails game={game} onStart={handleStart} />
          <PlayerList teams={game.teams} phase={phase} />
        </>
      )}
      {phase === 2 && (
        <>
          <PlayerList teams={game.teams} phase={phase} onStart={handleStart} />
        </>
      )}
      {phase === 3 && (
        <GameStats
          teams={game.teams}
          duration={game.duration}
          gameId={game._id}
          onFinish={handleFinish}
        />
      )}
    </div>
  );
};

export default ManageGame;
