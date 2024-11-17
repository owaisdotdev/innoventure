import React from 'react';
import { Route } from 'react-router-dom';

import InvestmentPortfolio from './InvestmentPortfolio';
import FeaturedStartups from './Featured';
import RecommendedStartups from './Recommended';

const InvestorRoutes = (
  <>
    <Route exact path="/investor/investment-portfolio" element={<InvestmentPortfolio />} />
    <Route exact path="/investor/featured-startups" element={<FeaturedStartups />} />
    <Route exact path="/investor/recommended-startups" element={<RecommendedStartups />} />
   
  </>
);

export default InvestorRoutes;
