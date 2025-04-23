import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/startups';

const StartupService = {
  // GET /startups - Get all startups
  getAllStartups: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching startups:', error);
      throw error;
    }
  },

  // GET /startups/email - Get startup by email
  getStartupByEmail: async (email) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/email`, {
        params: { email },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching startup by email:', error);
      throw error;
    }
  },

  // GET /startups/industry - Get startups by industry
  getStartupsByIndustry: async (industry) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/industry`, {
        params: { industry },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching startups by industry:', error);
      throw error;
    }
  },

  // GET /startups/{id} - Get startup by ID
  getStartupById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching startup by ID:', error);
      throw error;
    }
  },

  // PUT /startups/{id} - Update startup
  updateStartup: async (id, startupData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, startupData);
      return response.data;
    } catch (error) {
      console.error('Error updating startup:', error);
      throw error;
    }
  },

  // DELETE /startups/{id} - Delete startup
  deleteStartup: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting startup:', error);
      throw error;
    }
  }
};

export default StartupService;
