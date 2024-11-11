// src/components/ManageGame/GameStats.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GameStats.css';

const GameStats = ({ teams, duration, gameId, onFinish }) => {
  const [goals, setGoals] = useState({});
  const [assists, setAssists] = useState({});
  const [timer, setTimer] = useState(duration * 60); // Convert minutes to seconds
  const [score, setScore] = useState([0, 0]); // Team scores

  useEffect(() => {
    // Timer countdown
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGoal = (teamIndex, playerIndex) => {
    const key = `${teamIndex}-${playerIndex}`;
    setGoals({
      ...goals,
      [key]: (goals[key] || 0) + 1,
    });
    // Update team score
    const newScore = [...score];
    newScore[teamIndex] += 1;
    setScore(newScore);
  };

  const handleAssist = (teamIndex, playerIndex) => {
    const key = `${teamIndex}-${playerIndex}`;
    setAssists({
      ...assists,
      [key]: (assists[key] || 0) + 1,
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleFinish = async () => {
    // Prepare stats data
    const statsData = [];

    for (const key in goals) {
      const [teamIndex, playerIndex] = key.split('-').map(Number);
      const player = teams[teamIndex][playerIndex];
      if (player) { // Check if player exists
        statsData.push({
          email: player.email,
          goals: goals[key],
          assists: assists[key] || 0,
          yellow_cards: 0,
          red_cards: 0,
        });
      }
    }

    try {
      const idToken = localStorage.getItem('idToken');
      await axios.put(
        `${process.env.REACT_APP_API_URL}/games/${gameId}/status`,
        { status: 'finished', stats: statsData },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Game finished and stats updated!');
      onFinish();
    } catch (error) {
      console.error('Error finishing game:', error);
    }
  };

  return (
    <div className="game-stats-container">
      <div className="game-stats-header">
        <div className="timer">⏱ {formatTime(timer)}</div>
        <div className="scoreboard">Score: {score[0]} - {score[1]}</div>
        <button onClick={handleFinish} className="finish-button">Finish</button>
      </div>
      <div className="player-lists">
        {teams.map((team, teamIndex) => (
          <div key={teamIndex} className="team-list">
            <h2>Team {teamIndex + 1}</h2>
            <ul>
              {team.map((player, playerIndex) => {
                const key = `${teamIndex}-${playerIndex}`;
                return player ? ( // Check if player is not null
                  <li key={playerIndex} className="player-item">
                    <span>{playerIndex + 1}</span>
                    <img src={player.picture || '/default-avatar.png'} alt="Player" />
                    <span>{player.first_name} {player.last_name}</span>
                    <div className="stats-buttons">
                      <button onClick={() => handleGoal(teamIndex, playerIndex)}>⚽</button>
                      <span>{goals[key] || 0}</span>
                      <button onClick={() => handleAssist(teamIndex, playerIndex)}>🎯</button>
                      <span>{assists[key] || 0}</span>
                    </div>
                  </li>
                ) : (
                  <li key={playerIndex} className="player-item">
                    <span>{playerIndex + 1}</span>
                    <span>Empty Slot</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameStats;
