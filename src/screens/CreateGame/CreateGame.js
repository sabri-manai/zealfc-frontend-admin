// src/components/GameCreation/CreateGame.js
// src/components/GameCreation/CreateGame.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadStadiums } from '../../store/slices/stadiumSlice';
import './CreateGame.css';
import StadiumSelection from "../../components/GameCreation/StadiumSelection";
import DateSelection from "../../components/GameCreation/DateSelection";
import SlotSelection from "../../components/GameCreation/SlotSelection";
import LevelSelection from "../../components/GameCreation/LevelSelection";
import Confirmation from "../../components/GameCreation/Confirmation";
import CreateGameImageTwo from '../../assets/images/turia.png';

function CreateGame() {
  const dispatch = useDispatch();
  const stadiums = useSelector((state) => state.stadiums.list);
  const stadiumsStatus = useSelector((state) => state.stadiums.status);
  const phase = useSelector((state) => state.gamePhase.phase);
  const selectedStadium = useSelector((state) => state.stadiumSelection.selectedStadium);
  const selectedDate = useSelector((state) => state.dateSelection.selectedDate);
  const selectedSlot = useSelector((state) => state.slotSelection.selectedSlot);
  const selectedLevel = useSelector((state) => state.levelSelection.selectedLevel);

  useEffect(() => {
    if (stadiumsStatus === 'idle') {
      dispatch(loadStadiums());
    }
  }, [stadiumsStatus, dispatch]);

  return (
    <div className={`create-game-layout ${phase === 1 || phase === 5 ? 'full-width' : ''}`}>
      {/* Display the background image container only for specific phases */}
      {phase !== 1 && phase !== 5 && (
        <div className="game-image-two-container">
          <img src={CreateGameImageTwo} alt="Game" className="game-image-two" />
          <div className="noiseeffect"></div>
        </div>
      )}

      <div className={`create-game-content ${phase === 1 || phase === 5 ? 'full-width' : ''}`}>
        {phase === 1 && <StadiumSelection stadiums={stadiums} />}
        {phase === 2 && <DateSelection />}
        {phase === 3 && <SlotSelection slots={selectedStadium?.slots || []} />}
        {phase === 4 && <LevelSelection />}
        {phase === 5 && (
            <Confirmation
            gameData={{
              stadium: selectedStadium,
              date: selectedDate,
              slot: selectedSlot,
              level: selectedLevel,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default CreateGame;
