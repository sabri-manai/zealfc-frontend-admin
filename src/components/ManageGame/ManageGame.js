// src/components/ManageGame/ManageGame.js
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GameDetails from './GameDetails';
import PlayerList from './PlayerList';
import GameStats from './GameStats';
import { fetchGame, setPhase } from '../../store/slices/gameSlice';
import './ManageGame.css';

const ManageGame = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { game, phase, loading } = useSelector((state) => state.game);

  useEffect(() => {
    dispatch(fetchGame(gameId));
  }, [dispatch, gameId]);

  if (loading || !game) return <div>Loading...</div>;

  const handleStart = () => {
    dispatch(setPhase(phase + 1));
  };

  const handleFinish = () => {
    // Handle post-game actions, e.g., navigate away or reset phase
    dispatch(setPhase(1));
    navigate('/'); // Navigate to desired route
  };

  return (
    <div className="manage-game-container">
      {phase === 1 && (
        <>
          <GameDetails game={game} onStart={handleStart} />
          <PlayerList />
        </>
      )}
      {phase === 2 && (
        <>
          <PlayerList onStart={handleStart} />
        </>
      )}
      {phase === 3 && <GameStats onFinish={handleFinish} />}
    </div>
  );
};

export default ManageGame;
