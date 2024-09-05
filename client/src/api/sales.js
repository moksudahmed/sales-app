import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1/sales/';

export const fetchSales = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addSale = async (sale, token) => {
  const response = await axios.post(API_URL, sale, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateSale = async (saleId, updatedSale, token) => {
  const response = await axios.put(`${API_URL}${saleId}`, updatedSale, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteSale = async (saleId, token) => {
  await axios.delete(`${API_URL}${saleId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
