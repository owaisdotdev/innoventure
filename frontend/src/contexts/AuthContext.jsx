import { createContext, useEffect, useState } from "react";
import * as jose from 'jose';
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token"); // localStorage se token le rahe hain

        if (token) {
            try {
                const decodedUser = jose.decodeJwt(token);
                // console.log(decodedUser); 
               
                setIsAuthenticated(true);
                setCurrentUser(decodedUser); 
            } catch (error) {
            
                console.error("Invalid token", error);
                setIsAuthenticated(false);
                setCurrentUser(null);
            }
        }
    }, []);
   
    const getUserId = () => {
        return currentUser?.userId || null;
    };

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

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, getUserId }}>
            {children} 
        </AuthContext.Provider>
    );
};

