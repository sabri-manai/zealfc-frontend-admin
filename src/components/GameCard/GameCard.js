// src/components/GameCard/GameCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./GameCard.css";
import CreateGameImageTwo from '../../assets/images/turia.png';

export const GameCard = ({ imageSrc, gameName, gameSubtitle, gameDay, gameId, className }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (gameId) navigate(`/games/${gameId}`);
  };

  const formatGameDay = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date";
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const timeFormatted = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `${dayOfWeek}, ${timeFormatted}`;
  };

  return (
    <div className={`game-card-container ${className}`} onClick={handleClick}>
      <div className="game-card">
        <div className="image-wrapper">
          <img 
            src={imageSrc || CreateGameImageTwo} 
            alt={`${gameName || 'Unknown Game'} Background`} 
            className="card-image" 
          />
          <div className="overlay-gradient"></div>
          <div className="overlay-content">
            <div className="game-name">{gameName || 'Unknown Game'}</div>
            <div className="game-subtitle">{gameSubtitle || 'Unknown Type'}</div>
          </div>
        </div>
      </div>
      <div className="game-day">{formatGameDay(gameDay)}</div>
    </div>
  );
};
