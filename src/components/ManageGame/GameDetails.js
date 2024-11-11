// src/components/ManageGame/GameDetails.js
import React from 'react';
import './GameDetails.css';
import DefaultImage from '../../assets/images/turia.png';

const GameDetails = ({ game, onStart }) => {
  return (
    <div className="game-details-container">
      {/* <img src={game.stadium.image} alt="Stadium" className="game-details-image" /> */}
      <img src={DefaultImage} alt="Stadium" className="game-details-image" />

      <h1>{game.stadium.name}</h1>
      <p>{new Date(game.date).toLocaleString()}</p>
      <button onClick={onStart}>Start</button>
    </div>
  );
};

export default GameDetails;
