// src/components/GameCreation/Confirmation.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { previousPhase, resetPhase } from '../../store/slices/gamePhaseSlice';
import { resetSelectedStadium } from '../../store/slices/stadiumSelectionSlice';
import { resetSelectedDate } from '../../store/slices/dateSelectionSlice';
import { resetSelectedSlot } from '../../store/slices/slotSelectionSlice';
import { resetSelectedLevel } from '../../store/slices/levelSelectionSlice';
import { resetSelectedHost } from '../../store/slices/hostSelectionSlice'; // Import resetSelectedHost
import './Confirmation.css';
import Button from '../../components/Button/Button';
import CreateGameImageTwo from '../../assets/images/turia.png';

const Confirmation = ({ gameData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedHost = useSelector((state) => state.hostSelection.selectedHost);

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const duration = (end - start) / (1000 * 60);
    return duration > 0 ? duration : 0;
  };

  const handleConfirm = async () => {
    const duration = calculateDuration(gameData.slot.startTime, gameData.slot.endTime);

    if (!selectedHost) {
      alert('No host selected.');
      return;
    }

    const dataToSubmit = {
      stadiumId: gameData.stadium._id,
      hostId: selectedHost._id,
      date: gameData.date,
      time: gameData.slot.startTime,
      duration: duration,
      type: gameData.level,
    };

    const idToken = localStorage.getItem('idToken');
    if (!idToken) {
      alert("You must be logged in to create a game.");
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/games/create`,
        dataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert("Game Created Successfully!");

      // Reset the states here
      dispatch(resetSelectedStadium());
      dispatch(resetSelectedDate());
      dispatch(resetSelectedSlot());
      dispatch(resetSelectedLevel());
      dispatch(resetSelectedHost()); // Reset selected host
      dispatch(resetPhase());

      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating game:", error);
      if (error.response && error.response.data) {
        alert(`Failed to create game: ${error.response.data.error || "Unknown error"}`);
      } else {
        alert("Failed to create game. Please try again.");
      }
    }
  };

  return (
    <div className="confirmation-layout">
      <div className="confirmation-image-container">
        <img
          src={gameData.stadium?.image || CreateGameImageTwo}
          alt="Stadium"
          className="confirmation-image"
        />
      </div>
      <div className="confirmation-content">
        <h2>
          {gameData.slot
            ? `${gameData.slot.startTime} - ${gameData.slot.endTime}`
            : 'No Time Selected'}
        </h2>
        <p>
          {gameData.date
            ? new Date(gameData.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })
            : 'No Date Selected'}
        </p>
        <h1>{gameData.stadium?.name || 'Unknown Stadium'}</h1>
        <p>{gameData.level || 'No Level Selected'}</p>
        <p>
          Host: {selectedHost ? `${selectedHost.first_name} ${selectedHost.last_name}` : 'No Host Selected'}
        </p>
        <p>
          {gameData.stadium?.address || 'Unknown Address'}
          <br />
          Capacity: {gameData.stadium?.capacity || 'Unknown'}
        </p>
        <p>
          Team Size:{' '}
          {gameData.stadium ? Math.floor(gameData.stadium.capacity / 2) : 'Unknown'}
        </p>
        <div className="confirmation-buttons">
          <Button text="Go Back" onClick={() => dispatch(previousPhase())} />
          <Button text="Confirm" onClick={handleConfirm} />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
