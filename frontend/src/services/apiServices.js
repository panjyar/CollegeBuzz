// src/services/apiService.js
import axios from 'axios';

const BASE_URL = 'mongodb+srv://pradip1:MT9RUPG9Kq9s3Rp7@cluster0.awebuxe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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
