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
    resetSelectedDate: (state) => {
      state.selectedDate = null;
    },
  },
});

export const { setSelectedDate, resetSelectedDate } = dateSelectionSlice.actions;
export default dateSelectionSlice.reducer;
