// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import dateSelectionReducer from './slices/dateSelectionSlice';
import levelSelectionReducer from './slices/levelSelectionSlice';
import slotSelectionReducer from './slices/slotSelectionSlice';
import stadiumSelectionReducer from './slices/stadiumSelectionSlice';
import stadiumReducer from './slices/stadiumSlice';
import gamePhaseReducer from './slices/gamePhaseSlice';

const store = configureStore({
  reducer: {
    dateSelection: dateSelectionReducer,
    levelSelection: levelSelectionReducer,
    slotSelection: slotSelectionReducer,
    stadiumSelection: stadiumSelectionReducer,
    stadiums: stadiumReducer,
    gamePhase: gamePhaseReducer,
  },
});

export default store;
