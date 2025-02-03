import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext'; // Fetch AuthContext Data

const AuthGuard = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext); // Get authentication status

    if (!isAuthenticated) { 
        return <Navigate to="/login" replace />;
    }
    return children; 
};

export default AuthGuard;
