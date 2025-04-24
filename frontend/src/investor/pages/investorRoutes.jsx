import React from 'react';

import { Routes, Route } from 'react-router-dom';




import InvestmentPortfolio from './InvestmentPortfolio';
import FeaturedStartups from './Featured';
import RecommendedStartups from './Recommended';
import FydpsList from './RecommendedFydp';
import ActiveProjects from './ActiveProjects';
import StartupDetails from './StartupDetails';
import ProjectDetails from './ProjectDetails';
import InvestorAnalysisCharts from './MarketAnalysis';
import InvestorDashboard from './Dashboard';

const InvestorRoutes = () => {
  return (
    <Routes>
    <Route path="dashboard/:userId" element={<InvestorDashboard />} />
    <Route path="investment-portfolio" element={<InvestmentPortfolio />} />
    <Route path="featured-startups" element={<FeaturedStartups />} />

    <Route path="active-projects" element={<ActiveProjects />} />


    <Route path="active-projects/:id" element={<ProjectDetails />} />
    <Route path="recommended-startups" element={<RecommendedStartups />} />
    <Route path="analysis" element={<InvestorAnalysisCharts />} />

    <Route path="fydp-projects" element={<FydpsList />} />
    <Route path="startup/:id" element={<StartupDetails />} />
  </Routes>
  
  );
};


export default InvestorRoutes;
