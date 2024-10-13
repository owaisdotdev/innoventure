import axios from "axios";

const devUrl = "http://localhost:8000/";
const mainUrl = "https://innoventure-api.vercel.app/";
const baseURL = process.env.NODE_ENV === "production" ? mainUrl : devUrl;

const API = axios.create({ baseURL });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

const handleError = (error) => {
    if (error.response) {
        console.error("API Response Error:", error.response.data);
        throw new Error(error.response.data.message || "Something went wrong!");
    } else if (error.request) {
        console.error("No response from API:", error.request);
        throw new Error("No response from server. Please try again later.");
    } else {
        console.error("Error:", error.message);
        throw new Error(error.message);
    }
};

export const register = async (user) => {
    try {
        const response = await API.post(`/auth/register`, user);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const login = async (user) => {
    try {
        const response = await API.post(`/auth/login`, user);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const signupInvestor = async (investorData) => {
    try {
        const response = await API.post(`/auth/signup/investor`, investorData);
        console.log(response);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const signupStartup = async (startupData) => {
    try {
        const response = await API.post(`/auth/signup/startup`, startupData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const loginInvestor = async (loginData) => {
    try {
        const response = await API.post(`/auth/login/investor`, loginData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const loginStartup = async (loginData) => {
    try {
        const response = await API.post(`/auth/login/startup`, loginData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const loginAdmin = async (loginData) => {
    try {
        const response = await API.post(`/auth/login/admin`, loginData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// User Endpoints

export const getUserById = async (id) => {
    try {
        const response = await API.get(`/auth/users/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getUserByEmail = async (email) => {
    try {
        const response = await API.get(`/auth/getUserByEmail`, {
            params: { email },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateUserById = async (details) => {
    try {
        const response = await API.post(`/auth/updateUser`, details);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
