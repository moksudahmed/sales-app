import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1/products/';

export const fetchProducts = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addProduct = async (product, token) => {
  const response = await axios.post(API_URL, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProduct = async (productId, updatedProduct, token) => {
  const response = await axios.put(`${API_URL}${productId}`, updatedProduct, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteProduct = async (productId, token) => {
  await axios.delete(`${API_URL}${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
