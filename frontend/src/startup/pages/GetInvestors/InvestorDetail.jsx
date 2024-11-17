// src/components/InvestorDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaEnvelope, FaIndustry, FaGlobeAmericas, FaChartLine, FaMoneyCheckAlt } from 'react-icons/fa';
import Layout from '@/startup/Layout/Layout';

const InvestorDetail = () => {
  const { id } = useParams();
  const [investor, setInvestor] = useState(null);

  useEffect(() => {
    const fetchInvestor = async () => {
      const data = {
        _id: "66ffd1484ca4ca6c44f7f531",
        name: "John Doe",
        email: "john@example.com",
        preferences: {
          sectors: ["Tech"],
          regions: ["US"],
          riskTolerance: "Medium",
        },
        criteria: {
          minInvestment: 5000,
          maxInvestment: 50000,
          investmentHorizon: "5 years",
        },
        profileStatus: "active",
        investments: [
          { id: "670036c781af7b2409a3cb04", name: "Startup A" },
          { id: "672e72d388962d33fea99153", name: "Startup B" },
          { id: "672e732e80bc6d862df64dc3", name: "Startup C" },
        ],
      };
      setInvestor(data);
    };

    fetchInvestor();
  }, [id]);

  if (!investor) return <p>Loading...</p>;

  return (
    <Layout>
    <div className="px-6 py-12 bg-gradient-to-b from-indigo-100 to-white min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{investor?.name}</h1>
          <p className="text-lg text-gray-500 flex items-center justify-center space-x-2">
            <FaEnvelope className="text-indigo-400" /> <span>{investor?.email}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-gradient-to-r from-indigo-50 to-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center mb-4">
              <FaIndustry className="text-indigo-400 mr-2" /> Preferences
            </h2>
            <p className="text-gray-600 mb-2"><span className="font-medium">Sectors:</span> {investor?.preferences.sectors.join(", ")}</p>
            <p className="text-gray-600 mb-2 flex items-center">
              <FaGlobeAmericas className="text-green-400 mr-2" /> <span className="font-medium">Regions:</span> {investor?.preferences.regions.join(", ")}
            </p>
            <p className="text-gray-600 flex items-center">
              <FaChartLine className="text-blue-400 mr-2" /> <span className="font-medium">Risk Tolerance:</span> {investor?.preferences.riskTolerance}
            </p>
          </div>

          <div className="p-6 bg-gradient-to-r from-purple-50 to-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center mb-4">
              <FaMoneyCheckAlt className="text-purple-400 mr-2" /> Investment Criteria
            </h2>
            <p className="text-gray-600 mb-2"><span className="font-medium">Min Investment:</span> ${investor?.criteria.minInvestment}</p>
            <p className="text-gray-600 mb-2"><span className="font-medium">Max Investment:</span> ${investor?.criteria.maxInvestment}</p>
            <p className="text-gray-600"><span className="font-medium">Investment Horizon:</span> {investor?.criteria.investmentHorizon}</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Investments</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {investor?.investments.map((inv) => (
              <li key={inv.id} className="pl-4">{inv.name}</li>
            ))}
          </ul>
        </div>

        <div className="text-center mt-10">
          <p className="text-lg text-gray-600">
            Profile Status: <span className={`font-semibold ${investor?.profileStatus === 'active' ? 'text-green-500' : 'text-red-500'}`}>
              {investor?.profileStatus.charAt(0).toUpperCase() + investor?.profileStatus.slice(1)}
            </span>
          </p>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default InvestorDetail;
