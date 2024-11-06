// src/components/GameCreation/StadiumSelection.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedStadium } from '../../store/slices/stadiumSelectionSlice';
import { nextPhase } from '../../store/slices/gamePhaseSlice';
import './StadiumSelection.css';
import { GameCard } from '../GameCard/GameCard';

const StadiumSelection = ({ stadiums }) => {
  const dispatch = useDispatch();

  const handleSelectStadium = (stadium) => {
    dispatch(setSelectedStadium(stadium));
    dispatch(nextPhase()); // Move to the next phase after selecting a stadium
  };

  return (
    <div className="stadium-selection-container">
      <h2 className="stadium-selection-title">CHOOSE A STADIUM</h2>
      <div className="stadium-list">
        {stadiums.map((stadium) => (
          <div
            key={stadium.id}
            className="stadium-card-wrapper"
            onClick={() => handleSelectStadium(stadium)}
          >
            <GameCard
              imageSrc={stadium.image}
              gameName="CARMEN"
              gameSubtitle={stadium.address}
              gameId={stadium.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StadiumSelection;
