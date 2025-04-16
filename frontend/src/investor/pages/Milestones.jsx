import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Milestones = () => {
  const [loading, setLoading] = useState(true);
  const [matchedStartups, setMatchedStartups] = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null); // For modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const startupId = "675d8f1bdfaebd7bdfb533d2"; 
  const investorId = "675d8f1bdfaebd7bdfb533cc";

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ investor_id: investorId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("Response from NestJS in Milestones:", data);

        if (data.potential_startups) {
          setMatchedStartups(data.potential_startups);
        } else {
          toast.error("No matched startups found.");
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
        toast.error("Error fetching matched startups: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [investorId]);

  const openModal = (startup) => {
    setSelectedStartup(startup);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStartup(null);
  };

  if (loading) return <div className="text-center mt-20 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {/* Breadcrumb Link */}
      <div className="mb-6">
        <span className="text-sm text-gray-400">
          <NavLink
            to="/investor/dashboard"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Dashboard
          </NavLink>{" "}
          &gt; Milestones
        </span>
      </div>

      <h1 className="text-4xl font-extrabold text-white mb-10 text-center tracking-tight">
        Milestones
      </h1>

      {/* Matched Startups Section */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
        {/* <h2 className="text-2xl font-semibold mb-8 text-gray-100 flex items-center justify-center">
          <span className="mr-3 text-indigo-400">🤝</span> Matched Startups
        </h2> */}
        {matchedStartups.length === 0 ? (
          <p className="text-gray-400 text-center py-6 text-lg">
            No matched startups found yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {matchedStartups.map((startup) => (
              <div
                key={startup._id}
                className="relative bg-gray-850 p-6 rounded-lg shadow-md border border-gray-700 hover:shadow-xl hover:border-indigo-500 transition-all duration-300"
              >
                {/* Startup ID Badge */}
                <div className="mb-5">
                  <span className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                    ID: {startup._id.slice(0, 8)}...{startup._id.slice(-4)}
                  </span>
                </div>

                {/* Card Content */}
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-indigo-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    <p className="text-gray-200">
                      <span className="font-semibold text-indigo-300">Description:</span>{" "}
                      {startup.businessPlan?.description?.substring(0, 80) || "N/A"}
                      {startup.businessPlan?.description?.length > 80 && "..."}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-indigo-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    <p className="text-gray-200">
                      <span className="font-semibold text-indigo-300">Business Model:</span>{" "}
                      {startup.businessPlan?.businessModel?.substring(0, 80) || "N/A"}
                      {startup.businessPlan?.businessModel?.length > 80 && "..."}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-indigo-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    <p className="text-gray-200">
                      <span className="font-semibold text-indigo-300">Market Potential:</span>{" "}
                      {startup.businessPlan?.marketPotential?.substring(0, 80) || "N/A"}
                      {startup.businessPlan?.marketPotential?.length > 80 && "..."}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-indigo-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    <p className="text-gray-200">
                      <span className="font-semibold text-indigo-300">Financial Health:</span>{" "}
                      {startup.businessPlan?.financialHealth?.substring(0, 80) || "N/A"}
                      {startup.businessPlan?.financialHealth?.length > 80 && "..."}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block w-3 h-3 bg-indigo-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    <p className="text-gray-200">
                      <span className="font-semibold text-indigo-300">Team:</span>{" "}
                      {startup.teamBackground?.substring(0, 80) || "N/A"}
                      {startup.teamBackground?.length > 80 && "..."}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300 bg-indigo-900/50 px-3 py-1 rounded-lg">
                    Match: {(startup.similarity * 100).toFixed(2)}%
                  </span>
                  <button
                    onClick={() => openModal(startup)}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedStartup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Startup Details</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-200 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-6 text-gray-200">
              <div>
                <p className="text-sm font-semibold text-indigo-300">Startup ID:</p>
                <p className="text-lg bg-gray-700 p-3 rounded-lg mt-1">{selectedStartup._id}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-300">Description:</p>
                <p className="text-base bg-gray-700 p-3 rounded-lg mt-1">
                  {selectedStartup.businessPlan?.description || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-300">Business Model:</p>
                <p className="text-base bg-gray-700 p-3 rounded-lg mt-1">
                  {selectedStartup.businessPlan?.businessModel || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-300">Market Potential:</p>
                <p className="text-base bg-gray-700 p-3 rounded-lg mt-1">
                  {selectedStartup.businessPlan?.marketPotential || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-300">Financial Health:</p>
                <p className="text-base bg-gray-700 p-3 rounded-lg mt-1">
                  {selectedStartup.businessPlan?.financialHealth || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-300">Team:</p>
                <p className="text-base bg-gray-700 p-3 rounded-lg mt-1">
                  {selectedStartup.teamBackground || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-300">Similarity Score:</p>
                <p className="text-base bg-gray-700 p-3 rounded-lg mt-1">
                  {(selectedStartup.similarity * 100).toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Milestones;