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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProposalId, setSelectedProposalId] = useState(null);
  const [offerFormData, setOfferFormData] = useState({
    offerTitle: "",
    amount: "",
    terms: "",
    deadline: "",
  });
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

  const handleOfferChange = (e) => {
    const { name, value } = e.target;
    setOfferFormData({
      ...offerFormData,
      [name]: name === "amount" ? Number(value) : value,
    });
  };

  const addNotification = (investorId, message) => {
    const notifications = JSON.parse(localStorage.getItem(`notifications_${investorId}`) || "[]");
    notifications.push({
      message,
      timestamp: new Date().toISOString(),
      read: false,
    });
    localStorage.setItem(`notifications_${investorId}`, JSON.stringify(notifications));
  };

  const handleOfferSubmit = (e) => {
    e.preventDefault();
    try {
      const selectedProposal = proposals.find((p) => p._id === selectedProposalId);
      if (!selectedProposal) throw new Error("Selected proposal not found.");

      const offer = {
        offerId: `offer-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        proposalId: selectedProposalId,
        userId,
        investorId: selectedProposal.investorId,
        ...offerFormData,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      const storedOffers = JSON.parse(localStorage.getItem("offers") || "[]");
      storedOffers.push(offer);
      localStorage.setItem("offers", JSON.stringify(storedOffers));

      console.log("Offer stored:", offer);
      toast.success("Offer sent successfully!");

      addNotification(
        offer.investorId,
        `New offer received: "${offer.offerTitle}" from startup ID ${userId}`
      );

      setIsModalOpen(false);
      setOfferFormData({
        offerTitle: "",
        amount: "",
        terms: "",
        deadline: "",
      });
      console.log("Navigating to:", `/startup/all-offers/${userId}`);
      navigate(`/startup/all-offers/${userId}`);
    } catch (error) {
      console.error("Error sending offer:", error);
      toast.error(error.message || "Error sending offer");
    }
  };

  const openOfferModal = (proposalId) => {
    setSelectedProposalId(proposalId);
    setIsModalOpen(true);
  };

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
                    key={proposal._id}
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
                            <strong className="text-gray-200">Deliverables:</strong>{" "}
                            {proposal.deliverables || "N/A"}
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
                      <div className="pt-4 border-t border-teal-700/50 flex justify-between items-center">
                        <p className="text-xs text-gray-500 italic">
                          Accepted on: {new Date(proposal.updatedAt || proposal.createdAt).toLocaleDateString()}
                        </p>
                        <button
                          onClick={() => openOfferModal(proposal._id)}
                          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200 font-medium"
                        >
                          Send Offer
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex justify-center items-center">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 w-full max-w-3xl shadow-2xl border border-teal-700/50 transform transition-all duration-300">
            <h2 className="text-2xl font-bold text-teal-300 mb-6">Send Offer</h2>
            <form onSubmit={handleOfferSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-semibold text-sm mb-2">Offer Title</label>
                  <input
                    type="text"
                    name="offerTitle"
                    value={offerFormData.offerTitle}
                    onChange={handleOfferChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
                    placeholder="e.g., Funding Offer"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold text-sm mb-2">Amount (USD)</label>
                  <input
                    type="number"
                    name="amount"
                    value={offerFormData.amount}
                    onChange={handleOfferChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
                    placeholder="e.g., 50000"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-gray-300 font-semibold text-sm mb-2">Terms</label>
                  <textarea
                    name="terms"
                    value={offerFormData.terms}
                    onChange={handleOfferChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 resize-none"
                    rows={4}
                    placeholder="e.g., 10% equity for MVP development"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold text-sm mb-2">Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={offerFormData.deadline}
                    onChange={handleOfferChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition-all duration-200"
                >
                  Submit Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default AcceptedProposals;