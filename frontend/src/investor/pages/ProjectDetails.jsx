import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";

const ProjectDetails = () => {
    const { id } = useParams();
    const [proposal, setProposal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [milestoneForm, setMilestoneForm] = useState({
        milestoneId: "",
        title: "",
        description: "",
        budgetSpent: "",
        completionDate: "",
        file: null,
    });
    const [milestoneFunded, setMilestoneFunded] = useState(false);
    const [funding, setFunding] = useState(false);

    useEffect(() => {
        const fetchProposal = async () => {
            const userId = localStorage.getItem("user");
            if (!userId) {
                setLoading(false);
                return;
            }
            try {
                const res = await fetch(
                    `http://localhost:3000/proposals/investor/${userId}`
                );
                const data = await res.json();
                const proposalById = data.find((p) => p._id === id);
                setProposal(proposalById);
            } catch (err) {
                console.error("Error fetching proposal:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProposal();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMilestoneForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            setMilestoneForm((prev) => ({ ...prev, file: e.target.files[0] }));
        }
    };

    const submitMilestone = async () => {
        const formData = new FormData();
        Object.entries(milestoneForm).forEach(([key, value]) => {
            if (key !== "file") formData.append(key, value);
        });
        if (milestoneForm.file) formData.append("file", milestoneForm.file);

        formData.append("startupId", proposal?.startupId?._id);

        try {
            const res = await fetch("http://localhost:3000/milestones/submit", {
                method: "POST",
                body: formData,
            });

            const result = await res.json();
            console.log("Milestone submitted:", result);
            alert("Milestone submitted successfully");
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error submitting milestone:", error);
            alert("Failed to submit milestone");
        }
    };

    const fundMilestone = async () => {
        setFunding(true);
        try {
            // Replace this with actual Web3 or Ethers.js logic to interact with the smart contract
            console.log("Calling smart contract to fund milestone...");

            // Simulate contract call delay
            await new Promise((resolve) => setTimeout(resolve, 3000));

            // Set as funded
            setMilestoneFunded(true);
            alert("Milestone funded successfully.");
        } catch (error) {
            console.error("Funding failed:", error);
            alert("Funding the milestone failed.");
        } finally {
            setFunding(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
            <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h1 className="text-3xl font-bold mb-4 text-indigo-300">
                    {proposal?.title}
                </h1>
                <p className="text-gray-400 mb-4">{proposal?.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                    <div>
                        <p>
                            <strong className="text-gray-200">
                                Startup Name:
                            </strong>{" "}
                            {proposal?.startupId?.name}
                        </p>
                        <p>
                            <strong className="text-gray-200">Email:</strong>{" "}
                            {proposal?.startupId?.email}
                        </p>
                        <p>
                            <strong className="text-gray-200">Industry:</strong>{" "}
                            {proposal?.startupId?.businessPlan?.industry}
                        </p>
                    </div>
                    <div>
                        <p>
                            <strong className="text-gray-200">Investor:</strong>{" "}
                            {proposal?.investorId?.name}
                        </p>
                        <p>
                            <strong className="text-gray-200">
                                Investor Email:
                            </strong>{" "}
                            {proposal?.investorId?.email}
                        </p>
                        <p>
                            <strong className="text-gray-200">
                                Funding Required:
                            </strong>{" "}
                            ${proposal?.fundingRequired?.toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-gray-300">
                    <p>
                        <strong className="text-gray-200">Message:</strong>{" "}
                        {proposal?.message}
                    </p>
                    <p>
                        <strong className="text-gray-200">Status:</strong>{" "}
                        {proposal?.status}
                    </p>
                    <p>
                        <strong className="text-gray-200">Sent By:</strong>{" "}
                        {proposal?.sentBy}
                    </p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-8 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium"
                >
                    Create Milestone
                </button>
            </div>

            {/* Milestone Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="max-w-xl mx-auto mt-20 p-6 bg-gray-800 rounded-lg border border-gray-700 outline-none"
                overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center"
            >
                <h2 className="text-xl font-semibold mb-4 text-indigo-300">
                    Create Milestone
                </h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={milestoneForm.title}
                    onChange={handleInputChange}
                    className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={milestoneForm.description}
                    onChange={handleInputChange}
                    className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"
                />
                <input
                    type="number"
                    name="budgetSpent"
                    placeholder="Budget"
                    value={milestoneForm.budgetSpent}
                    onChange={handleInputChange}
                    className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"
                />
                <label>Completion Date</label>
                <input
                    type="date"
                    name="completionDate"
                    value={milestoneForm.completionDate}
                    onChange={handleInputChange}
                    className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"
                />
                <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    className="w-full mb-3 px-3 py-2 text-white"
                />
                <div className="flex justify-between items-center space-x-4 mt-4">
                    {!milestoneFunded ? (
                        <button
                            onClick={fundMilestone}
                            disabled={funding}
                            className={`px-4 py-2 rounded ${
                                funding
                                    ? "bg-gray-500"
                                    : "bg-green-600 hover:bg-green-700"
                            }`}
                        >
                            {funding ? "Funding..." : "Fund Milestone"}
                        </button>
                    ) : (
                        <button
                            onClick={submitMilestone}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded"
                        >
                            Submit Milestone
                        </button>
                    )}

                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ProjectDetails;
