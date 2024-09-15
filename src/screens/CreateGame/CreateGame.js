import React, { useState } from 'react';
import axios from 'axios';
import './CreateGame.css';

function CreateGame() {
  const [teams, setTeams] = useState(['', '']); // Two teams per game
  const [stadium, setStadium] = useState('');
  const [host, setHost] = useState('');
  const [result, setResult] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [type, setType] = useState('');

  const handleTeamChange = (index, value) => {
    const updatedTeams = [...teams];
    updatedTeams[index] = value;
    setTeams(updatedTeams);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const gameData = {
      teams,
      stadium,
      host,
      result,
      date,
      duration: parseInt(duration, 10),
      type,
    };

    try {
      // Replace the URL with your API endpoint for creating games
      await axios.post(`${process.env.REACT_APP_API_URL}/game/create`, gameData);
      alert('Game created successfully!');
      // Reset form
      setTeams(['', '']);
      setStadium('');
      setHost('');
      setResult('');
      setDate('');
      setDuration('');
      setType('');
    } catch (error) {
      console.error('Error creating game:', error);
      alert('Error creating game');
    }
  };

  return (
    <div className="create-game-container">
      <h2>Create New Game</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Teams:</label>
          <input
            type="text"
            placeholder="Team 1"
            value={teams[0]}
            onChange={(e) => handleTeamChange(0, e.target.value)}
          />
          <input
            type="text"
            placeholder="Team 2"
            value={teams[1]}
            onChange={(e) => handleTeamChange(1, e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Stadium:</label>
          <input
            type="text"
            value={stadium}
            onChange={(e) => setStadium(e.target.value)}
          />
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
          <label>Result:</label>
          <input
            type="text"
            placeholder="e.g., Team A 3-2 Team B"
            value={result}
            onChange={(e) => setResult(e.target.value)}
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
          <input
            type="text"
            placeholder="e.g., Friendly, Tournament"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <button type="submit">Create Game</button>
      </form>
    </div>
  );
}

export default CreateGame;
