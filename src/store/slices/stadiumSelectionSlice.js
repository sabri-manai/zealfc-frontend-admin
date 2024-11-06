// src/store/slices/stadiumSelectionSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const stadiumSelectionSlice = createSlice({
  name: 'stadiumSelection',
  initialState: {
    selectedStadium: null,
  },
  reducers: {
    setSelectedStadium: (state, action) => {
      state.selectedStadium = action.payload;
    },
  },
});

export const { setSelectedStadium } = stadiumSelectionSlice.actions;
export default stadiumSelectionSlice.reducer;
