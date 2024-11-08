import { createSlice } from '@reduxjs/toolkit';

export const levelSelectionSlice = createSlice({
  name: 'levelSelection',
  initialState: {
    selectedLevel: null,
  },
  reducers: {
    setSelectedLevel: (state, action) => {
      state.selectedLevel = action.payload;
    },
    resetSelectedLevel: (state) => {
      state.selectedLevel = null;
    },
  },
});

export const { setSelectedLevel, resetSelectedLevel } = levelSelectionSlice.actions;
export default levelSelectionSlice.reducer;
