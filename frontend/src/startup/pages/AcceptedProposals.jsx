import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../../partials/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AcceptedProposals() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProposals = () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please log in.");

        if (!userId) throw new Error("No startup ID provided in the URL.");

        console.log("Fetching accepted proposals for startupId:", userId);
        const storedProposals = JSON.parse(localStorage.getItem("proposals") || "[]");
        const filteredProposals = storedProposals.filter(
          (p) => p.startupId === userId && p.status === "accepted"
        );
        console.log("Filtered accepted proposals:", filteredProposals);
        setProposals(filteredProposals);
      } catch (error) {
        console.error("Error fetching accepted proposals:", error);
        toast.error(error.message || "Error fetching accepted proposals");
        if (error.message.includes("No startup ID")) navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchProposals();
  }, [userId, navigate]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-5xl mx-auto">
            <h1 className="text-3xl text-white font-bold mb-8 tracking-tight">
              Accepted Proposals
            </h1>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-400"></div>
              </div>
            ) : proposals.length === 0 ? (
              <div className="text-center py-12 bg-gray-800 rounded-lg shadow-lg">
                <p className="text-gray-400 text-lg font-medium">
                  No accepted proposals available.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                {proposals.map((proposal) => (
                  <div
                    key={proposal._id} // Unique key prop
                    className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-700/50"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-teal-300">
                          {proposal.startupName}
                        </h2>
                        <span className="px-3 py-1 text-sm rounded-full font-medium bg-teal-500/20 text-teal-300">
                          Accepted
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-sm">
                            <strong className="text-gray-200">Industry:</strong>{" "}
                            {proposal.industry}
                          </p>
                          <p className="text-gray-400 text-sm">
                            <strong className="text-gray-200">Investment:</strong> $
                            {proposal.investmentAmount.toLocaleString()}
                          </p>
                          <p className="text-gray-400 text-sm">
                            <strong className="text-gray-200">Equity:</strong>{" "}
                            {proposal.equityOffer}%
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">
                            <strong className="text-gray-200">Conditions:</strong>{" "}
                            {proposal.conditions || "N/A"}
                          </p>
                          <p className="text-gray-400 text-sm">
                            <strong className="text-gray-200">Milestones:</strong>{" "}
                            {proposal.milestones}
                          </p>
                          <p className="text-gray-400 text-sm">
                            <strong className="text-gray-200">Investor ID:</strong>{" "}
                            {proposal.investorId}
                          </p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-teal-700/50">
                        <p className="text-xs text-gray-500 italic">
                          Accepted on: {new Date(proposal.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AcceptedProposals;