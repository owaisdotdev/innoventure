import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/startup/Layout/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActiveProject = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const startupId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                if (!token) {
                    throw new Error("No token found. Please log in.");
                }
                if (!startupId) {
                    throw new Error("No startup ID provided.");
                }

                const response = await fetch(
                    `http://localhost:3000/proposals/startup/${startupId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch proposals");
                }

                const allProposals = await response.json();

                // Filter for only 'active' proposals
                const activeProposals = allProposals.filter(
                    (proposal) => proposal.status === "accepted"
                );

                setProposals(activeProposals);
            } catch (error) {
                console.error("Error fetching active proposals:", error);
                toast.error("Failed to load active proposals");
            } finally {
                setLoading(false);
            }
        };

        fetchProposals();
    }, [startupId, navigate, token]);

    const addNotification = (userId, message) => {
        const notifications = JSON.parse(
            localStorage.getItem(`notifications_${userId}`) || "[]"
        );
        notifications.push({
            message,
            timestamp: new Date().toISOString(),
            read: false,
        });
        localStorage.setItem(
            `notifications_${userId}`,
            JSON.stringify(notifications)
        );
    };

    const handleAction = (proposalId, action) => {
        try {
            const storedProposals = JSON.parse(
                localStorage.getItem("proposals") || "[]"
            );
            const updatedProposals = storedProposals.map((p) =>
                p._id === proposalId
                    ? {
                          ...p,
                          status: action,
                          updatedAt: new Date().toISOString(),
                      }
                    : p
            );
            localStorage.setItem("proposals", JSON.stringify(updatedProposals));

            setProposals((prev) => prev.filter((p) => p._id !== proposalId));
            const updatedProposal = updatedProposals.find(
                (p) => p._id === proposalId
            );
            console.log(`Proposal ${action}:`, updatedProposal);
            toast.success(`Proposal ${action} successfully!`);

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
        <Layout>
            <div className="flex h-screen overflow-hidden bg-gray-900">
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    <main className="grow">
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-5xl mx-auto">
                            <h1 className="text-3xl text-white font-bold mb-8 tracking-tight">
                                Active Projects
                            </h1>

                            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-600">
                                {loading ? (
                                    <div className="flex justify-center items-center h-64">
                                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-400"></div>
                                    </div>
                                ) : proposals.length === 0 ? (
                                    <div className="text-center py-12 bg-gray-700 rounded-lg">
                                        <p className="text-gray-400 text-lg font-medium">
                                            No pending proposals available.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                                        {proposals.map((proposal) => (
                                            <div
                                                key={proposal._id}
                                                onClick={() => navigate(`/startup/active-projects/${proposal._id}`)}
                                                className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700"
                                            >
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center">
                                                        <h2 className="text-xl font-semibold text-indigo-300">
                                                            {
                                                                proposal
                                                                    .startupId
                                                                    .name
                                                            }
                                                        </h2>
                                                        <span
                                                            className={`px-3 py-1 text-sm rounded-full font-medium ${
                                                                proposal.status ===
                                                                "pending"
                                                                    ? "bg-yellow-500/20 text-yellow-300"
                                                                    : proposal.status ===
                                                                      "accepted"
                                                                    ? "bg-green-500/20 text-green-300"
                                                                    : "bg-red-500/20 text-red-300"
                                                            }`}
                                                        >
                                                            {proposal.status}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                        <p className="text-gray-400 text-sm">
                                                                <strong className="text-gray-200">
                                                                    Startup
                                                                    Name:
                                                                </strong>{" "}
                                                                {
                                                                    proposal
                                                                        .startupId
                                                                        .name
                                                                }
                                                            </p>
                                                            <p className="text-gray-400 text-sm">
                                                                <strong className="text-gray-200">
                                                                    Startup
                                                                    Email:
                                                                </strong>{" "}
                                                                {
                                                                    proposal
                                                                        .startupId
                                                                        .email
                                                                }
                                                            </p>
                                                            <p className="text-gray-400 text-sm">
                                                                <strong className="text-gray-200">
                                                                    Industry:
                                                                </strong>{" "}
                                                                {proposal
                                                                    .startupId
                                                                    .businessPlan
                                                                    ?.industry ||
                                                                    "N/A"}
                                                            </p>
                                                            <p className="text-gray-400 text-sm">
                                                                <strong className="text-gray-200">
                                                                    Funding
                                                                    Required:
                                                                </strong>{" "}
                                                                $
                                                                {proposal.fundingRequired?.toLocaleString()}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-400 text-sm">
                                                                <strong className="text-gray-200">
                                                                    Investor
                                                                    Name:
                                                                </strong>{" "}
                                                                {
                                                                    proposal
                                                                        .investorId
                                                                        .name
                                                                }
                                                            </p>
                                                            <p className="text-gray-400 text-sm">
                                                                <strong className="text-gray-200">
                                                                    Investor
                                                                    Email:
                                                                </strong>{" "}
                                                                {
                                                                    proposal
                                                                        .investorId
                                                                        .email
                                                                }
                                                            </p>
                                                            <p className="text-gray-400 text-sm">
                                                                <strong className="text-gray-200">
                                                                    Sent By:
                                                                </strong>{" "}
                                                                {
                                                                    proposal.sentBy
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4">
                                                        <p className="text-gray-300">
                                                            <strong className="text-indigo-400">
                                                                Title:
                                                            </strong>{" "}
                                                            {proposal.title}
                                                        </p>
                                                        <p className="text-gray-400 mt-1">
                                                            <strong className="text-gray-200">
                                                                Message:
                                                            </strong>{" "}
                                                            {proposal.message}
                                                        </p>
                                                        <p className="text-gray-400 mt-1">
                                                            <strong className="text-gray-200">
                                                                Description:
                                                            </strong>{" "}
                                                            {
                                                                proposal.description
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
                <ToastContainer />
            </div>
        </Layout>
    );
};

export default ActiveProject;
