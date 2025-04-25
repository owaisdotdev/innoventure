import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import {
    FaUser,
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
    FaCalendarCheck,
} from "react-icons/fa";
import Layout from "./Layout";
import { ethers } from "ethers";
import { useNavigate } from 'react-router-dom';

import { ABI } from "@/abi";
import {  FaFileAlt,FaTimesCircle , FaChevronDown, FaChevronUp, FaDollarSign, FaClock } from 'react-icons/fa';


const ProjectDetails = () => {
    const { id } = useParams();
    const [proposal, setProposal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startupDetails, setStartupDetails] = useState();
    const [investorDetails, setInvestorDetails] = useState();
    const [expandedMilestone, setExpandedMilestone] = useState(null);
    const navigate = useNavigate();
    const [investment, setInvestment] = useState(null);

const [milestones, setMilestones] = useState([
        {
          title: "Design Phase",
          description: "Complete UI/UX design for the app",
          amount: "100",
          approved: false,
          deadline: "2025-05-05",
          state: 0,
          ipfsHash: "QmXyzExampleHash1",
          submitted: true,
        },
        {
          title: "Development Phase",
          description: "Build the core functionality",
          amount: "300",
          approved: true,
          deadline: "2025-06-10",
          state: 1,
          ipfsHash: "QmXyzExampleHash2",
          submitted: false,
        },
        {
          title: "Testing & Deployment",
          description: "Test the application and deploy to production",
          amount: "150",
          approved: false,
          deadline: "2025-07-01",
          state: 2,
          ipfsHash: "QmXyzExampleHash3",
          submitted: true,
        },
      ]
      ); 
    const [milestoneForm, setMilestoneForm] = useState({
        milestoneId: "",
        title: "",
        financialAnalysis: "",
        completionDate: "",
        file: null,
    });
    const [milestoneFunded, setMilestoneFunded] = useState(false);
    const [funding, setFunding] = useState(false);
    const navigateToSubmitMilestone = () => {
        navigate('/startup/milestone');
      };
    const toggleExpand = (index) => {
        setExpandedMilestone(expandedMilestone === index ? null : index);
      };
    
      const getStateColor = (state) => {
        switch (state) {
          case 0: return "text-yellow-500"; // PENDING
          case 1: return "text-green-500";  // APPROVED
          case 2: return "text-red-500";    // REJECTED
          default: return "text-gray-500";
        }
      };
    useEffect(() => {
              fetchInvestmentDetails(0); 
            }, []);
        
         const fetchInvestmentDetails = async (investmentId) => {
                try {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const signer = await provider.getSigner();
        
                    const contract = new ethers.Contract(
                        "0x995E12537B9AD84A3bbe91b67dF8afB4Bbabc8d7",
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
                      milestoneCount: Number(inv[7]),
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
                          state: Number(m[6]),
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
                    `http://localhost:3000/proposals/startup/${userId}`
                );
                const data = await res.json();
                const proposalById = data.find((p) => p._id === id);
                setProposal(proposalById);

                // Fetch Startup Details
                if (proposalById?.startupId?._id) {
                    const startupRes = await fetch(
                        `http://localhost:3000/startup/${proposalById.startupId._id}`
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
    const getStateName = (state) => {
        return state === 0 ? "PENDING" : state === 1 ? "APPROVED" : "REJECTED";
      };
    

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 text-white px-4 py-8 md:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section - Enhanced */}
                    <div className="mb-12 text-center">
                        <h1 className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-blue-400">
                            {proposal?.title || "Funding Proposal"}
                        </h1>
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-900/60 border border-indigo-500/40 shadow-lg shadow-indigo-900/20">
                            <span
                                className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(
                                    proposal?.status
                                )}`}
                            ></span>
                            <span className="text-indigo-100 font-medium">
                                {proposal?.status || "Status"}
                            </span>
                        </div>
                    </div>
    
                    {/* Main Content - Improved grid and cards */}
                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Left Column - Startup Info */}
                        <div className="md:col-span-1">
                            <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700/60 shadow-xl h-full transform transition-all hover:shadow-indigo-800/10 hover:border-gray-600/60">
                                <div className="flex items-center mb-6">
                                    <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-3 rounded-xl shadow-lg">
                                        <FaUsers
                                            size={22}
                                            className="text-white"
                                        />
                                    </div>
                                    <h2 className="ml-4 text-xl font-semibold text-indigo-100">
                                        Startup Details
                                    </h2>
                                </div>
    
                                <div className="space-y-5">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-wider text-indigo-300 font-medium">
                                            Company
                                        </span>
                                        <span className="text-xl font-medium text-white mt-1">
                                            {startupDetails?.name ||
                                                proposal?.startupId?.name}
                                        </span>
                                    </div>
    
                                    <div className="flex items-start">
                                        <FaEnvelope
                                            size={16}
                                            className="mt-1 text-indigo-300 mr-3 flex-shrink-0"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase tracking-wider text-indigo-300 font-medium">
                                                Email
                                            </span>
                                            <span className="text-sm text-gray-200 mt-1">
                                                {startupDetails?.email ||
                                                    proposal?.startupId?.email}
                                            </span>
                                        </div>
                                    </div>
    
                                    <div className="flex items-start">
                                        <FaBriefcase
                                            size={16}
                                            className="mt-1 text-indigo-300 mr-3 flex-shrink-0"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase tracking-wider text-indigo-300 font-medium">
                                                Industry
                                            </span>
                                            <span className="text-sm text-gray-200 mt-1">
                                                {startupDetails?.businessPlan
                                                    ?.industry ||
                                                    proposal?.startupId
                                                        ?.businessPlan
                                                        ?.industry || "Not specified"}
                                            </span>
                                        </div>
                                    </div>
    
                                    <div className="pt-3 border-t border-gray-700/60">
                                        <span className="text-xs uppercase tracking-wider text-indigo-300 font-medium">
                                            Business Description
                                        </span>
                                        <p className="mt-2 text-sm leading-relaxed text-gray-300">
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
                            <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700/60 shadow-xl h-full transform transition-all hover:shadow-purple-800/10 hover:border-gray-600/60">
                                <div className="flex items-center mb-6">
                                    <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-3 rounded-xl shadow-lg">
                                        <FaPaperPlane
                                            size={22}
                                            className="text-white"
                                        />
                                    </div>
                                    <h2 className="ml-4 text-xl font-semibold text-purple-100">
                                        Proposal Details
                                    </h2>
                                </div>
    
                                <div className="space-y-5">
                                    <div className="flex items-center p-4 bg-gradient-to-r from-gray-700/60 to-gray-700/40 rounded-xl">
                                        <FaMoneyBillWave
                                            size={24}
                                            className="text-green-400 mr-4"
                                        />
                                        <div>
                                            <span className="text-xs uppercase tracking-wider text-green-300 font-medium">
                                                Amount invested
                                            </span>
                                            <p className="text-2xl font-bold text-green-300 mt-1">
                                                $
                                                {proposal?.fundingRequired?.toLocaleString() ||
                                                    "0"}
                                            </p>
                                        </div>
                                    </div>
    
                                    <div className="pt-2">
                                        <span className="text-xs uppercase tracking-wider text-purple-300 font-medium">
                                            Proposal Message
                                        </span>
                                        <p className="mt-2 text-sm leading-relaxed text-gray-300 bg-gray-700/40 p-4 rounded-lg border-l-3 border-purple-500">
                                            {proposal?.message ||
                                                "No message provided"}
                                        </p>
                                    </div>
    
                                    <div className="flex items-center pt-3">
                                        <FaUser
                                            size={16}
                                            className="text-purple-300 mr-2 flex-shrink-0" 
                                        />
                                        <span className="text-xs uppercase tracking-wider text-purple-300 font-medium mr-2">
                                            Sent By:
                                        </span>
                                        <span className="text-sm bg-gray-700/60 px-3 py-1 rounded-lg">
                                            {proposal?.sentBy || "Unknown"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        {/* Right Column - Investor Info */}
                        <div className="md:col-span-1">
                            <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700/60 shadow-xl h-full transform transition-all hover:shadow-blue-800/10 hover:border-gray-600/60">
                                <div className="flex items-center mb-6">
                                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-xl shadow-lg">
                                        <FaBriefcase
                                            size={22}
                                            className="text-white"
                                        />
                                    </div>
                                    <h2 className="ml-4 text-xl font-semibold text-blue-100">
                                        Investor Details
                                    </h2>
                                </div>
    
                                <div className="space-y-5">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-wider text-blue-300 font-medium">
                                            Name
                                        </span>
                                        <span className="text-xl font-medium text-white mt-1">
                                            {investorDetails?.name ||
                                                proposal?.investorId?.name}
                                        </span>
                                    </div>
    
                                    <div className="flex items-start">
                                        <FaEnvelope
                                            size={16}
                                            className="mt-1 text-blue-300 mr-3 flex-shrink-0"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase tracking-wider text-blue-300 font-medium">
                                                Email
                                            </span>
                                            <span className="text-sm text-gray-200 mt-1">
                                                {investorDetails?.email ||
                                                    proposal?.investorId?.email}
                                            </span>
                                        </div>
                                    </div>
    
                                    <div className="flex items-start">
                                        <FaBriefcase
                                            size={16}
                                            className="mt-1 text-blue-300 mr-3 flex-shrink-0"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase tracking-wider text-blue-300 font-medium">
                                                Company
                                            </span>
                                            <span className="text-sm text-gray-200 mt-1">
                                                {investorDetails?.company ||
                                                    "Not specified"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    {/* Action Button - Enhanced
                    <div className="mt-10 flex justify-center">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group relative flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-medium text-lg shadow-lg shadow-indigo-500/40 transition-all duration-300 transform hover:scale-105 hover:shadow-indigo-500/50"
                        >
                            <div className="relative z-10 flex items-center">
                                <FaPlus size={18} className="mr-3" />
                                <span>Submit Milestone</span>
                            </div>
                            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-xl"></div>
                        </button>
                    </div> */}
    
    
      
      <div className="max-w-5xl mt-20 mx-auto p-6 bg-gray-900 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Project Milestones
        </h1>
        
        <button 
          onClick={navigateToSubmitMilestone}
          className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
        >
          <FaPlus className="mr-2" /> Submit Milestone
        </button>
      </div>
      
      <div className="space-y-6">
        {milestones.map((milestone, idx) => (
          <div 
            key={idx} 
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-700"
          >
            <div 
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => toggleExpand(idx)}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${getStateColor(milestone.state).replace('text-', 'bg-').replace('-400', '-900')} bg-opacity-50`}>
                  {milestone.state === 1 ? (
                    <FaCheckCircle className={getStateColor(milestone.state)} size={20} />
                  ) : milestone.state === 2 ? (
                    <FaTimesCircle className={getStateColor(milestone.state)} size={20} />
                  ) : (
                    <FaClock className={getStateColor(milestone.state)} size={20} />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">{milestone.title}</h3>
                  <div className="flex items-center text-sm text-gray-300">
                    <span className={`font-semibold ${getStateColor(milestone.state)}`}>
                      {getStateName(milestone.state)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center font-bold text-green-400">
                    <FaDollarSign size={14} className="mr-1" />
                    {milestone.amount.replace('$', '')}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <FaCalendarAlt size={12} className="mr-1" />
                    {milestone.deadline}
                  </div>
                </div>
                {expandedMilestone === idx ? (
                  <FaChevronUp className="text-gray-400" />
                ) : (
                  <FaChevronDown className="text-gray-400" />
                )}
              </div>
            </div>
            
            {expandedMilestone === idx && (
              <div className="p-4 bg-gray-700 border-t border-gray-600">
                <p className="text-gray-300 mb-4">{milestone.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <FaFileAlt />
                    <a 
                      href={`https://ipfs.io/ipfs/${milestone.ipfsHash}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 hover:underline"
                    >
                      View File
                    </a>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-300">
                    <span className="mr-2">Approved:</span>
                    {milestone.approved ? (
                      <FaCheckCircle className="text-green-400" size={16} />
                    ) : (
                      <FaTimesCircle className="text-red-400" size={16} />
                    )}
                  </div>
                </div>
                
                {milestone.submitted && milestone.state === 0 && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleApprove(0, idx)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center justify-center flex-1 transition-colors duration-200"
                    >
                      <FaCheckCircle className="mr-2" /> Accept
                    </button>
                    <button
                      onClick={() => handleReject(0, idx)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center justify-center flex-1 transition-colors duration-200"
                    >
                      <FaTimesCircle className="mr-2" /> Reject
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

{/* Submit Milestone Modal - Fixed sizing and scrolling */}
<Modal
    isOpen={isModalOpen}
    onRequestClose={() => setIsModalOpen(false)}
    className="max-w-2xl mx-auto my-8 p-6 bg-gray-800 rounded-xl border border-gray-700 outline-none shadow-2xl max-h-[90vh] overflow-auto"
    overlayClassName="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    style={{
        content: {
            maxWidth: '90vw'
        }
    }}
>
    <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
        <h2 className="text-xl font-semibold text-indigo-300 flex items-center">
            <FaCalendarCheck className="mr-2" size={20} /> Submit asMilestone
        </h2>
        <button
            onClick={() => setIsModalOpen(false)}
            className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
        >
            <FaTimes size={18} />
        </button>
    </div>

    <div className="space-y-5">
        {/* Title (disabled since it's already set) */}
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
                Milestone Title
            </label>
            <input
                type="text"
                name="title"
                value={milestoneForm.title}
                disabled
                className="w-full px-4 py-2 rounded-lg bg-gray-700/80 border border-gray-600 text-gray-400"
            />
        </div>

        {/* Completion Date - Adjusted sizing */}
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
                Completion Date
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaCalendarAlt className="text-indigo-400" />
                </div>
                <input
                    type="date"
                    name="completionDate"
                    value={milestoneForm.completionDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 px-4 py-2 rounded-lg bg-gray-700/80 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
            </div>
        </div>

        {/* Financial Analysis - Reduced rows */}
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
                Financial Analysis / Report
            </label>
            <textarea
                name="financialAnalysis"
                placeholder="Provide a brief financial summary of milestone completion..."
                value={milestoneForm.financialAnalysis}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-gray-700/80 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
        </div>

        {/* File Upload - Height reduced */}
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
                Attach Completion Proof (Docs)
            </label>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700/80 hover:bg-gray-600/80 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-4 pb-4">
                        <FaFileUpload className="w-8 h-8 mb-2 text-indigo-400" />
                        <p className="mb-1 text-sm text-gray-300">
                            <span className="font-semibold text-indigo-300">
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
                    <FaCheckCircle className="mr-2" />{" "}
                    {milestoneForm.file.name}
                </p>
            )}
        </div>
    </div>

    {/* Submit + Cancel buttons - Compact version */}
    <div className="flex justify-between items-center space-x-3 mt-6">
        <button
            onClick={submitMilestone}
            className="flex-1 px-4 py-2 rounded-lg font-medium text-base flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30 transition-all"
        >
            <FaCheckCircle className="mr-2" size={16} />
            {"Submit Milestone"}
        </button>

        <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-gray-300 flex items-center transition-all"
        >
            <FaTimes className="mr-2" size={16} /> Cancel
        </button>
    </div>
</Modal>
                </div>
            </div>
        </Layout>
    );
};

export default ProjectDetails;
