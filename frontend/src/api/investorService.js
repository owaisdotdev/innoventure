import axios from 'axios';

const mainUrl = "https://innoventure-api.vercel.app/";
const API = axios.create({ baseURL: mainUrl });

// Adding Authorization header with token from localStorage
API.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return req;
});

// Functions for each API endpoint
export const getTotalInvestments = async (id) => {
  try {
    const response = await API.get(`/investor-dashboard/${id}/total-investment`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching total investments:", error);
    return null;
  }
};

export const getTotalReturns = async (id) => {
  try {
    const response = await API.get(`/investor-dashboard/${id}/total-returns`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching total returns:", error);
    return null;
  }
};

export const getActiveProjects = async (id) => {
  try {
    const response = await API.get(`/investor-dashboard/${id}/active-projects`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching total returns:", error);
    return null;
  }
};
