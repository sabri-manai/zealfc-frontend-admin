// src/api/stadiumApi.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchStadiums = async () => {
  try {
    const response = await axios.get(`${API_URL}/stadiums`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stadiums:", error);
    throw error;
  }
};
