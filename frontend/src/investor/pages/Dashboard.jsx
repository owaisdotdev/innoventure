import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../../partials/Header";
import FilterButton from "../../components/DropdownFilter";
import Datepicker from "../../components/Datepicker";
import { toast, ToastContainer } from "react-toastify";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Investment Summary Data
  const [summaryData, setSummaryData] = useState({
    totalInvestments: 0,
    totalReturns: "$0",
    activeProjects: 0,
  });

  // Platform Activity
  const [platformActivity, setPlatformActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // Investor Profile Update State
  const [investorInfo, setInvestorInfo] = useState({
    name: "",
    email: "",
    businessPlan: "",
  });

  // Filter & Date Picker States
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");

  // Get Investor ID from localStorage
  const investorId = localStorage.getItem("user");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch investor's existing information
        const investorResponse = await fetch(
          `https://innoventure-api.vercel.app/investors/${investorId}`
        );
        const investorData = await investorResponse.json();
        setInvestorInfo(investorData);

        // Fetch investment details
        const [totalInvestments, totalReturns, activeProjects] = await Promise.all([
          fetch(`https://innoventure-api.vercel.app/investor-dashboard/${investorId}/total-investment`).then((res) => res.json()),
          fetch(`https://innoventure-api.vercel.app/investor-dashboard/${investorId}/total-returns`).then((res) => res.json()),
          fetch(`https://innoventure-api.vercel.app/investor-dashboard/${investorId}/active-projects`).then((res) => res.json()),
        ]);

        // Fetch platform activity with filters
        let activityUrl = `https://innoventure-api.vercel.app/investor-dashboard/${investorId}/recent-activity`;
        if (selectedFilter !== "All") {
          activityUrl += `?filter=${selectedFilter}`;
        }
        if (selectedDate) {
          activityUrl += `&date=${selectedDate}`;
        }

        const recentActivity = await fetch(activityUrl).then((res) => res.json());

        // Set Data in State
        setSummaryData({
          totalInvestments: totalInvestments?.total || 0,
          totalReturns: totalReturns?.total || "$0",
          activeProjects: activeProjects?.count || 0,
        });

        setPlatformActivity(recentActivity?.activities || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [investorId, selectedFilter, selectedDate]); // Re-fetch when filter or date changes

  // Handle Form Input Change
  const handleChange = (e) => {
    setInvestorInfo({ ...investorInfo, [e.target.name]: e.target.value });
  };

  // Handle Investor Profile Update (PUT Request)
  const handleUpdateInvestor = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://innoventure-api.vercel.app/investors/${investorId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(investorInfo),
        }
      );

      if (!response.ok) throw new Error("Failed to update investor data");

      toast.success("Investor information updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Error updating investor information");
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            
            {/* Dashboard Title */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                Investor Dashboard
              </h1>
              
              {/* Filter & Datepicker */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <FilterButton selected={selectedFilter} setSelected={setSelectedFilter} />
                <Datepicker selected={selectedDate} setSelected={setSelectedDate} />
              </div>
            </div>

            {/* Investment Summary */}
            <div className="p-6 bg-gray-100 space-y-6 rounded-lg shadow-md">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Summary of Investments</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-gray-600">Total Investments</p>
                    <h3 className="text-2xl font-bold">{summaryData.totalInvestments}</h3>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-gray-600">Total Returns</p>
                    <h3 className="text-2xl font-bold">{summaryData.totalReturns}</h3>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <p className="text-gray-600">Active Projects</p>
                    <h3 className="text-2xl font-bold">{summaryData.activeProjects}</h3>
                  </div>
                </div>
              </div>

              {/* Investor Information Update Form */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Update Investor Information</h2>
                <form onSubmit={handleUpdateInvestor} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={investorInfo.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={investorInfo.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Business Plan</label>
                    <textarea
                      name="businessPlan"
                      value={investorInfo.businessPlan}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
