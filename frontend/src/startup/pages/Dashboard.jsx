import React, { useState, useEffect, act } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../../partials/Header";
import FilterButton from "../../components/DropdownFilter";
import Datepicker from "../../components/DropdownFilter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBell } from "react-icons/fa";
import ChatIcon from "../../components/ChatIcon";
import ChatBox from "../../components/ChatBox";
import { Link, useNavigate } from "react-router-dom";
import MilestoneForm from "../../components/MilestoneForm.jsx";
import Modal from "../../components/Modal.jsx";
import { ethers } from "ethers";
import { ABI } from "../../abi.js";

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [summaryData] = useState({
        totalFunding: 10000,
        milestonesCompleted: 0,
        activeProjects: 1,
    });
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [selectedDate, setSelectedDate] = useState("");
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMilestoneFormOpen, setIsMilestoneFormOpen] = useState(false);
    const [activeProposals, setActiveProposals] = useState();
    const [totalFunding, setTotalFunding] = useState(0);
    const [milestones, setMilestones] = useState();
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchInvestmentDetails(0);
    }, []);

    const fetchInvestmentDetails = async (investmentId) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

<<<<<<< HEAD
            const contract = new ethers.Contract(
                "0x995E12537B9AD84A3bbe91b67dF8afB4Bbabc8d7",
                ABI,
                signer
            );

            // Fetch investment details
            const inv = await contract.getInvestment(investmentId);

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
                    state: m[6],
                });
            }

            setMilestones(milestonesArray);
        } catch (error) {
            console.error("Error fetching investment and milestones:", error);
        }
