// src/components/GameCard/GameCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./GameCard.css";
import DefaultImage from '../../assets/images/turia.png';

export const GameCard = ({ 
  imageSrc, 
  name, 
  subtitle, 
  dayOrDate, 
  timeOrCapacity, 
  id, 
  isGame = false, 
  className 
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (id) navigate(isGame ? `/games/${id}` : `/stadiums/${id}`);
  };

  const formatGameDayOrDate = (dayOrDate, timeOrCapacity) => {
    if (!dayOrDate) return isGame ? "Date not available" : "Capacity not specified";
    
    if (isGame) {
      const formattedDate = new Date(dayOrDate).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
      const formattedTime = timeOrCapacity ? new Date(`1970-01-01T${timeOrCapacity}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';
      return `${formattedDate}${formattedTime ? `, ${formattedTime}` : ''}`;
    } else {
      return `${dayOrDate} - Capacity: ${timeOrCapacity || "N/A"}`;
    }
  };

  return (
    <div className={`game-card-container ${className}`} onClick={handleClick}>
      <div className="game-card">
        <div className="image-wrapper">
          <img 
            src={imageSrc || DefaultImage} 
            alt={`${name || 'Unknown'} Background`} 
            className="card-image" 
          />
          <div className="overlay-gradient"></div>
          <div className="overlay-content">
            <div className="game-name">{name || (isGame ? 'Unknown Game' : 'Unknown Stadium')}</div>
            <div className="game-subtitle">{subtitle || 'Details unavailable'}</div>
          </div>
        </div>
      </div>
      <div className="game-day">{formatGameDayOrDate(dayOrDate, timeOrCapacity)}</div>
    </div>
  );
};

export default GameCard;
