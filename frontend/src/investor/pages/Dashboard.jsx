import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../../partials/Header";
import FilterButton from "../../components/DropdownFilter";
import Datepicker from "../../components/Datepicker";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBell } from "react-icons/fa";
import ChatIcon from "@/components/ChatIcon";
import ChatBox from "@/components/ChatBox";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [summaryData, setSummaryData] = useState({
    totalInvestments: 0,
    totalReturns: "$0",
    activeProjects: 0,
  });
  const [platformActivity, setPlatformActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const investorId = "67bf29890c2f666e54f3968f";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("[Investor] Starting fetchData for investorId:", investorId);

        const [
          totalInvestments,
          totalReturns,
          activeProjects,
          notificationsResponse,
        ] = await Promise.all([
          fetch(`${BASE_URL}/investor-dashboard/${investorId}/total-investment`).then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch total investments: ${res.status}`);
            return res.json();
          }),
          fetch(`${BASE_URL}/investor-dashboard/${investorId}/total-returns`).then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch total returns: ${res.status}`);
            return res.json();
          }),
          fetch(`${BASE_URL}/investor-dashboard/${investorId}/active-projects`).then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch active projects: ${res.status}`);
            return res.json();
          }),
          fetch(`${BASE_URL}/notifications/${investorId}`).then((res) => {
            console.log(`[Investor] Fetching notifications for ${investorId}, status: ${res.status}`);
            if (!res.ok) {
              return res.text().then((text) => {
                throw new Error(`Failed to fetch notifications: ${res.status} - ${text}`);
              });
            }
            return res.json();
          }),
        ]);

        let recentActivity = { activities: [] };
        try {
          let activityUrl = `${BASE_URL}/investor-dashboard/${investorId}/recent-activity`;
          if (selectedFilter !== "All") activityUrl += `?filter=${selectedFilter}`;
          if (selectedDate) activityUrl += `${selectedFilter !== "All" ? "&" : "?"}date=${selectedDate}`;
          const recentActivityResponse = await fetch(activityUrl);
          console.log(`[Investor] Fetching recent activity, status: ${recentActivityResponse.status}`);
          if (!recentActivityResponse.ok) {
            const errorText = await recentActivityResponse.text();
            console.warn(`[Investor] Failed to fetch recent activity: ${recentActivityResponse.status} - ${errorText}`);
          } else {
            recentActivity = await recentActivityResponse.json();
          }
        } catch (error) {
          console.warn("[Investor] Recent activity fetch failed, using fallback:", error.message);
        }

        setSummaryData({
          totalInvestments: totalInvestments?.total || 0,
          totalReturns: totalReturns?.total || "$0",
          activeProjects: activeProjects?.count || 0,
        });
        setPlatformActivity(recentActivity?.activities || []);

        console.log("[Investor] Raw notifications response:", notificationsResponse);
        const formattedNotifications = Array.isArray(notificationsResponse)
          ? notificationsResponse.map((notif) => ({
              message: notif.message || "No message",
              timestamp: notif.timestamp || notif.createdAt || new Date().toISOString(),
              read: notif.read || false,
            }))
          : [];
        console.log("[Investor] Formatted notifications:", formattedNotifications);
        setNotifications(formattedNotifications);
      } catch (error) {
        console.error("[Investor] Error fetching dashboard data:", error.message);
        toast.error(`Error fetching data: ${error.message}`);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [investorId, selectedFilter, selectedDate]);

  const markAsRead = async (message) => {
    try {
      console.log("[Investor] Marking notification as read, message:", message);
      const response = await fetch(`${BASE_URL}/notifications/${investorId}/mark-read`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to mark as read: ${response.status} - ${errorText}`);
      }
      setNotifications((prev) =>
        prev.map((notif) => (notif.message === message ? { ...notif, read: true } : notif))
      );
      toast.success("Notification marked as read");
    } catch (error) {
      console.error("[Investor] Error marking notification as read:", error.message);
      toast.error("Error updating notification");
    }
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
              <h1 className="text-2xl md:text-3xl text-white font-bold">Investor Dashboard</h1>
              <div className="relative flex items-center gap-4">
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                  <FilterButton selected={selectedFilter} setSelected={setSelectedFilter} />
                  <Datepicker selected={selectedDate} setSelected={setSelectedDate} />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="text-gray-300 hover:text-white focus:outline-none"
                    aria-label="Notifications"
                  >
                    <FaBell className="w-6 h-6" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
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
                            key={notif.message}
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
                <h2 className="text-xl font-semibold mb-4 text-white">Summary of Investments</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-600 p-4 rounded-lg text-center">
                    <p className="text-gray-200">Total Investments</p>
                    <h3 className="text-2xl font-bold text-white">{summaryData.totalInvestments}</h3>
                  </div>
                  <div className="bg-green-600 p-4 rounded-lg text-center">
                    <p className="text-gray-200">Total Returns</p>
                    <h3 className="text-2xl font-bold text-white">{summaryData.totalReturns}</h3>
                  </div>
                  <div className="bg-yellow-600 p-4 rounded-lg text-center">
                    <p className="text-gray-200">Active Projects</p>
                    <h3 className="text-2xl font-bold text-white">{summaryData.activeProjects}</h3>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                <Link
                  to="/investor/send-proposals"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Send Proposal
                </Link>
              </div>
            </div>
          </div>
        </main>

        <ChatIcon onClick={() => setIsChatOpen(!isChatOpen)} userId={investorId} />
        <ChatBox
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          userId={investorId}
          recipientId="67c4ecfc55d098ab278540de"
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;