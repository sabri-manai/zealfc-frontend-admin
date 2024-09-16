import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateGame.css';
import Button from "../../components/Button/Button"; // Assuming Button component is correctly imported

function CreateGame() {
  const [stadiums, setStadiums] = useState([]); // State to store available stadiums
  const [selectedStadium, setSelectedStadium] = useState(''); // Selected stadium
  const [host, setHost] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [type, setType] = useState('Friendly'); // Initial value with the correct casing
  const [maxPlayersPerTeam, setMaxPlayersPerTeam] = useState(''); // State for max players per team

  // Fetch stadiums from the backend
  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        // Mocked stadium data for testing purposes
        const response = [
          {
            id: "1",
            name: "Stadium A",
            location: "City X"
          },
          {
            id: "2",
            name: "Stadium B",
            location: "City Y"
          }
        ];        
        setStadiums(response); // Set mock data directly
      } catch (error) {
        console.error('Error fetching stadiums:', error);
      }
    };
    fetchStadiums();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Parse the maxPlayersPerTeam as an integer
    const maxPlayers = parseInt(maxPlayersPerTeam, 10);
  
    // Validate maxPlayersPerTeam
    if (isNaN(maxPlayers) || maxPlayers <= 0) {
      alert('Please enter a valid number for Max Players per Team.');
      return;
    }
  
    const gameData = {
      stadium: selectedStadium, // Send selected stadium object
      host,
      result: null, // Initially null
      date,
      duration: parseInt(duration, 10),
      type,
      maxPlayersPerTeam: maxPlayers, // Include max players per team
      teams: [Array(maxPlayers).fill(null), Array(maxPlayers).fill(null)], // Initialize two teams
    };
    
  
    try {
      // API endpoint for creating games
      await axios.post(`${process.env.REACT_APP_API_URL}/games/create`, gameData);
      alert('Game created successfully!');
      
      // Reset form
      setSelectedStadium('');
      setHost('');
      setDate('');
      setDuration('');
      setType('');
      setMaxPlayersPerTeam('');
    } catch (error) {
      console.error('Error creating game:', error);
      alert('Error creating game');
    }
  };
  

  return (
    <div className="create-game-container">
      <div className="create-game-box">
        <h2>Create New Game</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Stadium:</label>
            <select
              value={selectedStadium}
              onChange={(e) => setSelectedStadium(e.target.value)}
            >
              <option value="">Select Stadium</option>
              {stadiums.map((stadium) => (
                <option key={stadium.id} value={stadium.id}>
                  {stadium.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Host:</label>
            <input
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Date:</label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Duration (minutes):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Friendly">Friendly</option>
              <option value="Tournament">Tournament</option>
            </select>
          </div>

          <div className="form-group">
            <label>Max Players per Team:</label>
            <input
              type="number"
              value={maxPlayersPerTeam}
              onChange={(e) => setMaxPlayersPerTeam(e.target.value)}
            />
          </div>

          {/* Use Button component instead of default button */}
          <Button text="Create" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
}

export default CreateGame;
