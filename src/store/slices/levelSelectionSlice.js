// src/store/slices/levelSelectionSlice.js
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
  },
});

export const { setSelectedLevel } = levelSelectionSlice.actions;
export default levelSelectionSlice.reducer;
