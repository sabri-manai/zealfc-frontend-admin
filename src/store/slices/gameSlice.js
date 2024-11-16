// src/store/slices/gameSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    game: null,
    phase: 1,
    attendance: {},
    goals: {},
    assists: {},
    timer: 0,
    score: [0, 0],
    loading: false,
    error: null,
  },
  reducers: {
    setGame(state, action) {
      state.game = action.payload;
    },
    setPhase(state, action) {
      state.phase = action.payload;
    },
    setAttendance(state, action) {
      state.attendance = action.payload;
    },
    updateAttendance(state, action) {
      const { key, status } = action.payload;
      state.attendance[key] = status;
    },
    setGoals(state, action) {
      state.goals = action.payload;
    },
    updateGoal(state, action) {
      const { key } = action.payload;
      state.goals[key] = (state.goals[key] || 0) + 1;
      // Update score
      const teamIndex = parseInt(key.split('-')[0], 10);
      state.score[teamIndex] += 1;
    },
    setAssists(state, action) {
      state.assists = action.payload;
    },
    updateAssist(state, action) {
      const { key } = action.payload;
      state.assists[key] = (state.assists[key] || 0) + 1;
    },
    setTimer(state, action) {
      state.timer = action.payload;
    },
    decrementTimer(state) {
      state.timer -= 1;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setScore(state, action) {
      state.score = action.payload;
    },
  },
});

export const {
  setGame,
  setPhase,
  setAttendance,
  updateAttendance,
  setGoals,
  updateGoal,
  setAssists,
  updateAssist,
  setTimer,
  decrementTimer,
  setLoading,
  setError,
  setScore,
} = gameSlice.actions;

export const fetchGame = (gameId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/games/${gameId}`);
    dispatch(setGame(response.data));
    dispatch(setTimer(response.data.duration * 60));
  } catch (error) {
    dispatch(setError('Error fetching game'));
  } finally {
    dispatch(setLoading(false));
  }
};

export default gameSlice.reducer;
