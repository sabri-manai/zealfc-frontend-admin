import React from 'react';
import './GameDetails.css';
import DefaultImage from '../../assets/images/turia.png';
import Button from '../../components/Button/Button';

const GameDetails = ({ game, onStart }) => {
  return (
    <div className="game-details-layout">
      <div className="game-details-image-container">
        <img src={game.stadium?.image || DefaultImage} alt="Stadium" className="game-details-image" />
      </div>
      <div className="game-details-content">
        <h2 className="game-details-time">
          {game.time}
        </h2>
        <p className="game-details-date">
          {game.date
            ? new Date(game.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })
            : 'No Date Selected'}
        </p>
        <h1 className="game-details-stadium-name">{game.stadium?.name || 'Unknown Stadium'}</h1>
        <p className="game-details-level">{game.type}</p>
        <p className="game-details-address">
          {game.stadium?.address || 'Unknown Address'}
          <br />
          {game.stadium?.capacity || 'Unknown'} players
        </p>
        <p className="game-details-team-size">
          Duration: {game.duration}min
        </p>
        <div className="game-details-buttons">
          <Button text="Start" onClick={onStart} />
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
