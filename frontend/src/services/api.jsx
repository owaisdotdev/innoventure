// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'multipart/form-data' },
});

// Mock response until backend is ready
api.interceptors.response.use(
  (response) => response,
  () => Promise.resolve({
    data: { message: 'Mock milestone submitted', ipfsHash: 'mock_hash', analysis: 'Mock analysis' },
  })
);

export default api;