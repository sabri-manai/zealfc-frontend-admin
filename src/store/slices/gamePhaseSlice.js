// src/store/slices/gamePhaseSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const gamePhaseSlice = createSlice({
  name: 'gamePhase',
  initialState: {
    phase: 1,
  },
  reducers: {
    setPhase: (state, action) => {
      state.phase = action.payload;
    },
    nextPhase: (state) => {
      state.phase += 1;
    },
    previousPhase: (state) => {
      if (state.phase > 1) state.phase -= 1;
    },
  },
});

export const { setPhase, nextPhase, previousPhase } = gamePhaseSlice.actions;
export default gamePhaseSlice.reducer;
