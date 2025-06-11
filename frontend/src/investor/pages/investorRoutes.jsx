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
import MilestoneForm from './Milestones';
import Layout from './Layout';

const ActiveContracts = () => {
  const activeContracts = [
  {
    name: " Smart Contract",
    address: "0x995E12537B9AD84A3bbe91b67dF8afB4Bbabc8d7",
    link: "https://testnet.bscscan.com/address/0x995E12537B9AD84A3bbe91b67dF8afB4Bbabc8d7",
    description:
      "This contract enables secure and transparent investments on the BSC Testnet. It handles deposits, calculates returns, and allows users to track their positions in real-time.",
    status: "Active",
    chain: "BSC Testnet",
  },
];
  return (
    <Layout>
  <div className="bg-white shadow-md rounded-2xl px-6 py-8 max-w-4xl mx-auto mt-10 border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">📄 Active Contracts</h1>

      {activeContracts.map((contract, index) => (
        <div
          key={index}
          className="bg-gray-50 p-6 rounded-xl mb-6 border border-gray-300 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{contract.name}</h2>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Network:</span> {contract.chain}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Status:</span>{" "}
            <span className="text-green-600 font-semibold">{contract.status}</span>
          </p>
          <p className="text-gray-700 mb-3">{contract.description}</p>
          <a
            href={contract.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-600 underline text-sm font-medium"
          >
            View on BscScan →
          </a>
        </div>
      ))}

      <p className="text-gray-600 text-sm mt-4">
        More contracts will be listed here as they are deployed. Stay tuned for updates.
      </p>
    </div>
    </Layout>
  );
};



const InvestorRoutes = () => {
  return (
    <Routes>
    <Route path="dashboard/:userId" element={<InvestorDashboard />} />
    <Route path="investment-portfolio" element={<InvestmentPortfolio />} />
    <Route path="featured-startups" element={<FeaturedStartups />} />

    <Route path="active-projects" element={<ActiveProjects />} />

    <Route path="active-projects/:id" element={<ProjectDetails />} />

    <Route path="milestone" element={<MilestoneForm />} />
    <Route path="recommended-startups" element={<RecommendedStartups />} />
    <Route path="analysis" element={<InvestorAnalysisCharts />} />
    <Route path="contracts" element={< ActiveContracts/>} />

    <Route path="fydp-projects" element={<FydpsList />} />
    <Route path="startup/:id" element={<StartupDetails />} />
  </Routes>
  
  );
};


export default InvestorRoutes;
