import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../../partials/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Proposals() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProposals = () => {
      try {
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
        if (!userId) {
          throw new Error("No startup ID provided in the URL.");
        }

        console.log("Fetching proposals for startupId:", userId);
        const storedProposals = JSON.parse(localStorage.getItem("proposals") || "[]");
        console.log("All stored proposals:", storedProposals);
        const filteredProposals = storedProposals.filter(
          (p) => p.startupId === userId && p.status === "pending"
        );
        console.log("Filtered local proposals:", filteredProposals);
        setProposals(filteredProposals);
      } catch (error) {
        console.error("Error fetching proposals:", error);
        toast.error(error.message || "Error fetching proposals");
        if (error.message.includes("No startup ID")) {
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProposals();
  }, [userId, navigate, token]);

  const addNotification = (userId, message) => {
    const notifications = JSON.parse(localStorage.getItem(`notifications_${userId}`)) || [];
    notifications.push({ message, timestamp: new Date().toISOString(), read: false });
    localStorage.setItem(`notifications_${userId}`, JSON.stringify(notifications));
  };

  const handleAction = (proposalId, action) => {
    try {
      const storedProposals = JSON.parse(localStorage.getItem("proposals") || "[]");
      const updatedProposals = storedProposals.map((p) =>
        p._id === proposalId ? { ...p, status: action } : p
      );
      localStorage.setItem("proposals", JSON.stringify(updatedProposals));
      setProposals(proposals.filter((p) => p._id !== proposalId));
      const updatedProposal = updatedProposals.find((p) => p._id === proposalId);
      console.log(`Proposal ${action}:`, updatedProposal);
      toast.success(`Proposal ${action} successfully!`);

      // Add notification to investor via localStorage
      addNotification(
        updatedProposal.investorId,
        `Your proposal to ${updatedProposal.startupName} has been ${action}`
      );

      if (action === "accepted") {
        navigate(`/startup/accepted-proposals/${userId}`);
      }
    } catch (error) {
      console.error(`Error ${action}ing proposal:`, error);
      toast.error(`Error ${action}ing proposal`);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-5xl mx-auto">
            <h1 className="text-3xl text-white font-bold mb-8 tracking-tight">
              Received Proposals
            </h1>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-400"></div>
              </div>
            ) : proposals.length === 0 ? (
              <div className="text-center py-12 bg-gray-800 rounded-lg shadow-lg">
                <p className="text-gray-400 text-lg font-medium">
                  No pending proposals available.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                {proposals.map((proposal) => (
                  <div
                    key={proposal._id}
                    className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-indigo-300">
                          {proposal.startupName}
                        </h2>
                        <span
                          className={`px-3 py-1 text-sm rounded-full font-medium ${
                            proposal.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-gray-500/20 text-gray-300"
                          }`}
                        >
                          {proposal.status}
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
                      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
                        <button
                          onClick={() => handleAction(proposal._id, "accepted")}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleAction(proposal._id, "rejected")}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                        >
                          Reject
                        </button>
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

export default Proposals;