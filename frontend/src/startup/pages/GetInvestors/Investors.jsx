import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaIndustry, FaMoneyBillWave, FaArrowRight } from 'react-icons/fa';
import Layout from '@/startup/Layout/Layout';

const InvestorsList = () => {
  const [matchedInvestors, setMatchedInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const startupId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all investors
        const investorsResponse = await fetch("http://localhost:3000/investors");
        const allInvestors = await investorsResponse.json();

        // Fetch AI matched investor IDs with similarity
        const matchResponse = await fetch("http://localhost:8080/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ startup_id: startupId }),
        });
        const matchData = await matchResponse.json();
        const matched = matchData.potential_investors || [];

        // Match details and add similarity
        const matchedWithDetails = matched.map((match) => {
          const fullInvestor = allInvestors.find(inv => inv._id === match.id);
          return fullInvestor
            ? { ...fullInvestor, similarity: match.similarity }
            : null;
        }).filter(Boolean);

        setMatchedInvestors(matchedWithDetails);
      } catch (error) {
        console.error("Error loading investors:", error);
      } finally {
        setLoading(false);
      }
    };

    if (startupId) {
      fetchData();
    }
  }, [startupId]);

  return (
    <Layout>
      <div className="px-6 py-12 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-900">
          Investors Found By AI Matchmaking
        </h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"></div>
            <span className="ml-4 text-lg text-purple-700 font-semibold">Loading investors...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {matchedInvestors.map((investor) => (
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
                <p className="text-gray-600 mb-2">Risk Tolerance: {investor.preferences?.riskTolerance}</p>
                <p className="text-gray-700 mb-4 font-medium">🔍 Similarity Score: {(investor.similarity * 100).toFixed(2)}%</p>
                <Link
                  to={`/startup/investor/${investor._id}`}
                  className="px-10 bg-black py-2 wa-full text-c text-purple-100 font-semibold inline-flex items-center hover:underline"
                >
                  Pitch <FaArrowRight className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InvestorsList;
