import React, { useEffect, useState } from 'react';
import { Route,Routes } from 'react-router-dom';
import StartupDashboard from '../pages/Dashboard';

// Add other startup-related components
import StartupService from '../api/api';
import ActiveProject from '../pages/ActiveProject/ActiveProject';
import Investors from '../pages/GetInvestors/Investors';
import InvestorDetail from '../pages/GetInvestors/InvestorDetail.jsx';
import Milestone from '../pages/Milestones/Milestone';
import Active_Investors from '../pages/ActiveInvestment/ActiveInvestment';
import AllOffers from '../pages/OfferByInvestor/AllOffers';
import Proposals from '../pages/Proposals/Proposals';

const StartupRoutes = () => {
  const [startup, setStartup] = useState(null); // Single startup fetched by ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    // Retrieve the ID from localStorage and fetch startup data by ID
    const fetchStartupById = async () => {
      const userId = localStorage.getItem('user'); // Retrieve ID from localStorage
      if (userId) {
        try {
          const data = await StartupService.getStartupById("675d8f1bdfaebd7bdfb533d2");
          console.log(data);
          setStartup(data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStartupById();
  }, []);


  return (
    <Routes>
      <Route path="/startup/dashboard" element={<StartupDashboard startup={startup} />} />
      <Route path="/startup/active-projects" element={<ActiveProject />} />
      <Route path="/startup/find-investors" element={<Investors startup={startup} />} />
      <Route path="/startup/investor/:id" element={<InvestorDetail startup={startup} />} />
      <Route path="/startup/milestones" element={<Milestone startup={startup} />} />
      <Route path="/startup/active-investor" element={<Active_Investors   startup={startup} />} />
      <Route path="/startup/all-offers" element={<AllOffers   startup={startup} />} />
      <Route path="/startup/proposals" element={<Proposals  startup={startup} />} />


    </Routes>
  );
};

export default StartupRoutes;
