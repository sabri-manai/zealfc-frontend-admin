// src/components/ManageGame/GameStats.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrementTimer,
  updateGoal,
  updateAssist,
} from '../../store/slices/gameSlice';
import Button from '../Button/Button';
import './GameStats.css';
import axios from 'axios'; // Import axios

const GameStats = ({ onFinish }) => {
  const dispatch = useDispatch();
  const { game, goals, assists, timer, score, attendance } = useSelector(
    (state) => state.game
  );

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleGoal = (teamIndex, playerIndex) => {
    const key = `${teamIndex}-${playerIndex}`;
    dispatch(updateGoal({ key }));
  };

  const handleAssist = (teamIndex, playerIndex) => {
    const key = `${teamIndex}-${playerIndex}`;
    dispatch(updateAssist({ key }));
  };

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const finishGame = async () => {
    const idToken = localStorage.getItem('idToken');
    const statsData = [];
    const teamGoals = [0, 0];

    // Use variables from useSelector directly
    for (const key in attendance) {
      const [teamIndex, playerIndex] = key.split('-').map(Number);
      const player = game.teams[teamIndex][playerIndex];
      if (player) {
        statsData.push({
          email: player.email,
          goals: goals[key] || 0,
          assists: assists[key] || 0,
          yellow_cards: 0,
          red_cards: 0,
          attendance: attendance[key],
        });
      }
    }

    // Calculate total goals for each team
    for (const key in goals) {
      const [teamIndex] = key.split('-').map(Number);
      teamGoals[teamIndex] += goals[key];
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/games/${game._id}/status`,
        { status: 'finished', stats: statsData },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Game finished and stats updated!');
      onFinish(); // Call the onFinish prop
    } catch (error) {
      console.error('Error finishing game:', error);
      // Handle error
    }
  };

  return (
    <div className="game-stats-container">
      <div className="game-stats-header">
        <div className="timer">⏱ {formatTime(timer)}</div>
        <div className="scoreboard">
          {score[0]} : {score[1]}
        </div>
        <Button text="Finish" onClick={finishGame} />
      </div>
      <div className="player-lists">
        {game.teams.map((team, teamIndex) => (
          <div key={teamIndex} className="team-list">
            <h2>Team {teamIndex + 1}</h2>
            <ul>
              {team.map((player, playerIndex) => {
                const key = `${teamIndex}-${playerIndex}`;
                return player ? (
                  <li key={playerIndex} className="player-item">
                    <span>{playerIndex + 1}</span>
                    <img
                      src={player.picture || '/default-avatar.png'}
                      alt="Player"
                    />
                    <span>
                      {player.first_name} {player.last_name}
                    </span>
                    <div className="stats-buttons">
                      <button
                        className="goal-icon"
                        onClick={() => handleGoal(teamIndex, playerIndex)}
                      >
                        ⚽
                      </button>
                      <span>{goals[key] || 0}</span>
                      <button
                        className="assist-icon"
                        onClick={() => handleAssist(teamIndex, playerIndex)}
                      >
                        🎯
                      </button>
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
