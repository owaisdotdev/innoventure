import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/startup/Layout/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllOffers = () => {
  const [offers, setOffers] = useState([]);
  const [expandedOfferId, setExpandedOfferId] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No token found. Please log in.");
          navigate("/login");
          return;
        }
        if (!userId) {
          toast.error("No startup ID provided.");
          navigate("/");
          return;
        }

        console.log("Fetching offers for startupId:", userId);
        const storedOffers = JSON.parse(localStorage.getItem("offers") || "[]");
        const filteredOffers = storedOffers.filter((o) => o.userId === userId);
        console.log("Filtered offers:", filteredOffers);
        setOffers(filteredOffers);
      } catch (error) {
        console.error("Error fetching offers:", error);
        toast.error(error.message || "Error fetching offers");
      }
    };
    fetchOffers();
  }, [userId, navigate]);

  const addNotification = (investorId, message) => {
    const notifications = JSON.parse(localStorage.getItem(`notifications_${investorId}`) || "[]");
    notifications.push({
      message,
      timestamp: new Date().toISOString(),
      read: false,
    });
    localStorage.setItem(`notifications_${investorId}`, JSON.stringify(notifications));
  };

  const handleAction = (offerId, action) => {
    try {
      const storedOffers = JSON.parse(localStorage.getItem("offers") || "[]");
      const updatedOffers = storedOffers.map((o) =>
        o.offerId === offerId
          ? { ...o, status: action, updatedAt: new Date().toISOString() }
          : o
      );
      localStorage.setItem("offers", JSON.stringify(updatedOffers));
      setOffers(updatedOffers.filter((o) => o.userId === userId));

      const updatedOffer = updatedOffers.find((o) => o.offerId === offerId);
      console.log(`Offer ${action}:`, updatedOffer);
      toast.success(`Offer ${action} successfully!`);

      addNotification(
        updatedOffer.investorId,
        `Your offer "${updatedOffer.offerTitle}" has been ${action} by startup ID ${userId}`
      );
    } catch (error) {
      console.error(`Error ${action}ing offer:`, error);
      toast.error(`Error ${action}ing offer`);
    }
  };

  const toggleDetails = (offerId) => {
    setExpandedOfferId(expandedOfferId === offerId ? null : offerId);
  };

  return (
    <Layout>
      <div className="flex h-screen overflow-hidden bg-gray-900">
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <main className="grow">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-5xl mx-auto">
              <h1 className="text-3xl text-white font-bold mb-8 tracking-tight">
                Investment Offers
              </h1>
              {userId && (
                <p className="text-gray-400 mb-6">Startup ID: {userId}</p>
              )}
              {offers.length === 0 ? (
                <div className="text-center py-12 bg-gray-800 rounded-lg shadow-lg">
                  <p className="text-gray-400 text-lg font-medium">
                    No offers available.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                  {offers.map((offer) => (
                    <div
                      key={offer.offerId}
                      className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-700/50"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h2 className="text-xl font-semibold text-teal-300">
                            {offer.offerTitle}
                          </h2>
                          <span
                            className={`px-3 py-1 text-sm rounded-full font-medium ${
                              offer.status === "accepted"
                                ? "bg-green-500/20 text-green-300"
                                : offer.status === "rejected"
                                ? "bg-red-500/20 text-red-300"
                                : "bg-yellow-500/20 text-yellow-300"
                            }`}
                          >
                            {offer.status || "pending"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-400 text-sm">
                              <strong className="text-gray-200">Amount:</strong>{" "}
                              ${offer.amount.toLocaleString()}
                            </p>
                            <p className="text-gray-400 text-sm">
                              <strong className="text-gray-200">Investor ID:</strong>{" "}
                              {offer.investorId}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">
                              <strong className="text-gray-200">Sent:</strong>{" "}
                              {new Date(offer.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-gray-400 text-sm">
                              <strong className="text-gray-200">Proposal ID:</strong>{" "}
                              {offer.proposalId}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleDetails(offer.offerId)}
                          className="w-full text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors duration-200"
                        >
                          {expandedOfferId === offer.offerId ? "Hide Details" : "Show Details"}
                        </button>
                        {expandedOfferId === offer.offerId && (
                          <div className="mt-4 p-4 bg-gray-700 rounded-lg space-y-2">
                            <p className="text-gray-400 text-sm">
                              <strong className="text-gray-200">Terms:</strong>{" "}
                              {offer.terms}
                            </p>
                            <p className="text-gray-400 text-sm">
                              <strong className="text-gray-200">Deadline:</strong>{" "}
                              {new Date(offer.deadline).toLocaleDateString()}
                            </p>
                            {offer.status !== "pending" && (
                              <p className="text-gray-400 text-sm">
                                <strong className="text-gray-200">Updated:</strong>{" "}
                                {new Date(offer.updatedAt).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        )}
                        <div className="flex justify-end space-x-4 pt-4 border-t border-teal-700/50">
                          <button
                            onClick={() => handleAction(offer.offerId, "accepted")}
                            className={`px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200 ${
                              offer.status !== "pending"
                                ? "bg-green-800 opacity-50 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                            disabled={offer.status !== "pending"}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleAction(offer.offerId, "rejected")}
                            className={`px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200 ${
                              offer.status !== "pending"
                                ? "bg-red-800 opacity-50 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-700"
                            }`}
                            disabled={offer.status !== "pending"}
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
    </Layout>
  );
};

export default AllOffers;