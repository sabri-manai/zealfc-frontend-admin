// src/components/GameCreation/Confirmation.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { previousPhase } from '../../store/slices/gamePhaseSlice';
import './Confirmation.css';
import Button from '../../components/Button/Button';
import CreateGameImageTwo from '../../assets/images/turia.png';

const Confirmation = () => {
  const dispatch = useDispatch();
  const gameData = useSelector((state) => ({
    stadium: state.stadiumSelection.selectedStadium,
    date: state.dateSelection.selectedDate,
    slot: state.slotSelection.selectedSlot,
    level: state.levelSelection.selectedLevel,
  }));

  const handleConfirm = () => {
    console.log("Game Data:", gameData);
    console.log("Game Data:");

    alert("Game Created!");
  };

  return (
    <div className="confirmation-layout">
      <div className="confirmation-image-container">
        <img src={gameData.stadium?.image || CreateGameImageTwo} alt="Stadium" className="confirmation-image" />
      </div>
      <div className="confirmation-content">
        <h2>{gameData.slot?.time || 'No Time Selected'}</h2>
        <p>{new Date(gameData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        <h1>{gameData.stadium?.name || 'Unknown Stadium'}</h1>
        <p>{gameData.level || 'No Level Selected'}</p>
        <p>{gameData.stadium?.address || 'Unknown Address'}<br />{gameData.stadium?.capacity || 'Capacity Unknown'}</p>

        <div className="confirmation-buttons">
          <Button text="Go Back" onClick={() => dispatch(previousPhase())} />
          <Button text="Confirm" onClick={handleConfirm} />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
