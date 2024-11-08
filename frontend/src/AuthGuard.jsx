import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

const AuthGuard = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        // If the user is not authenticated, redirect to the login page
        return <Navigate to="/login" replace />;
    }


    return children; 
};

export default AuthGuard;
 9