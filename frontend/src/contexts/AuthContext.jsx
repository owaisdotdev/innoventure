import { createContext, useEffect, useState } from "react";
import * as jose from 'jose';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decodedUser = jose.decodeJwt(token);
                setIsAuthenticated(true);
                setCurrentUser(decodedUser);
            } catch (error) {
                console.error("Invalid token", error);
                setIsAuthenticated(false);
                setCurrentUser(null);
            }
        }
    }, []);

    const login = (user, token) => {
        localStorage.setItem("token", token);
        setCurrentUser(user);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setCurrentUser(null);
        setIsAuthenticated(false);
    };

    const getUserId = () => {
        return currentUser?.userId || null;
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, getUserId }}>
            {children}
        </AuthContext.Provider>
    );
};
