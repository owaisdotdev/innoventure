import axios from 'axios';

const mainUrl = "https://innoventure-api.vercel.app/";
const API = axios.create({ baseURL: mainUrl });

// Adding Authorization header with token from localStorage
API.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return req;
});

// Functions for each API endpoint
export const getTotalInvestments = async () => {
  try {
    const response = await API.get('/admin-dashboard/total-investments');
    return response?.data;
  } catch (error) {
    console.error("Error fetching total investments:", error);
    return null;
  }
};

export const getActiveStartups = async () => {
  try {
    const response = await API.get('/admin-dashboard/active-startups');
    return response?.data;
  } catch (error) {
    console.error("Error fetching active startups:", error);
    return null;
  }
};

export const getActiveInvestors = async () => {
  try {
    const response = await API.get('/admin-dashboard/active-investors');
    return response?.data;
  } catch (error) {
    console.error("Error fetching active investors:", error);
    return null;
  }
};

export const getRecentActivity = async () => {
  try {
    const response = await API.get('/admin-dashboard/recent-activity');
    return response?.data;
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return null;
  }
};

export const getCountInvestorsStartups = async () => {
  try {
    const response = await API.get('/admin-dashboard/count-investors-startups');
    return response?.data;
  } catch (error) {
    console.error("Error fetching investors and startups count:", error);
    return null;
  }
};

export const getRecentInvestmentsWithDetails = async () => {
  try {
    const response = await API.get('/admin-dashboard/recent-investments-with-details');
    return response?.data;
  } catch (error) {
    console.error("Error fetching recent investments with details:", error);
    return null;
  }
};

export const getFydpStartups = async () => {
  try {
    const response = await API.get('/admin-dashboard/fydp-startups');
    return response?.data;
  } catch (error) {
    console.error("Error fetching FYDP startups:", error);
    return null;
  }
};

export const getPendingInvestments = async () => {
  try {
    const response = await API.get('/admin-dashboard/investments/pending');
    return response?.data;
  } catch (error) {
    console.error("Error fetching pending investments:", error);
    return null;
  }
};

export const getApprovedInvestments = async () => {
  try {
    const response = await API.get('/admin-dashboard/investments/approved');
    return response?.data;
  } catch (error) {
    console.error("Error fetching approved investments:", error);
    return null;
  }
};

export const getRejectedInvestments = async () => {
  try {
    const response = await API.get('/admin-dashboard/investments/rejected');
    return response?.data;
  } catch (error) {
    console.error("Error fetching rejected investments:", error);
    return null;
  }
};

export const approveInvestment = async (id) => {
  try {
    const response = await API.patch(`/admin-dashboard/investments/${id}/approve`);
    return response?.data;
  } catch (error) {
    console.error("Error approving investment:", error);
    return null;
  }
};

export const rejectInvestment = async (id) => {
  try {
    const response = await API.patch(`/admin-dashboard/investments/${id}/reject`);
    return response?.data;
  } catch (error) {
    console.error("Error rejecting investment:", error);
    return null;
  }
};
export const getInvestorById = async (id) => {
  try {
    const response = await API.patch(`/investors/${id}`);
    console.log(response)
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
export const getStartupById = async (id) => {
  try {
    const response = await API.patch(`/startups/${id}`);
    console.log(response)
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
