import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../../partials/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SendProposal() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    startupName: "",
    industry: "",
    investmentAmount: "",
    equityOffer: "",
    deliverables: "",
    milestones: "",
  });
  const [proposals, setProposals] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "investmentAmount" || name === "equityOffer" ? Number(value) : value,
    });
  };

  useEffect(() => {
    // Load proposals from localStorage on mount
    const storedProposals = JSON.parse(localStorage.getItem("proposals") || "[]");
    setProposals(storedProposals);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No authentication token found. Please log in.");
      return;
    }

    try {
      const startupId = "67e38fecee533641c4f71bc4";
      const investorId = "675d8f1bdfaebd7bdfb533cc";
      const proposal = {
        ...formData,
        startupId,
        investorId,
        status: "pending",
        _id: `prop-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        createdAt: new Date().toISOString(),
      };

      const existingProposals = JSON.parse(localStorage.getItem("proposals") || "[]");
      existingProposals.push(proposal);
      localStorage.setItem("proposals", JSON.stringify(existingProposals));
      setProposals(existingProposals); // Update state to display new proposal

      // Startup notification
      const notifications = JSON.parse(localStorage.getItem(`notifications_${startupId}`) || "[]");
      notifications.push({
        userId: startupId,
        message: `New proposal received from Investor ${investorId} for ${formData.startupName}`,
        timestamp: new Date().toISOString(),
        read: false,
      });
      localStorage.setItem(`notifications_${startupId}`, JSON.stringify(notifications));

      // Investor notification
      const investorNotifications = JSON.parse(localStorage.getItem(`notifications_${investorId}`) || "[]");
      investorNotifications.push({
        userId: investorId,
        message: `Proposal sent to Startup ${formData.startupName}`,
        timestamp: new Date().toISOString(),
        read: false,
      });
      localStorage.setItem(`notifications_${investorId}`, JSON.stringify(investorNotifications));

      console.log("[SendProposal] Proposal stored:", proposal);
      console.log("[SendProposal] All proposals in localStorage:", JSON.parse(localStorage.getItem("proposals")));
      console.log("[SendProposal] Investor notifications:", investorNotifications);
      toast.success("Proposal sent successfully!");
      setIsModalOpen(false);
      setFormData({
        startupName: "",
        industry: "",
        investmentAmount: "",
        equityOffer: "",
        deliverables: "",
        milestones: "",
      });
    } catch (error) {
      console.error("[SendProposal] Error:", error.message);
      toast.error(`Error sending proposal: ${error.message}`);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-5xl mx-auto">
            <h1 className="text-3xl text-white font-bold mb-6">Send Proposals</h1>
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 mb-8"
              onClick={() => setIsModalOpen(true)}
            >
              Create New Proposal
            </button>

            <div className="mt-8">
              <h2 className="text-2xl text-white font-semibold mb-4">Sent Proposals</h2>
              {proposals.length === 0 ? (
                <p className="text-gray-400">No proposals sent yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {proposals.map((proposal) => (
                    <div
                      key={proposal._id}
                      className="bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-indigo-500 hover:bg-gray-700 transition-colors duration-200"
                    >
                      <h3 className="text-xl font-bold text-white mb-2">{proposal.startupName}</h3>
                      <p className="text-gray-300">
                        <strong>Industry:</strong> {proposal.industry}
                      </p>
                      <p className="text-gray-300">
                        <strong>Investment Amount:</strong> ${proposal.investmentAmount.toLocaleString()}
                      </p>
                      <p className="text-gray-300">
                        <strong>Equity Offer:</strong> {proposal.equityOffer}%
                      </p>
                      <p className="text-gray-300">
                        <strong>Deliverables:</strong> {proposal.deliverables}
                      </p>
                      <p className="text-gray-300">
                        <strong>Milestones:</strong> {proposal.milestones}
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        <strong>Sent:</strong> {new Date(proposal.createdAt).toLocaleString()}
                      </p>
                      <p className="text-gray-400 text-sm">
                        <strong>Status:</strong> {proposal.status}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex justify-center items-center">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 w-full max-w-3xl shadow-2xl border border-gray-700 transform transition-all duration-300">
                  <h2 className="text-2xl font-bold text-indigo-400 mb-6">Send Proposal</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-300 font-semibold text-sm mb-2">Startup Name</label>
                        <input
                          type="text"
                          name="startupName"
                          value={formData.startupName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
                          placeholder="Enter Startup Name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold text-sm mb-2">Industry</label>
                        <input
                          type="text"
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
                          placeholder="e.g., Tech, Healthcare"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-300 font-semibold text-sm mb-2">Investment Amount (USD)</label>
                        <input
                          type="number"
                          name="investmentAmount"
                          value={formData.investmentAmount}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
                          placeholder="e.g., 50000"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold text-sm mb-2">Equity Offer (%)</label>
                        <input
                          type="number"
                          name="equityOffer"
                          value={formData.equityOffer}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
                          placeholder="e.g., 10"
                          required
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-gray-300 font-semibold text-sm mb-2">Deliverables</label>
                        <textarea
                          name="deliverables"
                          value={formData.deliverables}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 resize-none"
                          rows={3}
                          placeholder="e.g., Build MVP, Launch Beta"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold text-sm mb-2">Milestones and Timeline</label>
                        <textarea
                          name="milestones"
                          value={formData.milestones}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 resize-none"
                          rows={3}
                          placeholder="e.g., 6 months for MVP, 12 months for launch"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-5 py-2 rounded-lg shadow-md hover:from-gray-600 hover:to-gray-700 transition-all duration-200"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200"
                      >
                        Submit Proposal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SendProposal;