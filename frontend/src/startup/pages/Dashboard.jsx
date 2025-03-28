
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../../partials/Header";
import FilterButton from "../../components/DropdownFilter";
import Datepicker from "../../components/DropdownFilter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBell } from "react-icons/fa";
import ChatIcon from "../../components/ChatIcon";
import ChatBox from "../../components/ChatBox";
import { Link } from "react-router-dom";
import MilestoneForm from "../../components/MilestoneForm.jsx";
import Modal from "../../components/Modal.jsx";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

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
  const [project, setProject] = useState({
    id: "proj1",
    name: "Sample Project",
    totalMilestones: 3,
    status: "active",
    milestones: [],
  });
  const [matchedInvestors, setMatchedInvestors] = useState([]);

  const startupId = "675d8f1bdfaebd7bdfb533d2";
  const investorId = "675d8f1bdfaebd7bdfb533cc";

  const syncData = () => {
    const storedProject = JSON.parse(localStorage.getItem(`startupProject_${startupId}`)) || project;
    setProject(storedProject);

    const storedNotifications = JSON.parse(localStorage.getItem(`startupNotifications_${startupId}`)) || [];
    setNotifications(storedNotifications);
  };

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        syncData(); // Initial sync

        const response = await fetch("http://localhost:3000/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ startup_id: startupId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response from NestJS:", data);

        if (data.potential_investors) {
          setMatchedInvestors(data.potential_investors);
        } else {
          toast.error("No matched investors found.");
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
        toast.error("Error fetching matched investors: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();

    const handleStorageChange = (e) => {
      if (e.key === `startupProject_${startupId}` || e.key === `investorProject_${investorId}`) {
        const updatedProject = JSON.parse(localStorage.getItem(`startupProject_${startupId}`)) || project;
        setProject(updatedProject);
      }
      if (e.key === `startupNotifications_${startupId}` || e.key === `investorNotifications_${investorId}`) {
        const updatedNotifications = JSON.parse(localStorage.getItem(`startupNotifications_${startupId}`)) || [];
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
      localStorage.setItem(`startupNotifications_${startupId}`, JSON.stringify(updated));
      return updated;
    });
    toast.success("Notification marked as read");
  };

  const addMilestone = (milestone, isResubmission = false, existingMilestoneId = null) => {
    if (project.status === "completed") {
      toast.error("Cannot submit milestone: Project is already completed");
      return;
    }

    const updatedMilestone = {
      id: isResubmission ? existingMilestoneId : Date.now().toString(),
      milestoneId: milestone.milestoneId || `M${project.milestones.length + 1}`,
      title: milestone.title,
      description: milestone.description,
      budgetSpent: milestone.budgetSpent || "0",
      completionDate: milestone.completionDate || new Date().toISOString().split("T")[0],
      fileUrl: milestone.fileUrl || "",
      fileName: milestone.fileName || "No file",
      financialAnalysis: milestone.financialAnalysis || "Pending",
      submittedAt: milestone.submittedAt || new Date().toISOString(),
      status: "pending",
    };

    setProject((prev) => {
      const newMilestones = isResubmission
        ? prev.milestones.map((m) => (m.id === existingMilestoneId ? updatedMilestone : m))
        : [...prev.milestones, updatedMilestone];
      const updatedProject = { ...prev, milestones: newMilestones, status: "active" };

      // Sync with both Startup and Investor
      localStorage.setItem(`startupProject_${startupId}`, JSON.stringify(updatedProject));
      const investorProject = JSON.parse(localStorage.getItem(`investorProject_${investorId}`)) || {
        id: "proj1",
        name: "Sample Project",
        totalMilestones: 3,
        status: "active",
        milestones: [],
      };
      investorProject.milestones = newMilestones;
      investorProject.status = "active";
      localStorage.setItem(`investorProject_${investorId}`, JSON.stringify(investorProject));

      // Update notifications for Investor
      const investorNotifications = JSON.parse(localStorage.getItem(`investorNotifications_${investorId}`)) || [];
      investorNotifications.push({
        message: `${isResubmission ? "Resubmitted" : "New"} milestone: ${milestone.title}`,
        timestamp: new Date().toISOString(),
        read: false,
        milestoneId: updatedMilestone.id,
      });
      localStorage.setItem(`investorNotifications_${investorId}`, JSON.stringify(investorNotifications));

      // Update notifications for Startup
      const startupNotifications = JSON.parse(localStorage.getItem(`startupNotifications_${startupId}`)) || [];
      startupNotifications.push({
        message: `Milestone ${milestone.title} ${isResubmission ? "resubmitted" : "submitted"}`,
        timestamp: new Date().toISOString(),
        read: false,
        milestoneId: updatedMilestone.id,
      });
      localStorage.setItem(`startupNotifications_${startupId}`, JSON.stringify(startupNotifications));
      setNotifications(startupNotifications);

      return updatedProject;
    });
    toast.success(`Milestone ${isResubmission ? "resubmitted" : "submitted"} successfully`);
  };

  const barChartData = {
    labels: project.milestones.length > 0 ? project.milestones.map((m) => m.title) : ["No Milestones"],
    datasets: [
      {
        label: "Budget Spent ($)",
        data: project.milestones.length > 0
          ? project.milestones.map((m) => parseFloat(m.budgetSpent) || 0)
          : [0],
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { color: "#fff" } },
      title: { display: true, text: "Budget Spent per Milestone", color: "#fff", font: { size: 18 } },
    },
    scales: {
      x: { ticks: { color: "#fff" }, grid: { color: "rgba(255, 255, 255, 0.1)" } },
      y: { ticks: { color: "#fff" }, grid: { color: "rgba(255, 255, 255, 0.1)" }, beginAtZero: true },
    },
  };

  const lineGraphData = {
    labels: project.milestones.length > 0
      ? project.milestones.map((m) => new Date(m.completionDate).toLocaleDateString())
      : ["No Data"],
    datasets: [
      {
        label: "Budget Spent ($)",
        data: project.milestones.length > 0
          ? project.milestones.map((m) => parseFloat(m.budgetSpent) || 0)
          : [0],
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
      },
    ],
  };

  const lineGraphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { color: "#fff" } },
      title: { display: true, text: "Budget Spent Over Time", color: "#fff", font: { size: 18 } },
    },
    scales: {
      x: { ticks: { color: "#fff" }, grid: { color: "rgba(255, 255, 255, 0.1)" } },
      y: { ticks: { color: "#fff" }, grid: { color: "rgba(255, 255, 255, 0.1)" }, beginAtZero: true },
    },
  };

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  if (loading) return <div className="text-center mt-20 text-white">Loading...</div>;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <h1 className="text-2xl md:text-3xl text-white font-bold">Startup Dashboard</h1>
              <div className="relative flex items-center gap-4">
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                  <FilterButton selected={selectedFilter} setSelected={setSelectedFilter} />
                  <Datepicker selected={selectedDate} setSelected={setSelectedDate} />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
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
                        <p className="p-4 text-gray-400">No notifications</p>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.timestamp + notif.message}
                            className={`p-4 border-b border-gray-700 ${notif.read ? "bg-gray-700" : "bg-gray-800"}`}
                          >
                            <p className="text-sm text-gray-200">{notif.message}</p>
                            <p className="text-xs text-gray-400">
                              {new Date(notif.timestamp).toLocaleString()}
                            </p>
                            {!notif.read && (
                              <button
                                onClick={() => markAsRead(notif.message)}
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
                <h2 className="text-xl font-semibold mb-4 text-white">Summary of Progress</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-blue-600 p-4 rounded-lg text-center">
                    <p className="text-gray-200">Total Funding</p>
                    <h3 className="text-2xl font-bold text-white">${summaryData.totalFunding}</h3>
                  </div>
                  <div className="bg-green-600 p-4 rounded-lg text-center">
                    <p className="text-gray-200">Milestones Completed</p>
                    <h3 className="text-2xl font-bold text-white">{summaryData.milestonesCompleted}</h3>
                  </div>
                  <div className="bg-yellow-600 p-4 rounded-lg text-center">
                    <p className="text-gray-200">Active Projects</p>
                    <h3 className="text-2xl font-bold text-white">{summaryData.activeProjects}</h3>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                    <span className="mr-2">📊</span> Budget Spent per Milestone
                  </h2>
                  <div className="h-64">
                    <Bar data={barChartData} options={barChartOptions} />
                  </div>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                    <span className="mr-2">📈</span> Budget Spent Over Time
                  </h2>
                  <div className="h-64">
                    <Line data={lineGraphData} options={lineGraphOptions} />
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                  <span className="mr-2">🤝</span> Matched Investors
                </h2>
                {matchedInvestors.length === 0 ? (
                  <p className="text-gray-400">No matched investors found yet.</p>
                ) : (
                  <ul className="space-y-4 max-h-80 overflow-y-auto">
                    {matchedInvestors.map((investor) => (
                      <li
                        key={investor._id}
                        className="bg-gray-600 p-4 rounded-lg shadow-md border-l-4 border-green-500 hover:bg-gray-500 transition-colors"
                      >
                        <p className="text-white font-semibold">Investor ID: {investor._id}</p>
                        <p className="text-gray-200">
                          Description: {investor.businessPlan?.description || "N/A"}
                        </p>
                        <p className="text-gray-200">
                          Industry: {investor.investmentPreferences?.industry || "N/A"}
                        </p>
                        <p className="text-gray-200">
                          Funding Amount: {investor.investmentPreferences?.fundingAmount || "N/A"}
                        </p>
                        <p className="text-gray-200">
                          Risk Level: {investor.investmentPreferences?.riskLevel || "N/A"}
                        </p>
                        <p className="text-gray-400">
                          Similarity Score: {(investor.similarity * 100).toFixed(2)}%
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                {project.milestones.length < project.totalMilestones && project.status === "active" && (
                  <button
                    onClick={() => setIsMilestoneFormOpen(true)}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
                  >
                    Submit Milestone ({project.milestones.length + 1}/{project.totalMilestones})
                  </button>
                )}
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Project: {project.name} (Status: {project.status})
                </h2>
                {project.milestones.length === 0 ? (
                  <p className="text-gray-400">No milestones submitted yet.</p>
                ) : (
                  <ul className="space-y-4">
                    {project.milestones.map((milestone) => (
                      <li key={milestone.id} className="bg-gray-700 p-4 rounded-lg">
                        <p className="text-white">
                          <strong>Milestone ID:</strong> {milestone.milestoneId}
                        </p>
                        <p className="text-white">
                          <strong>Title:</strong> {milestone.title}
                        </p>
                        <p className="text-gray-200">
                          <strong>Description:</strong> {milestone.description}
                        </p>
                        <p className="text-gray-200">
                          <strong>Budget Spent:</strong> ${milestone.budgetSpent}
                        </p>
                        <p className="text-gray-200">
                          <strong>Completion Date:</strong> {milestone.completionDate}
                        </p>
                        <p className="text-gray-400">
                          <strong>File:</strong>{" "}
                          {milestone.fileUrl ? (
                            <a
                              href={milestone.fileUrl}
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
                          <strong>Financial Analysis:</strong> {milestone.financialAnalysis || "Pending"}
                        </p>
                        <p className="text-gray-400">
                          <strong>Submitted At:</strong> {new Date(milestone.submittedAt).toLocaleString()}
                        </p>
                        <p className="text-gray-400">
                          <strong>Status:</strong> {milestone.status}
                        </p>
                        {milestone.status === "pending_modifications" && project.status === "active" && (
                          <button
                            onClick={() => setIsMilestoneFormOpen(true)}
                            className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                          >
                            Resubmit Milestone
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
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
      <ToastContainer />
    </div>
  );
}

export default Dashboard;