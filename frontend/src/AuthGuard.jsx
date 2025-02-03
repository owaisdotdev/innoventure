import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext'; //fetch AuthContext Data from 
const AuthGuard = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext); // AuthContext se authentication status fetch karte hain

    if (!isAuthenticated) { 
        return <Navigate to="/login" replace />;
    }
    return children; 
};
export default AuthGuard;
