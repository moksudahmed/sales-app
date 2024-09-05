import axios from 'axios';
import qs from 'qs';

const API_URL = 'http://127.0.0.1:8000/api/v1/auth/';

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}login`, qs.stringify(credentials), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return response.data;
};

export const register = async (userInfo) => {
  await axios.post(`${API_URL}register`, userInfo);
};

export const forgotPassword = async (userInfo) => {
  // Implement forgot password logic if needed
};
