// src/store/slices/stadiumSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStadiums } from '../../api/stadiumApi';

export const loadStadiums = createAsyncThunk('stadiums/loadStadiums', async () => {
  const stadiums = await fetchStadiums();
  return stadiums;
});

const stadiumSlice = createSlice({
  name: 'stadiums',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadStadiums.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadStadiums.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(loadStadiums.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default stadiumSlice.reducer;
