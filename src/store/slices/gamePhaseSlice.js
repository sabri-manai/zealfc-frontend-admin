import { createSlice } from '@reduxjs/toolkit';

export const gamePhaseSlice = createSlice({
  name: 'gamePhase',
  initialState: {
    phase: 1,  // Default starting phase
  },
  reducers: {
    nextPhase: (state) => {
      state.phase += 1;
    },
    previousPhase: (state) => {
      if (state.phase > 1) state.phase -= 1;
    },
    resetPhase: (state) => {
      state.phase = 1;
    },
    setPhase: (state, action) => {
      state.phase = action.payload;
    }
  }
});

export const { nextPhase, previousPhase, resetPhase, setPhase } = gamePhaseSlice.actions;
export default gamePhaseSlice.reducer;
