import axios from 'axios';

const mainUrl = "http://localhost:3000/";
const API = axios.create({ baseURL: mainUrl });

// Adding Authorization header with token from localStorage
API.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return req;
});

// Functions for each API endpoint

// Create a new Smart Contract
export const createSmartContract = async (smartContractData) => {
  try {
    const response = await API.post('/smart-contracts', smartContractData);
    return response?.data;
  } catch (error) {
    console.error("Error creating smart contract:", error);
    return null;
  }
};

// Retrieve all Smart Contracts
export const getAllSmartContracts = async () => {
  try {
    const response = await API.get('/smart-contracts');
    return response?.data;
  } catch (error) {
    console.error("Error retrieving smart contracts:", error);
    return null;
  }
};

// Retrieve a Smart Contract by ID
export const getSmartContractById = async (id) => {
  try {
    const response = await API.get(`/smart-contracts/${id}`);
    return response?.data;
  } catch (error) {
    console.error(`Error retrieving smart contract with ID ${id}:`, error);
    return null;
  }
};

// Update a Smart Contract by ID
export const updateSmartContractById = async (id, updatedData) => {
  try {
    const response = await API.put(`/smart-contracts/${id}`, updatedData);
    return response?.data;
  } catch (error) {
    console.error(`Error updating smart contract with ID ${id}:`, error);
    return null;
  }
};

// Add an Investment to a Smart Contract
export const addInvestmentToSmartContract = async (id, investmentData) => {
  try {
    const response = await API.post(`/smart-contracts/${id}/investment`, investmentData);
    return response?.data;
  } catch (error) {
    console.error(`Error adding investment to smart contract with ID ${id}:`, error);
    return null;
  }
};

// Retrieve Smart Contracts by Status
export const getSmartContractsByStatus = async (status) => {
  try {
    const response = await API.get(`/smart-contracts/status/${status}`);
    return response?.data;
  } catch (error) {
    console.error(`Error retrieving smart contracts with status ${status}:`, error);
    return null;
  }
};

// Retrieve Smart Contracts by Investment ID
export const getSmartContractsByInvestmentId = async (investmentId) => {
  try {
    const response = await API.get(`/smart-contracts/investment/${investmentId}`);
    return response?.data;
  } catch (error) {
    console.error(`Error retrieving smart contracts with investment ID ${investmentId}:`, error);
    return null;
  }
};
