import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import {
    FaUsers,
    FaEnvelope,
    FaBriefcase,
    FaMoneyBillWave,
    FaPaperPlane,
    FaPlus,
    FaCalendarAlt,
    FaFileUpload,
    FaCheckCircle,
    FaTimes,
} from "react-icons/fa";
import Layout from "./Layout";
import { ethers } from "ethers";
import { ABI } from "../../abi.js";

const ProjectDetails = () => {
    const { id } = useParams();
    const [proposal, setProposal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startupDetails, setStartupDetails] = useState();
    const [investorDetails, setInvestorDetails] = useState();
    const [investment, setInvestment] = useState(null);
    const [milestones, setMilestones] = useState([]);

    const [milestoneForm, setMilestoneForm] = useState({
        milestoneId: "",
        title: "",
        description: "",
        amount: "",
        completionDate: "",
        file: null,
    });

    useEffect(() => {
        fetchInvestmentDetails(0); 
      }, []);
  
      const fetchInvestmentDetails = async (investmentId) => {
          try {
              const provider = new ethers.BrowserProvider(window.ethereum);
              const signer = await provider.getSigner();
  
              const contract = new ethers.Contract(
                  "0x261CA8476C227202b752fa3399e506424408af15",
                  ABI,
                  signer
              );
  
              // Fetch investment details
              const inv = await contract.getInvestment(investmentId);
              const milestoneCount = Number(inv[7]); // index 7 is milestoneCount
  console.log(inv)
              // Fetch each milestone
              setInvestment({
                investor: inv[0],
                startup: inv[1],
                totalAmount: inv[2].toString(),
                deadline: new Date(Number(inv[5]) * 1000).toLocaleString(),
                state: inv[6],
                milestoneCount: Number(inv[7])
              });
              
              const milestonesArray = [];
              for (let i = 0; i < Number(inv[7]); i++) {
                const m = await contract.getMilestone(investmentId, i);
                console.log(m);
                milestonesArray.push({
                  title: m[0],
                  description: m[1],
                  amount: m[2].toString(),
                  approved: m[3],
                  deadline: new Date(Number(m[4]) * 1000).toLocaleString(),
                  ipfsHash: m[5],
                  state: m[6]
                });
              }                       
  
              setMilestones(milestonesArray);
          } catch (error) {
              console.error("Error fetching investment and milestones:", error);
          }
      };

    useEffect(() => {
        const fetchData = async () => {
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

                // Fetch Startup Details
                if (proposalById?.startupId?._id) {
                    const startupRes = await fetch(
                        `http://localhost:3000/startups/${proposalById.startupId._id}`
                    );
                    const startupData = await startupRes.json();
                    setStartupDetails(startupData);
                }

                // Fetch Investor Details
                if (proposalById?.investorId?._id) {
                    const investorRes = await fetch(
                        `http://localhost:3000/investors/${proposalById.investorId._id}`
                    );
                    const investorData = await investorRes.json();
                    setInvestorDetails(investorData);
                }
            } catch (err) {
                console.error("Error fetching proposal or details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
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
        if (!milestoneForm.file) {
            alert("No file selected");
            return;
        }

        const pinataApiKey = "21780ea40c3777501825";
        const pinataSecretApiKey =
            "035da19b1e31d31ee41e578c48b3b4d104a1cdf76817ddd53648258c57afe731";

        const fileData = new FormData();
        fileData.append("file", milestoneForm.file);

        try {
            //   const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            //       method: "POST",
            //       body: fileData,
            //       headers: {
            //           pinata_api_key: pinataApiKey,
            //           pinata_secret_api_key: pinataSecretApiKey
            //       }
            //   });

            //   const result = await res.json();
            //   const ipfsHash = result.IpfsHash;
            const ipfsHash = "QmWyodjJwhTRTr2tPQmifKnDMLB8d3WaorQ5LjEwRJ79ko";
            console.log("IPFS File Hash:", ipfsHash);

            // Connect to wallet
            if (!window.ethereum) throw new Error("MetaMask not found");
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const escrowContract = new ethers.Contract(
                "0x261CA8476C227202b752fa3399e506424408af15",
                ABI,
                signer
            );

            const investmentId = 0;
            const amount = ethers.parseUnits(milestoneForm.amount, 6); // Adjust decimals if needed
            const deadline = Math.floor(
                new Date(milestoneForm.completionDate).getTime() / 1000
            );
            const title = milestoneForm.title;
            const description = milestoneForm.description;

            const usdcContract = new ethers.Contract(
                "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
                [
                    "function approve(address spender, uint256 value) public returns (bool)",
                ],
                signer
            );

            const tx1 = await usdcContract.approve(
                "0x261CA8476C227202b752fa3399e506424408af15", // your escrow contract address
                amount
            );

            await tx1.wait();

            const tx = await escrowContract.addMilestone(
                investmentId,
                title,
                description,
                amount,
                deadline,
                ipfsHash
            );

            await tx.wait();

            alert("Milestone submitted successfully!");
        } catch (error) {
            console.error("Milestone submission failed:", error);
            alert("Error submitting milestone");
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return "bg-green-500";
            case "pending":
                return "bg-yellow-500";
            case "rejected":
                return "bg-red-500";
            default:
                return "bg-blue-500";
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 text-white px-4 py-8 md:px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">
                            {proposal?.title || "Funding Proposal"}
                        </h1>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-500/30">
                            <span
                                className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(
                                    proposal?.status
                                )}`}
                            ></span>
                            <span className="text-indigo-200">
                                {proposal?.status || "Status"}
                            </span>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid gap-8 md:grid-cols-3">
                        {/* Left Column - Startup Info */}
                        <div className="md:col-span-1">
                            <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-xl h-full">
                                <div className="flex items-center mb-6">
                                    <div className="bg-indigo-600 p-3 rounded-xl shadow-lg">
                                        <FaUsers
                                            size={20}
                                            className="text-white"
                                        />
                                    </div>
                                    <h2 className="ml-3 text-xl font-semibold text-indigo-200">
                                        Startup Details
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-wider text-gray-400">
                                            Company
                                        </span>
                                        <span className="text-lg font-medium text-white">
                                            {startupDetails?.name ||
                                                proposal?.startupId?.name}
                                        </span>
                                    </div>

                                    <div className="flex items-start">
                                        <FaEnvelope
                                            size={16}
                                            className="mt-1 text-indigo-300 mr-2 flex-shrink-0"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase tracking-wider text-gray-400">
                                                Email
                                            </span>
                                            <span className="text-sm text-gray-200">
                                                {startupDetails?.email ||
                                                    proposal?.startupId?.email}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <FaBriefcase
                                            size={16}
                                            className="mt-1 text-indigo-300 mr-2 flex-shrink-0"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase tracking-wider text-gray-400">
                                                Industry
                                            </span>
                                            <span className="text-sm text-gray-200">
                                                {startupDetails?.businessPlan
                                                    ?.industry ||
                                                    proposal?.startupId
                                                        ?.businessPlan
                                                        ?.industry}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-gray-700/50">
                                        <span className="text-xs uppercase tracking-wider text-gray-400">
                                            Business Description
                                        </span>
                                        <p className="mt-1 text-sm text-gray-300">
                                            {startupDetails?.businessPlan
                                                ?.description ||
                                                "No description available"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Middle Column - Proposal Details */}
                        <div className="md:col-span-1">
                            <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-xl h-full">
                                <div className="flex items-center mb-6">
                                    <div className="bg-purple-600 p-3 rounded-xl shadow-lg">
                                        <FaPaperPlane
                                            size={20}
                                            className="text-white"
                                        />
                                    </div>
                                    <h2 className="ml-3 text-xl font-semibold text-purple-200">
                                        Proposal Details
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
                                        <FaMoneyBillWave
                                            size={20}
                                            className="text-green-400 mr-3"
                                        />
                                        <div>
                                            <span className="text-xs text-gray-400">
                                                Funding Required
                                            </span>
                                            <p className="text-xl font-bold text-green-300">
                                                $
                                                {proposal?.fundingRequired?.toLocaleString() ||
                                                    "0"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <span className="text-xs uppercase tracking-wider text-gray-400">
                                            Proposal Message
                                        </span>
                                        <p className="mt-2 text-sm text-gray-300 bg-gray-700/30 p-3 rounded-lg border-l-2 border-purple-500">
                                            {proposal?.message ||
                                                "No message provided"}
                                        </p>
                                    </div>

                                    <div className="flex items-start pt-2">
                                        <span className="text-xs uppercase tracking-wider text-gray-400 mr-2">
                                            Sent By:
                                        </span>
                                        <span className="text-sm bg-gray-700/50 px-2 py-1 rounded">
                                            {proposal?.sentBy || "Unknown"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Investor Info */}
                        <div className="md:col-span-1">
                            <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-xl h-full">
                                <div className="flex items-center mb-6">
                                    <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
                                        <FaBriefcase
                                            size={20}
                                            className="text-white"
                                        />
                                    </div>
                                    <h2 className="ml-3 text-xl font-semibold text-blue-200">
                                        Investor Details
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-wider text-gray-400">
                                            Name
                                        </span>
                                        <span className="text-lg font-medium text-white">
                                            {investorDetails?.name ||
                                                proposal?.investorId?.name}
                                        </span>
                                    </div>

                                    <div className="flex items-start">
                                        <FaEnvelope
                                            size={16}
                                            className="mt-1 text-blue-300 mr-2 flex-shrink-0"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase tracking-wider text-gray-400">
                                                Email
                                            </span>
                                            <span className="text-sm text-gray-200">
                                                {investorDetails?.email ||
                                                    proposal?.investorId?.email}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <FaBriefcase
                                            size={16}
                                            className="mt-1 text-blue-300 mr-2 flex-shrink-0"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase tracking-wider text-gray-400">
                                                Company
                                            </span>
                                            <span className="text-sm text-gray-200">
                                                {investorDetails?.company ||
                                                    "Not specified"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group relative flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-medium shadow-lg shadow-indigo-500/30 transition-all duration-200 transform hover:scale-105 overflow-hidden"
                        >
                            <div className="relative z-10 flex items-center">
                                <FaPlus size={16} className="mr-2" />
                                <span>Create Milestone</span>
                            </div>
                            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                        </button>
                    </div>
                </div>

                {/* Milestone Modal */}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    className="max-w-2xl mx-auto my-8 p-6 bg-gray-800 rounded-lg border border-gray-700 outline-none shadow-2xl max-h-[85vh] overflow-auto"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    style={{
                        content: {
                            maxWidth: "95vw",
                        },
                    }}
                >
                    <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
                        <h2 className="text-2xl font-semibold text-indigo-300 flex items-center">
                            <FaCalendarAlt className="mr-2" /> Create Milestone
                        </h2>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Milestone Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g., MVP Development"
                                value={milestoneForm.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Description
                            </label>
                            <textarea
                                name="description"
                                placeholder="Describe what will be accomplished in this milestone..."
                                value={milestoneForm.description}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    Amount
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FaMoneyBillWave className="text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        name="amount"
                                        placeholder="Amount"
                                        value={milestoneForm.amount}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    Completion Date
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FaCalendarAlt className="text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        name="completionDate"
                                        value={milestoneForm.completionDate}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Supporting Documents
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-4 pb-4">
                                        <FaFileUpload className="w-7 h-7 mb-2 text-gray-400" />
                                        <p className="mb-1 text-sm text-gray-400">
                                            <span className="font-semibold">
                                                Click to upload
                                            </span>{" "}
                                            or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            PDF, DOC, DOCX, XLS (MAX. 10MB)
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {milestoneForm.file && (
                                <p className="text-sm text-green-400 flex items-center mt-1">
                                    <FaCheckCircle className="mr-1" />{" "}
                                    {milestoneForm.file.name}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between items-center space-x-4 mt-6">
                        <button
                            onClick={submitMilestone}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg font-medium shadow-lg shadow-indigo-500/20 flex items-center justify-center"
                        >
                            <FaCheckCircle className="mr-2" />
                            Submit Milestone
                        </button>

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-gray-300 flex items-center"
                        >
                            <FaTimes className="mr-2" /> Cancel
                        </button>
                    </div>
                </Modal>
                <div>

  <h3>Milestones</h3>
  {milestones.map((m, idx) => (
    <div key={idx} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <h4>Title: {m.title}</h4>
      <p>Description: {m.description}</p>
      <p>Amount: {m.amount}</p>
      <p>Approved: {m.approved ? "Yes" : "No"}</p>
      <p>Deadline: {m.deadline}</p>
      <p>State: {m.state == 0 ? "PENDING" : m.state == 1 ? "APPROVED" : "REJECTED"}</p>
      <p>IPFS: <a href={`https://ipfs.io/ipfs/${m.ipfsHash}`} target="_blank" rel="noopener noreferrer">View File</a></p>
    </div>
  ))}
</div>

            </div>
        </Layout>
    );
};

export default ProjectDetails;
