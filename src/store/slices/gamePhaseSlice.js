import { createSlice } from '@reduxjs/toolkit';

export const gamePhaseSlice = createSlice({
  name: 'gamePhase',
  initialState: {
    phase: 1, // Assuming phase 1 is the initial phase
  },
  reducers: {
    nextPhase: (state) => {
      state.phase += 1;
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
