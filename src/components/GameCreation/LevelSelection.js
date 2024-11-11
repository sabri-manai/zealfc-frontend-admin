// src/components/GameCreation/LevelSelection.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedLevel } from '../../store/slices/levelSelectionSlice';
import { nextPhase, previousPhase } from '../../store/slices/gamePhaseSlice';
import './LevelSelection.css';
import Button from '../../components/Button/Button';

const LevelSelection = () => {
  const dispatch = useDispatch();
  const selectedLevel = useSelector((state) => state.levelSelection.selectedLevel);
  const levels = ['Beginner', 'Rising', 'Champion'];

  const handleSelectLevel = (level) => {
    dispatch(setSelectedLevel(level));
  };

  return (
    <div className="level-selection-container">
      <p className='level-selection-title'>CHOOSE GAME LEVEL</p>
      <div className="level-picker">
        {levels.map((level) => (
          <Button
            key={level}
            text={level}
            styleType={selectedLevel === level ? 'selected' : 'outline'}
            onClick={() => handleSelectLevel(level)}
          />
        ))}
      </div>

      <div className="level-buttons">
        <Button text="Go Back" onClick={() => dispatch(previousPhase())} />
        <Button text="Next" onClick={() => dispatch(nextPhase())} />
      </div>
    </div>
  );
};

export default LevelSelection;
