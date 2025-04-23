import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../../partials/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Proposals() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const token = localStorage.getItem("token");
        const startupId = localStorage.getItem("userId");

        const response = await fetch(
          `http://localhost:3000/proposals/startup/${startupId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch proposals");
        }

        const data = await response.json();
        setProposals(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProposal();
  }, []);

  const handleAccept = (id) => {
    toast.success(`Accepted proposal ${id}`);
    // TODO: Call backend to accept proposal
  };

  const handleReject = (id) => {
    toast.error(`Rejected proposal ${id}`);
    // TODO: Call backend to reject proposal
  };

  const sentByMe = proposals.filter((p) => p.sentBy === "startup");
  const received = proposals.filter((p) => p.sentBy === "investor");

  const renderProposalCard = (proposal, showActions = false) => (
    <div
      key={proposal._id}
      className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-105"
    >
      <div className="p-6">
        <div className="font-bold text-xl text-blue-600 mb-2">{proposal.title}</div>
        <p className="text-gray-700 text-sm mb-4">{proposal.message}</p>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Investment:</strong> ${proposal.investmentAmount}</p>
          <p><strong>Status:</strong> {proposal.status}</p>
          <p><strong>Industry:</strong> {proposal.industry || "Not provided"}</p>
          <p><strong>Attachment:</strong> {proposal.attachment}</p>
        </div>
        {showActions && (
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => handleAccept(proposal._id)}
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
            >
              Accept
            </button>
            <button
              onClick={() => handleReject(proposal._id)}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow p-6 space-y-10">
          {loading ? (
            <div className="text-center text-white">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">Error: {error}</div>
          ) : (
            <>
              <section>
                <h2 className="text-2xl text-white mb-4">Sent by You (Investor)</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {sentByMe.length > 0 ? (
                    sentByMe.map((p) => renderProposalCard(p))
                  ) : (
                    <p className="text-white">No proposals sent by you.</p>
                  )}
                </div>
              </section>

              <section>
                <h2 className="text-2xl text-white mb-4">Received from Investors</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {received.length > 0 ? (
                    received.map((p) => renderProposalCard(p, true))
                  ) : (
                    <p className="text-white">No proposals received.</p>
                  )}
                </div>
              </section>
            </>
          )}
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Proposals;
