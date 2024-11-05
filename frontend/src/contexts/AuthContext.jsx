
import { createContext, useEffect, useState } from "react";
import * as jose from 'jose'

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedUser = jose.decodeJwt(token);
            console.log(decodedUser);
            setIsAuthenticated(true);
            setCurrentUser(decodedUser);
        }
    }, []);

    const login = (user, token) => {
        localStorage.setItem("token", token);
        setCurrentUser(user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};