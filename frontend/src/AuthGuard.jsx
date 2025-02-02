import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext'; // AuthContext se user data fetch karte hain

// AuthGuard component to protect routes
const AuthGuard = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext); // AuthContext se authentication status fetch karte hain

    if (!isAuthenticated) { // Agar user authenticated nahi hai
        // User ko login page par redirect kar denge
        return <Navigate to="/login" replace />;
    }

    // Agar user authenticated hai, toh children (protected route) render karenge
    return children; 
};

export default AuthGuard;
