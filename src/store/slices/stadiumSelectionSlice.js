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
    resetSelectedStadium: (state) => {
      state.selectedStadium = null;
    },
  },
});

export const { setSelectedStadium, resetSelectedStadium } = stadiumSelectionSlice.actions;
export default stadiumSelectionSlice.reducer;
