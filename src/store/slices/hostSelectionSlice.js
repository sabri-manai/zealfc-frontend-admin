// src/store/slices/hostSelectionSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const hostSelectionSlice = createSlice({
  name: 'hostSelection',
  initialState: {
    selectedHost: null,
  },
  reducers: {
    setSelectedHost: (state, action) => {
      state.selectedHost = action.payload;
    },
    resetSelectedHost: (state) => {
      state.selectedHost = null;
    },
  },
});

export const { setSelectedHost, resetSelectedHost } = hostSelectionSlice.actions;

export default hostSelectionSlice.reducer;
