// src/services/apiService.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchActiveRecords = async (collection, limit = 50) => {
  try {
    const response = await axios.get(`${BASE_URL}/active/${collection}`, {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${collection}:`, error);
    return [];
  }
};

export const fetchArchivedRecords = async (collection, limit = 50) => {
  try {
    const response = await axios.get(`${BASE_URL}/archived/${collection}`, {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching archived ${collection}:`, error);
    return [];
  }
};
