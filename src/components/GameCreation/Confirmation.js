// src/components/GameCreation/Confirmation.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { previousPhase } from '../../store/slices/gamePhaseSlice';
import './Confirmation.css';
import Button from '../../components/Button/Button';
import CreateGameImageTwo from '../../assets/images/turia.png';

const Confirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Use navigate to redirect
  const gameData = useSelector((state) => ({
    stadium: state.stadiumSelection.selectedStadium,
    date: state.dateSelection.selectedDate,
    slot: state.slotSelection.selectedSlot,
    level: state.levelSelection.selectedLevel,
  }));

  const calculateDuration = (startTime, endTime) => {
    // Convert start and end times to Date objects to calculate duration in minutes
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const duration = (end - start) / (1000 * 60); // Convert milliseconds to minutes
    return duration > 0 ? duration : 0;
  };

  const handleConfirm = async () => {
    // Calculate duration based on selected slot times
    const duration = calculateDuration(gameData.slot.startTime, gameData.slot.endTime);

    const dataToSubmit = {
      teams: [Array(5).fill(null), Array(5).fill(null)], // Assuming each team has 5 slots to start with
      stadium: gameData.stadium._id,
      host: gameData.stadium.hosts[0], // Assuming the first host in the stadium's hosts list
      date: gameData.date,
      duration: duration, // Set dynamic duration
      type: gameData.level,
      result: null,
    };

    // Retrieve auth token
    const idToken = localStorage.getItem('idToken');
    if (!idToken) {
      alert("You must be logged in to create a game.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/games/create`,
        dataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      navigate("/dashboard");
      alert("Game Created Successfully!");
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