=======
    const updatedMilestone = {
      id: isResubmission ? existingMilestoneId : Date.now().toString(),
      milestoneId: milestone?.milestoneId || `M${project.milestones.length + 1}`,
      title: milestone?.title,
      description: milestone?.description,
      budgetSpent: milestone?.budgetSpent || "0",
      completionDate: milestone?.completionDate || new Date().toISOString().split("T")[0],
      fileUrl: milestone?.fileUrl || "",
      fileName: milestone?.fileName || "No file",
      financialAnalysis: milestone?.financialAnalysis || "Pending",
      submittedAt: milestone?.submittedAt || new Date().toISOString(),
      status: "pending",
>>>>>>> e9050eebedf513709703c017fe0c9aa904fbef26
    };

    const [project, setProject] = useState({
        id: "proj1",
        name: "Sample Project",
        totalMilestones: 3,
        status: "active",
        milestones: [],
<<<<<<< HEAD
=======
      };
      investorProject.milestones = newMilestones;
      investorProject.status = "active";
      localStorage.setItem(`investorProject_${investorId}`, JSON.stringify(investorProject));

      // Update notifications for Investor
      const investorNotifications = JSON.parse(localStorage.getItem(`investorNotifications_${investorId}`)) || [];
      investorNotifications.push({
        message: `${isResubmission ? "Resubmitted" : "New"} milestone: ${milestone?.title}`,
        timestamp: new Date().toISOString(),
        read: false,
        milestoneId: updatedmilestone?.id,
      });
      localStorage.setItem(`investorNotifications_${investorId}`, JSON.stringify(investorNotifications));

      // Update notifications for Startup
      const startupNotifications = JSON.parse(localStorage.getItem(`startupNotifications_${startupId}`)) || [];
      startupNotifications.push({
        message: `Milestone ${milestone?.title} ${isResubmission ? "resubmitted" : "submitted"}`,
        timestamp: new Date().toISOString(),
        read: false,
        milestoneId: updatedmilestone?.id,
      });
      localStorage.setItem(`startupNotifications_${startupId}`, JSON.stringify(startupNotifications));
      setNotifications(startupNotifications);

      return updatedProject;
>>>>>>> e9050eebedf513709703c017fe0c9aa904fbef26
    });

    const startupId = "675d8f1bdfaebd7bdfb533d2";
    const investorId = "675d8f1bdfaebd7bdfb533cc";

    const fetchActiveProposals = async () => {
        const userId = localStorage.getItem("user");
        if (!userId) {
            setLoading(false);
            return;
        }

<<<<<<< HEAD
        try {
            const res = await fetch(
                `http://localhost:3000/proposals/startup/${userId}`
            );
            const data = await res.json();
            const filtered = data.filter(
                (proposal) => proposal.status === "accepted"
            );
            const total = filtered.reduce(
                (sum, p) => sum + (p.fundingRequired || 0),
                0
            );
            setTotalFunding(total);
            setActiveProposals(filtered);
        } catch (error) {
            console.error("Failed to fetch active proposals:", error);
        } finally {
            setLoading(false);
        }
    };

    const syncData = () => {
        const storedProject =
            JSON.parse(localStorage.getItem(`startupProject_${startupId}`)) ||
            project;
        console.log("Loaded project:", storedProject); // Debug project state
        setProject(storedProject);

        const storedNotifications =
            JSON.parse(
                localStorage.getItem(`startupNotifications_${startupId}`)
            ) || [];
        setNotifications(storedNotifications);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                syncData(); // Initial sync
            } catch (err) {
                console.error("Sync error:", err.message);
                toast.error("Error syncing data: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        fetchActiveProposals();

        const handleStorageChange = (e) => {
            if (
                e.key === `startupProject_${startupId}` ||
                e.key === `investorProject_${investorId}`
            ) {
                const updatedProject =
                    JSON.parse(
                        localStorage.getItem(`startupProject_${startupId}`)
                    ) || project;
                console.log("Updated project:", updatedProject); // Debug project state
                setProject(updatedProject);
            }
            if (
                e.key === `startupNotifications_${startupId}` ||
                e.key === `investorNotifications_${investorId}`
            ) {
                const updatedNotifications =
                    JSON.parse(
                        localStorage.getItem(
                            `startupNotifications_${startupId}`
                        )
                    ) || [];
                setNotifications(updatedNotifications);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [startupId]);

    const markAsRead = (message) => {
        setNotifications((prev) => {
            const updated = prev.map((notif) =>
                notif.message === message ? { ...notif, read: true } : notif
            );
            localStorage.setItem(
                `startupNotifications_${startupId}`,
                JSON.stringify(updated)
            );
            return updated;
        });
        toast.success("Notification marked as read");
    };

    const addMilestone = (
        milestone,
        isResubmission = false,
        existingMilestoneId = null
    ) => {
        if (project.status === "completed") {
            toast.error(
                "Cannot submit milestone: Project is already completed"
            );
            return;
        }

        const updatedMilestone = {
            id: isResubmission ? existingMilestoneId : Date.now().toString(),
            milestoneId:
                milestone.milestoneId || `M${project.milestones.length + 1}`,
            title: milestone.title,
            description: milestone.description,
            budgetSpent: milestone.budgetSpent || "0",
            completionDate:
                milestone.completionDate ||
                new Date().toISOString().split("T")[0],
            fileUrl: milestone.fileUrl || "",
            fileName: milestone.fileName || "No file",
            financialAnalysis: milestone.financialAnalysis || "Pending",
            submittedAt: milestone.submittedAt || new Date().toISOString(),
            status: "pending",
        };

        setProject((prev) => {
            const newMilestones = isResubmission
                ? prev.milestones.map((m) =>
                      m.id === existingMilestoneId ? updatedMilestone : m
                  )
                : [...prev.milestones, updatedMilestone];
            const updatedProject = {
                ...prev,
                milestones: newMilestones,
                status: "active",
            };

            // Sync with both Startup and Investor
            localStorage.setItem(
                `startupProject_${startupId}`,
                JSON.stringify(updatedProject)
            );
            const investorProject = JSON.parse(
                localStorage.getItem(`investorProject_${investorId}`)
            ) || {
                id: "proj1",
                name: "Sample Project",
                totalMilestones: 3,
                status: "active",
                milestones: [],
            };
            investorProject.milestones = newMilestones;
            investorProject.status = "active";
            localStorage.setItem(
                `investorProject_${investorId}`,
                JSON.stringify(investorProject)
            );

            // Update notifications for Investor
            const investorNotifications =
                JSON.parse(
                    localStorage.getItem(`investorNotifications_${investorId}`)
                ) || [];
            investorNotifications.push({
                message: `${
                    isResubmission ? "Resubmitted" : "New"
                } milestone: ${milestone.title}`,
                timestamp: new Date().toISOString(),
                read: false,
                milestoneId: updatedMilestone.id,
            });
            localStorage.setItem(
                `investorNotifications_${investorId}`,
                JSON.stringify(investorNotifications)
            );

            // Update notifications for Startup
            const startupNotifications =
                JSON.parse(
                    localStorage.getItem(`startupNotifications_${startupId}`)
                ) || [];
            startupNotifications.push({
                message: `Milestone ${milestone.title} ${
                    isResubmission ? "resubmitted" : "submitted"
                }`,
                timestamp: new Date().toISOString(),
                read: false,
                milestoneId: updatedMilestone.id,
            });
            localStorage.setItem(
                `startupNotifications_${startupId}`,
                JSON.stringify(startupNotifications)
            );
            setNotifications(startupNotifications);

            return updatedProject;
        });
        toast.success(
            `Milestone ${
                isResubmission ? "resubmitted" : "submitted"
            } successfully`
        );
    };

    const unreadCount = notifications.filter((notif) => !notif.read).length;

    const submittedMilestonesCount = milestones?.filter(
      (milestone) => milestone.submitted
    ).length;

    if (loading)
        return <div className="text-center mt-20 text-white">Loading...</div>;

    return (
        <div className="flex h-screen overflow-hidden bg-gray-900">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <main className="grow">
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        <div className="sm:flex sm:justify-between sm:items-center mb-8">
                            <h1 className="text-2xl md:text-3xl text-white font-bold">
                                Startup Dashboard
                            </h1>
                            <div className="relative flex items-center gap-4">
                                {/* <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                  <FilterButton selected={selectedFilter} setSelected={setSelectedFilter} />
                  <Datepicker selected={selectedDate} setSelected={setSelectedDate} />
                </div> */}
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setShowNotifications(
                                                !showNotifications
                                            )
                                        }
                                        className="text-gray-300 hover:text-white"
                                    >
                                        <FaBell className="w-6 h-6" />
                                        {unreadCount > 0 && (
                                            <span className="absolute top-0 right-0 w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </button>
                                    {showNotifications && (
                                        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto border border-gray-700">
                                            {notifications.length === 0 ? (
                                                <p className="p-4 text-gray-400">
                                                    No notifications
                                                </p>
                                            ) : (
                                                notifications.map((notif) => (
                                                    <div
                                                        key={
                                                            notif.timestamp +
                                                            notif.message
                                                        }
                                                        className={`p-4 border-b border-gray-700 ${
                                                            notif.read
                                                                ? "bg-gray-700"
                                                                : "bg-gray-800"
                                                        }`}
                                                    >
                                                        <p className="text-sm text-gray-200">
                                                            {notif.message}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            {new Date(
                                                                notif.timestamp
                                                            ).toLocaleString()}
                                                        </p>
                                                        {!notif.read && (
                                                            <button
                                                                onClick={() =>
                                                                    markAsRead(
                                                                        notif.message
                                                                    )
                                                                }
                                                                className="text-xs text-indigo-400 hover:text-indigo-300 mt-1"
                                                            >
                                                                Mark as read
                                                            </button>
                                                        )}
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gray-800 space-y-6 rounded-lg shadow-md">
                            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-4 text-white">
                                    Summary of Progress
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="bg-blue-600 p-4 rounded-lg text-center">
                                        <p className="text-gray-200">
                                            Total Funding
                                        </p>
                                        <h3 className="text-2xl font-bold text-white">
                                            ${totalFunding}
                                        </h3>
                                    </div>
                                    <div className="bg-green-600 p-4 rounded-lg text-center">
                                        <p className="text-gray-200">
                                            Milestones Completed
                                        </p>
                                        <h3 className="text-2xl font-bold text-white">
                                            {milestones?.length || 0}
                                        </h3>
                                    </div>
                                    <div className="bg-yellow-600 p-4 rounded-lg text-center">
                                        <p className="text-gray-200">
                                            Active Projects
                                        </p>
                                        <h3 className="text-2xl font-bold text-white">
                                            {activeProposals?.length}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                                    <span className="mr-2">📌</span> Submit New
                                    Milestone
                                </h2>
                                <div className="flex justify-center">
                                    <button
                                        onClick={() =>
                                            navigate('/startup/active-projects')
                                        }
                                        className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out flex items-center"
                                    >
                                        <span className="mr-2">📌</span>
                                        Submit Milestone (
                                        {submittedMilestonesCount || 0}/
                                        {milestones?.length || 0})
                                    </button>
                                </div>
                            </div>

                            {/* <div className="mt-6">
                                <h2 className="text-xl font-semibold mb-4 text-white">
                                    Project: {project.name} (Status:{" "}
                                    {project.status})
                                </h2>
                                {project.milestones.length === 0 ? (
                                    <p className="text-gray-400">
                                        No milestones submitted yet.
                                    </p>
                                ) : (
                                    <ul className="space-y-4">
                                        {project.milestones.map((milestone) => (
                                            <li
                                                key={milestone.id}
                                                className="bg-gray-700 p-4 rounded-lg"
                                            >
                                                <p className="text-white">
                                                    <strong>
                                                        Milestone ID:
                                                    </strong>{" "}
                                                    {milestone.milestoneId}
                                                </p>
                                                <p className="text-white">
                                                    <strong>Title:</strong>{" "}
                                                    {milestone.title}
                                                </p>
                                                <p className="text-gray-200">
                                                    <strong>
                                                        Description:
                                                    </strong>{" "}
                                                    {milestone.description}
                                                </p>
                                                <p className="text-gray-200">
                                                    <strong>
                                                        Budget Spent:
                                                    </strong>{" "}
                                                    ${milestone.budgetSpent}
                                                </p>
                                                <p className="text-gray-200">
                                                    <strong>
                                                        Completion Date:
                                                    </strong>{" "}
                                                    {milestone.completionDate}
                                                </p>
                                                <p className="text-gray-400">
                                                    <strong>File:</strong>{" "}
                                                    {milestone.fileUrl ? (
                                                        <a
                                                            href={
                                                                milestone.fileUrl
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-indigo-400 hover:text-indigo-300"
                                                        >
                                                            {milestone.fileName}
                                                        </a>
                                                    ) : (
                                                        "No file"
                                                    )}
                                                </p>
                                                <p className="text-gray-200">
                                                    <strong>
                                                        Financial Analysis:
                                                    </strong>{" "}
                                                    {milestone.financialAnalysis ||
                                                        "Pending"}
                                                </p>
                                                <p className="text-gray-400">
                                                    <strong>
                                                        Submitted At:
                                                    </strong>{" "}
                                                    {new Date(
                                                        milestone.submittedAt
                                                    ).toLocaleString()}
                                                </p>
                                                <p className="text-gray-400">
                                                    <strong>Status:</strong>{" "}
                                                    {milestone.status}
                                                </p>
                                                {milestone.status ===
                                                    "pending_modifications" &&
                                                    project.status ===
                                                        "active" && (
                                                        <button
                                                            onClick={() =>
                                                                setIsMilestoneFormOpen(
                                                                    true
                                                                )
                                                            }
                                                            className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                                        >
                                                            Resubmit Milestone
                                                        </button>
                                                    )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div> */}
                        </div>
                    </div>
                </main>
                <ChatIcon
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    userId={startupId}
                />
                <ChatBox
                    isOpen={isChatOpen}
                    onClose={() => setIsChatOpen(false)}
                    userId={startupId}
                    recipientId={investorId}
                />
                <Modal
                    isOpen={isMilestoneFormOpen}
                    onClose={() => setIsMilestoneFormOpen(false)}
                >
                    <MilestoneForm
                        onClose={() => setIsMilestoneFormOpen(false)}
                        addMilestone={addMilestone}
                    />
                </Modal>
            </div>
            <ToastContainer />
        </div>
    );
=======
  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <main className="grow">
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {/* Header Section */}
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl md:text-3xl text-white font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Startup Dashboard
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            
            <div className="relative flex items-center gap-4">
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-3">
                <FilterButton selected={selectedFilter} setSelected={setSelectedFilter} />
                <Datepicker selected={selectedDate} setSelected={setSelectedDate} />
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="text-gray-300 hover:text-white transition-colors duration-200 relative p-1 rounded-full hover:bg-gray-700"
                >
                  <FaBell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1 animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-xl z-10 max-h-80 overflow-y-auto border border-gray-700 transform origin-top-right transition-all duration-200 ease-out scale-95 hover:scale-100">
                    <div className="p-3 border-b border-gray-700 sticky top-0 bg-gray-800 flex justify-between items-center">
                      <h3 className="font-medium text-white">Notifications</h3>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    {notifications.length === 0 ? (
                      <div className="p-4 flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <p className="text-gray-400 text-center">No notifications yet</p>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.timestamp + notif.message}
                          className={`p-4 border-b border-gray-700 transition-colors duration-150 ${notif.read ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-750"}`}
                        >
                          <p className="text-sm text-gray-200">{notif.message}</p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-xs text-gray-400">
                              {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {!notif.read && (
                              <button
                                onClick={() => markAsRead(notif.message)}
                                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-150"
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
  
          {/* Dashboard Content */}
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-500/20 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">Total Funding</p>
                    <h3 className="text-2xl font-bold text-white">${summaryData.totalFunding.toLocaleString()}</h3>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-green-500/20 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-green-100">Milestones Completed</p>
                    <h3 className="text-2xl font-bold text-white">{summaryData.milestonesCompleted}</h3>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-yellow-500/20 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-yellow-100">Active Projects</p>
                    <h3 className="text-2xl font-bold text-white">{summaryData.activeProjects}</h3>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Milestone Submission */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 mr-3">
                      <span className="text-red-400">📌</span>
                    </span>
                    Submit New Milestone
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Current progress: {project?.milestones?.length || 0}/{project?.totalMilestones || 0} milestones
                  </p>
                </div>
                <button
                  onClick={() => setIsMilestoneFormOpen(true)}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center"
                >
                  <span className="mr-2">📌</span>
                  Submit Milestone
                </button>
              </div>
            </div>
  
            {/* Project Details */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Project: {project.name}
                  </h2>
                  <div className="flex items-center mt-2">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      project.status === 'active' ? 'bg-green-500' : 
                      project.status === 'paused' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></span>
                    <span className="text-sm text-gray-300 capitalize">{project.status}</span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0">
                  <div className="bg-gray-700 px-3 py-2 rounded-lg text-sm">
                    <span className="text-gray-300">Last updated: </span>
                    <span className="text-white">
                      {project.lastUpdated ? new Date(project.lastUpdated).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
  
              {project?.milestones?.length === 0 ? (
                <div className="bg-gray-700/50 p-8 rounded-lg text-center border-2 border-dashed border-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-300 mb-1">No milestones submitted yet</h3>
                  <p className="text-gray-500">Get started by submitting your first milestone</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {project?.milestones?.map((milestone) => (
                    <div 
                      key={milestone?.id} 
                      className="bg-gray-750 p-5 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors duration-200"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center mb-2">
                            <h3 className="text-lg font-semibold text-white mr-3">{milestone?.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              milestone?.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                              milestone?.status === 'pending_review' ? 'bg-blue-500/20 text-blue-400' :
                              milestone?.status === 'pending_modifications' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {milestone?.status.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">{milestone?.description}</p>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <div className="text-right mb-2">
                            <p className="text-sm text-gray-400">Completion Date</p>
                            <p className="text-white">{milestone?.completionDate}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-400">Budget Spent</p>
                            <p className="text-white font-medium">${milestone?.budgetSpent.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Financial Analysis</p>
                          <p className={`text-sm ${
                            milestone?.financialAnalysis === 'Pending' ? 'text-gray-500' : 'text-gray-300'
                          }`}>
                            {milestone?.financialAnalysis || "Pending"}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Submitted At</p>
                          <p className="text-gray-300 text-sm">
                            {new Date(milestone?.submittedAt).toLocaleString()}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Attachments</p>
                          {milestone?.fileUrl ? (
                            <a
                              href={milestone?.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                              </svg>
                              {milestone?.fileName}
                            </a>
                          ) : (
                            <span className="text-gray-500 text-sm">No file</span>
                          )}
                        </div>
                      </div>
                      
                      {milestone?.status === "pending_modifications" && project.status === "active" && (
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={() => setIsMilestoneFormOpen(true)}
                            className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Resubmit Milestone
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <ChatIcon onClick={() => setIsChatOpen(!isChatOpen)} userId={startupId} />
      <ChatBox
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        userId={startupId}
        recipientId={investorId}
      />
      
      <Modal isOpen={isMilestoneFormOpen} onClose={() => setIsMilestoneFormOpen(false)}>
        <MilestoneForm onClose={() => setIsMilestoneFormOpen(false)} addMilestone={addMilestone} />
      </Modal>
    </div>
    
    <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      toastClassName="bg-gray-800"
      bodyClassName="text-gray-200"
    />
  </div>
  );
>>>>>>> e9050eebedf513709703c017fe0c9aa904fbef26
}

export default Dashboard;
