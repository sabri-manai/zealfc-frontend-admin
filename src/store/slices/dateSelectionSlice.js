// src/store/slices/dateSelectionSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const dateSelectionSlice = createSlice({
  name: 'dateSelection',
  initialState: {
    selectedDate: null,
  },
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setSelectedDate } = dateSelectionSlice.actions;
export default dateSelectionSlice.reducer;
