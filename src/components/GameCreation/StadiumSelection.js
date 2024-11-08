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
      <p className="stadium-selection-title">CHOOSE A STADIUM</p>
      <div className="stadium-list">
        {stadiums.map((stadium) => {
          const firstSlot = stadium.slots && stadium.slots[0];
          const dayOfWeek = firstSlot ? firstSlot.dayOfWeek : "Open Days Not Available";
          const capacity = stadium.capacity;

          return (
            <div
              key={stadium.name}
              className="stadium-card-wrapper"
              onClick={() => handleSelectStadium(stadium)}
            >
              <GameCard
                imageSrc={stadium.image}
                name={stadium.name}
                subtitle={stadium.address}
                dayOrDate={dayOfWeek}
                timeOrCapacity={capacity}
                id={stadium.id}
                isGame={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StadiumSelection;
