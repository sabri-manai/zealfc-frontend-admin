// src/components/ManageGame/PlayerList.js
import React, { useState } from 'react';
import './PlayerList.css';

const PlayerList = ({ teams, phase, onStart }) => {
  const [attendance, setAttendance] = useState({});

  const handleAttendanceChange = (teamIndex, playerIndex, status) => {
    setAttendance({
      ...attendance,
      [`${teamIndex}-${playerIndex}`]: status,
    });
  };

  return (
    <div className="player-list-container">
      <div className="player-lists">
        {teams.map((team, teamIndex) => (
          <div key={teamIndex} className="team-list">
            <h2>Team {teamIndex + 1}</h2>
            <ul>
              {team.map((player, playerIndex) => (
                player ? ( // Check if player is not null
                  <li key={playerIndex} className="player-item">
                    <span>{playerIndex + 1}</span>
                    <img src={player.profilePicture || '/default-avatar.png'} alt="Player" />
                    <span>{player.first_name} {player.last_name}</span>
                    {phase === 1 && <span>{player.points || 0}</span>}
                    {phase === 2 && (
                      <div className="attendance-buttons">
                        <button onClick={() => handleAttendanceChange(teamIndex, playerIndex, 'present')}>✅</button>
                        <button onClick={() => handleAttendanceChange(teamIndex, playerIndex, 'absent')}>❌</button>
                        <button onClick={() => handleAttendanceChange(teamIndex, playerIndex, 'late')}>⏰</button>
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={playerIndex} className="player-item">
                    <span>{playerIndex + 1}</span>
                    <span>Empty Slot</span>
                  </li>
                )
              ))}
            </ul>
          </div>
        ))}
      </div>
      {phase === 2 && <button onClick={onStart}>Start</button>}
    </div>
  );
};

export default PlayerList;
