import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

const AuthGuard = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    console.log(typeof currentUser);  
    if (!currentUser) {
        console.log("object");
        // return <Navigate to="/login" />;
    }

    return children; 
};

export default AuthGuard;
