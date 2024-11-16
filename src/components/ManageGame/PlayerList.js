// src/components/ManageGame/PlayerList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAttendance } from '../../store/slices/gameSlice';
import Button from '../Button/Button';
import './PlayerList.css';
import profilePic from '../../assets/images/profile_image.jpg';

const PlayerList = ({ onStart }) => {
  const dispatch = useDispatch();
  const { game, phase, attendance } = useSelector((state) => state.game);

  const handleAttendanceChange = (teamIndex, playerIndex, status) => {
    const key = `${teamIndex}-${playerIndex}`;
    dispatch(updateAttendance({ key, status }));
  };

  return (
    <div className="player-list-container">
      {phase === 2 && (
        <div className="score-counter">
          <span className="score">0 : 0</span>
        </div>
      )}
      <div className="player-lists">
        {game.teams.map((team, teamIndex) => (
          <div key={teamIndex} className="team-list">
            <h2 className="team-title">Team {teamIndex + 1}</h2>
            <ul className="players">
              {team.map((player, playerIndex) =>
                player ? (
                  <li key={playerIndex} className="player-item">
                    <span className="player-rank">{playerIndex + 1}.</span>
                    <img
                      src={player.profilePicture || profilePic}
                      alt="Player"
                      className="player-avatar"
                    />
                    <span className="player-name">
                      {player.first_name} {player.last_name}
                    </span>
                    {phase === 2 && (
                      <div className="attendance-icons">
                        {['present', 'absent', 'late'].map((status) => (
                          <span
                            key={status}
                            className={`attendance-icon ${
                              attendance[`${teamIndex}-${playerIndex}`] === status ? status : ''
                            }`}
                            onClick={() =>
                              handleAttendanceChange(teamIndex, playerIndex, status)
                            }
                          >
                            {status === 'present' && '✅'}
                            {status === 'absent' && '❌'}
                            {status === 'late' && '⏰'}
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={playerIndex} className="player-item">
                    <span className="player-rank">{playerIndex + 1}.</span>
                    <span className="empty-slot">Empty Slot</span>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
      {phase === 2 && (
        <Button text="Start" onClick={onStart} className="start-button" />
      )}
    </div>
  );
};

export default PlayerList;
