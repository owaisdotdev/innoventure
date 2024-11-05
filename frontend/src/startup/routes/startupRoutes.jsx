import React from 'react';
import { Route,Routes } from 'react-router-dom';
import StartupDashboard from '../pages/Dashboard';
// Add other startup-related components
import ActiveProject from '../pages/ActiveProject/ActiveProject';
const StartupRoutes = () => {
  return (
    <Routes>
      <Route path="/startup/dashboard" element={<StartupDashboard />} />
      <Route path="/startup/active-projects" element={<ActiveProject />} />

    </Routes>
  );
};

export default StartupRoutes;
