import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

const AuthGuard = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
console.log(typeOf(currentUser));
    // If there's no currentUser, redirect to the login page
    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return children; // Render the children if the user is authenticated
};

export default AuthGuard;
