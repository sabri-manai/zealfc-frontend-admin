// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import stadiumsReducer from './slices/stadiumSlice';
import gamePhaseReducer from './slices/gamePhaseSlice';
import stadiumSelectionReducer from './slices/stadiumSelectionSlice';
import dateSelectionReducer from './slices/dateSelectionSlice';
import slotSelectionReducer from './slices/slotSelectionSlice';
import levelSelectionReducer from './slices/levelSelectionSlice';
import hostSelectionReducer from './slices/hostSelectionSlice'; // Import hostSelectionSlice

export default configureStore({
  reducer: {
    stadiums: stadiumsReducer,
    gamePhase: gamePhaseReducer,
    stadiumSelection: stadiumSelectionReducer,
    dateSelection: dateSelectionReducer,
    slotSelection: slotSelectionReducer,
    levelSelection: levelSelectionReducer,
    hostSelection: hostSelectionReducer, // Add to the store
  },
});
