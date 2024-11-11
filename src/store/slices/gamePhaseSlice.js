// src/store/slices/gamePhaseSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const gamePhaseSlice = createSlice({
  name: 'gamePhase',
  initialState: {
    phase: 1,
  },
  reducers: {
    nextPhase: (state) => {
      if (state.phase < 6) {
        state.phase += 1;
      }
    },
    previousPhase: (state) => {
      if (state.phase > 1) {
        state.phase -= 1;
      }
    },
    resetPhase: (state) => {
      state.phase = 1;
    },
  },
});

export const { nextPhase, previousPhase, resetPhase } = gamePhaseSlice.actions;

export default gamePhaseSlice.reducer;
