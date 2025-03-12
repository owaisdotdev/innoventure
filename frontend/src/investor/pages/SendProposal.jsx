import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../../partials/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";

const BASE_URL = "http://localhost:3000"; // Change to "https://innoventure-api.vercel.app" after local testing
const socket = io("http://localhost:8000", {
  autoConnect: false,
  transports: ["websocket"],
});

function SendProposal() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    startupId: "67c4ecfc55d098ab278540de",
    startupName: "",
    industry: "",
    investmentAmount: "",
    equityOffer: "",
    deliverables: "",
    milestones: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "investmentAmount" || name === "equityOffer" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No authentication token found. Please log in.");
      return;
    }

    try {
      const investorId = "67bf29890c2f666e54f3968f";
      const proposal = {
        ...formData,
        investorId,
        status: "pending",
        _id: `prop-${Date.now()}`,
      };

      const existingProposals = JSON.parse(localStorage.getItem("proposals") || "[]");
      existingProposals.push(proposal);
      localStorage.setItem("proposals", JSON.stringify(existingProposals));

      const startupNotifResponse = await fetch(`${BASE_URL}/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: formData.startupId,
          message: `New proposal received from Investor ${investorId} for ${formData.startupName}`,
        }),
      });
      if (!startupNotifResponse.ok) {
        const errorText = await startupNotifResponse.text();
        throw new Error(`Failed to send startup notification: ${startupNotifResponse.status} - ${errorText}`);
      }
      console.log("[SendProposal] Startup notification sent:", await startupNotifResponse.json());

      const investorNotifResponse = await fetch(`${BASE_URL}/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: investorId,
          message: `Proposal sent to Startup ${formData.startupName}`,
        }),
      });
      if (!investorNotifResponse.ok) {
        const errorText = await investorNotifResponse.text();
        throw new Error(`Failed to send investor notification: ${investorNotifResponse.status} - ${errorText}`);
      }
      console.log("[SendProposal] Investor notification sent:", await investorNotifResponse.json());

      socket.auth = { userId: investorId };
      socket.connect();
      const chatMessage = {
        senderId: investorId,
        recipientId: formData.startupId,
        content: `Proposal: Investment $${formData.investmentAmount}, Equity ${formData.equityOffer}%, Deliverables: ${formData.deliverables}, Milestones: ${formData.milestones}`,
        createdAt: new Date().toISOString(),
      };
      socket.emit("sendMessage", chatMessage);
      console.log("[SendProposal] Chat message sent:", chatMessage);
      socket.disconnect();

      console.log("[SendProposal] Proposal stored locally:", proposal);
      toast.success("Proposal sent successfully!");
      setIsModalOpen(false);
      setFormData({
        startupId: "67c4ecfc55d098ab278540de",
        startupName: "",
        industry: "",
        investmentAmount: "",
        equityOffer: "",
        deliverables: "",
        milestones: "",
      });
    } catch (error) {
      console.error("[SendProposal] Error sending proposal:", error.message);
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
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
              onClick={() => setIsModalOpen(true)}
            >
              Create New Proposal
            </button>

            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex justify-center items-center">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 w-full max-w-3xl shadow-2xl border border-gray-700 transform transition-all duration-300">
                  <h2 className="text-2xl font-bold text-indigo-400 mb-6">Send Proposal</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-300 font-semibold text-sm mb-2">Startup ID</label>
                        <input
                          type="text"
                          name="startupId"
                          value={formData.startupId}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
                          placeholder="Enter Startup ID"
                          required
                        />
                      </div>
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
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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