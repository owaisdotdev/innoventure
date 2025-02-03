import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { Route } from 'react-router-dom';


import InvestmentPortfolio from './InvestmentPortfolio';
import FeaturedStartups from './Featured';
import RecommendedStartups from './Recommended';
import FydpsList from './RecommendedFydp';
import StartupDetails from './StartupDetails';

import InvestorDashboard from './Dashboard';

const InvestorRoutes = () => {
  return (
    <Routes>
      <Route path="/investor/dashboard/:userId" element={<InvestorDashboard />} />
      <Route path="/investor/investment-portfolio" element={<InvestmentPortfolio />} />
      <Route path="/investor/featured-startups" element={<FeaturedStartups />} />
      <Route path="/investor/recommended-startups" element={<RecommendedStartups />} />
      <Route path="/investor/fydp-projects" element={<FydpsList />} />
      <Route path="/investor/startup/:id" element={<StartupDetails />} />
    </Routes>
  );
};


export default InvestorRoutes;
