// src/store/slices/slotSelectionSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const slotSelectionSlice = createSlice({
  name: 'slotSelection',
  initialState: {
    selectedSlot: null,
  },
  reducers: {
    setSelectedSlot: (state, action) => {
      state.selectedSlot = action.payload;
    },
  },
});

export const { setSelectedSlot } = slotSelectionSlice.actions;
export default slotSelectionSlice.reducer;
