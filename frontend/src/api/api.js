import axios from "axios";

const devUrl = "http://localhost:3001/";
const mainUrl = "http://localhost:3000/";

const API = axios.create({ baseURL: mainUrl });

API.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return req;
});

export const register = async (user) => {
    try {
        const response = await API.post(`/auth/register`, user);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const login = async (user) => {
    try {
        const response = await API.post(`/auth/login`, user);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

// New Auth Endpoints

export const signupInvestor = async (investorData) => {
    try {
        const response = await API.post(`/auth/signup/investor`, investorData);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const signupStartup = async (startupData) => {
    try {
        const response = await API.post(`/auth/signup/startup`, startupData);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const loginInvestor = async (loginData) => {
    try {
        const response = await API.post(`/auth/login/investor`, loginData);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const loginStartup = async (loginData) => {
    try {
        const response = await API.post(`/auth/login/startup`, loginData);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const loginAdmin = async (loginData) => {
    try {
        const response = await API.post(`/auth/login/admin`, loginData);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};
    

export const getUserById = async (id) => {
    try {
        const response = await API.get(`/auth/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const getUserByEmail = async (email) => {
    try {
        const response = await API.get(`/auth/getUserByEmail/${email}`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateUserById = async (details) => {
    try {
        const response = await API.post(`/auth/updateUser`, details);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};


