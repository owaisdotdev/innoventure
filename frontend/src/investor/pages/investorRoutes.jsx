import React from 'react';
import { Route } from 'react-router-dom';

import InvestmentPortfolio from './InvestmentPortfolio';
import FeaturedStartups from './Featured';
import RecommendedStartups from './Recommended';
import FydpsList from './RecommendedFydp';

const InvestorRoutes = (
  <>
    <Route exact path="/investor/investment-portfolio" element={<InvestmentPortfolio />} />
    <Route exact path="/investor/featured-startups" element={<FeaturedStartups />} />
    <Route exact path="/investor/recommended-startups" element={<RecommendedStartups />} />
    <Route exact path="/investor/fydp-projects" element={<FydpsList />} />
   
  </>
);

export default InvestorRoutes;
