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
    resetSelectedSlot: (state) => {
      state.selectedSlot = null;
    },
  },
});

export const { setSelectedSlot, resetSelectedSlot } = slotSelectionSlice.actions;
export default slotSelectionSlice.reducer;
