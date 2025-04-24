import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Loader from '@/utils/Loader';
import Sidebar from "../components/Sidebar";
import Header from "../../partials/Header";

const RecommendedStartups = () => {
  const [recommendedStartups, setRecommendedStartups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const investorId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        // Fetch all startups
        const startupsResponse = await fetch("http://localhost:3000/startups");
        const allStartups = await startupsResponse.json();

        // Fetch AI matched startup IDs with similarity scores
        const matchResponse = await fetch("http://localhost:8080/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ investor_id: investorId }),
        });
        const matchData = await matchResponse.json();
        const matched = matchData.potential_startups || [];

        // Combine full startup details with similarity scores
        const matchedWithDetails = matched.map((match) => {
          const fullStartup = allStartups.find(s => s._id === match.id);
          return fullStartup
            ? { ...fullStartup, similarity: match.similarity }
            : null;
        }).filter(Boolean);

        setRecommendedStartups(matchedWithDetails);
      } catch (error) {
        console.error("Error fetching recommended startups:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (investorId) {
      fetchStartups();
    }
  }, [investorId]);

  const handleClick = (id) => {
    navigate(`/investor/startup/${id}`);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="px-6 py-4">
          <h1 className="text-3xl font-extrabold text-white mb-6">AI Recommended Startups</h1>

          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader />
            </div>
          ) : (
            <div className="space-y-6">
              {recommendedStartups.length > 0 ? (
                recommendedStartups.map((startup) => (
                  <div
                    key={startup._id}
                    className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md shadow-blue-100 transition-shadow flex items-start cursor-pointer"
                    onClick={() => handleClick(startup._id)}
                  >
                    <div className="flex-none bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center text-gray-700 font-bold">
                      {startup.name?.charAt(0) || '-'}
                    </div>

                    <div className="ml-6">
                      <h2 className="text-lg font-semibold text-gray-800">{startup.name}</h2>
                      <p className="text-xs text-gray-500 mb-2">
                        {startup.fydpDetails?.university || startup.location || 'Unknown Location'} •{' '}
                        {startup.fydpDetails?.year || 'Unknown Year'}
                      </p>
                      <p className="text-gray-700 mb-3 line-clamp-3">
                        {startup.businessPlan?.description || 'No description available'}
                      </p>
                      <div className="flex space-x-3 text-sm mb-2">
                        {startup.businessPlan?.industry && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                            {startup.businessPlan.industry}
                          </span>
                        )}
                        {startup.fydpDetails?.tags?.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-purple-100 text-purple-800 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-800 font-medium">
                        🔍 Similarity Score: {(startup.similarity * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No recommended startups found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendedStartups;
