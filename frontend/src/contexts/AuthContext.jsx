import { createContext, useEffect, useState, useCallback } from "react";
import * as jose from "jose";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validateToken = useCallback(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setCurrentUser(null);
      return;
    }

    try {
      const decodedUser = jose.decodeJwt(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedUser.exp && decodedUser.exp < currentTime) {
        console.warn("Token has expired");
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setCurrentUser(null);
        return;
      }

      setIsAuthenticated(true);
      setCurrentUser(decodedUser);
      console.log("Current User set to:", decodedUser);
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    validateToken();

    const handleStorageChange = (e) => {
      if (e.key === "token") validateToken();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [validateToken]);

  const login = (user, token) => {
    localStorage.setItem("token", token);
    try {
      const decodedUser = jose.decodeJwt(token);
      setCurrentUser({ ...user, ...decodedUser }); // Merge user data with decoded token
      setIsAuthenticated(true);
      console.log("Logged in with user:", { ...user, ...decodedUser });
    } catch (error) {
      console.error("Failed to decode token during login:", error);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const getUserId = () => {
    return currentUser?.userId || currentUser?.id || currentUser?._id || null;
  };

  const getUserRole = () => {
    return currentUser?.role || localStorage.getItem("role") || null;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, login, logout, getUserId, getUserRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};