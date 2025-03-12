import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../partials/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBell, FaUser } from "react-icons/fa";
import ChatIcon from "@/components/ChatIcon";
import ChatBox from "@/components/ChatBox";

const BASE_URL = "http://localhost:3000";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [startup, setStartup] = useState({
    name: "",
    email: "",
    established: "",
    isFydp: false,
    funding: 0,
    investors: [],
    notifications: [],
  });
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStartupData = async () => {
      try {
        setLoading(true);
        console.log("[Startup] Fetching startup data for userId:", userId);

        const startupResponse = await fetch(`${BASE_URL}/startups/${userId}`);
        if (!startupResponse.ok) {
          const errorText = await startupResponse.text();
          throw new Error(`Failed to fetch startup data: ${startupResponse.status} - ${errorText}`);
        }
        const startupData = await startupResponse.json();
        console.log("[Startup] Fetched startup data:", startupData);
        setStartup({
          name: startupData.name || "",
          email: startupData.email || "",
          established: startupData.established || "",
          isFydp: startupData.isFydp || false,
          funding: startupData.funding || 0,
          investors: startupData.investors || [],
          notifications: startupData.notifications || [],
        });

        console.log("[Startup] Fetching notifications for userId:", userId);
        const notificationsResponse = await fetch(`${BASE_URL}/notifications/${userId}`, {
          headers: { "Content-Type": "application/json" },
        });
        console.log(`[Startup] Fetch status: ${notificationsResponse.status}`);
        if (!notificationsResponse.ok) {
          const errorText = await notificationsResponse.text();
          console.error("[Startup] Fetch notifications failed:", errorText);
          throw new Error(`Failed to fetch notifications: ${notificationsResponse.status} - ${errorText}`);
        }
        const notificationsData = await notificationsResponse.json();
        console.log("[Startup] Raw notifications response:", notificationsData);

        const formattedNotifications = Array.isArray(notificationsData)
          ? notificationsData.map((notif) => ({
              message: notif.message || "No message",
              timestamp: notif.timestamp || notif.createdAt || new Date().toISOString(),
              read: notif.read || false,
            }))
          : [];
        console.log("[Startup] Formatted notifications:", formattedNotifications);
        setNotifications(formattedNotifications);
      } catch (error) {
        console.error("[Startup] Error fetching data:", error.message);
        toast.error(`Error fetching data: ${error.message}`);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStartupData();
  }, [userId, navigate]);

  const markAsRead = async (message) => {
    try {
      console.log("[Startup] Marking notification as read, message:", message);
      const response = await fetch(`${BASE_URL}/notifications/${userId}/mark-read`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to mark notification as read: ${response.status} - ${errorText}`);
      }
      setNotifications((prev) =>
        prev.map((notif) => (notif.message === message ? { ...notif, read: true } : notif))
      );
      toast.success("Notification marked as read");
    } catch (error) {
      console.error("[Startup] Error marking notification as read:", error.message);
      toast.error("Failed to mark notification as read");
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
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-5xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <h1 className="text-3xl text-white font-bold">Startup Dashboard</h1>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowUserModal(true)}
                  className="text-gray-300 hover:text-white focus:outline-none"
                  aria-label="User Profile"
                >
                  <FaUser className="w-6 h-6" />
                </button>
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
                        <p className="p-4 text-gray-400">No notifications available</p>
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

            {showUserModal && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
                <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl border border-gray-700">
                  <h2 className="text-2xl font-bold mb-6 text-white">Startup Details</h2>
                  <div className="space-y-5">
                    <div className="flex items-center border-b border-gray-600 pb-2">
                      <label className="text-indigo-400 font-semibold w-1/3">Name</label>
                      <p className="text-gray-100 w-2/3">{startup.name || "N/A"}</p>
                    </div>
                    <div className="flex items-center border-b border-gray-600 pb-2">
                      <label className="text-indigo-400 font-semibold w-1/3">Email</label>
                      <p className="text-gray-100 w-2/3">{startup.email || "N/A"}</p>
                    </div>
                    <div className="flex items-center border-b border-gray-600 pb-2">
                      <label className="text-indigo-400 font-semibold w-1/3">Established Year</label>
                      <p className="text-gray-100 w-2/3">{startup.established || "N/A"}</p>
                    </div>
                    <div className="flex items-center border-b border-gray-600 pb-2">
                      <label className="text-indigo-400 font-semibold w-1/3">Funding</label>
                      <p className="text-gray-100 w-2/3">${startup.funding.toLocaleString() || 0}</p>
                    </div>
                    <div className="flex items-start border-b border-gray-600 pb-2">
                      <label className="text-indigo-400 font-semibold w-1/3">Investors</label>
                      <div className="w-2/3">
                        {startup.investors.length > 0 ? (
                          <ul className="list-disc pl-5 text-gray-100">
                            {startup.investors.map((investor, index) => (
                              <li key={index}>{investor}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-100">No investors yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setShowUserModal(false)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
              <div className="mt-6 flex space-x-4">
                <Link
                  to={`/startup/proposals/${userId}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  View Proposals
                </Link>
                <Link
                  to={`/startup/accepted-proposals/${userId}`}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Accepted Proposals
                </Link>
              </div>
            </div>
          </div>
        </main>

        <ChatIcon onClick={() => setIsChatOpen(!isChatOpen)} userId={userId} />
        <ChatBox
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          userId={userId}
          recipientId="67bf29890c2f666e54f3968f"
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;