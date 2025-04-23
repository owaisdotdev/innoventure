// src/components/InvestorsList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaIndustry, FaMoneyBillWave, FaArrowRight } from 'react-icons/fa';
import Layout from '@/startup/Layout/Layout';

const InvestorsList = () => {
  const [investors, setInvestors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://innoventure-api.vercel.app/investors");
        const data = await response.json();
        setInvestors(data);
      } catch (error) {
        console.error("Error fetching investors:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="px-6 py-12 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-900">
Investors Found By AI Matchmaking        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {investors.map((investor) => (
            <div
              key={investor._id}
              className="bg-white p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <FaUser className="text-purple-500 text-3xl mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">{investor.name}</h2>
              </div>
              <p className="text-gray-600 mb-2 flex items-center">
                <FaIndustry className="text-blue-400 mr-2" /> Sectors: {investor.preferences?.sectors.join(", ")}
              </p>
              <p className="text-gray-600 mb-2 flex items-center">
                <FaMoneyBillWave className="text-green-400 mr-2" /> Min Investment: ${investor.criteria?.minInvestment}
              </p>
              <p className="text-gray-600 mb-4">Risk Tolerance: {investor.preferences?.riskTolerance}</p>
              <Link
                to={`/startup/investor/${investor._id}`}
                className="px-10 bg-black py-2 wa-full text-c text-purple-100 font-semibold inline-flex items-center hover:underline"
              >
                Pitch<FaArrowRight className="ml-2" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default InvestorsList;
