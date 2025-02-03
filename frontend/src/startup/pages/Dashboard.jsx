import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../partials/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [startup, setStartup] = useState({
    name: "",
    email: "",
    established: "",
    isFydp: false,
    funding: 0,
    investors: [],
    notifications: [],
  });

  const [errors, setErrors] = useState({ name: "", email: "", established: "" });
  const startupId = localStorage.getItem("user");

  // Fetch startup data when the component mounts
  useEffect(() => {
    const fetchStartupData = async () => {
      try {
        const response = await fetch(`https://innoventure-api.vercel.app/startups/${startupId}`);
        if (!response.ok) throw new Error("Failed to fetch startup data");
        const data = await response.json();
        setStartup(data);
      } catch (error) {
        console.error("Error fetching startup data:", error);
        toast.error("Error fetching startup data");
      } finally {
        setLoading(false);
      }
    };
    fetchStartupData();
  }, [startupId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStartup({ ...startup, [name]: type === "checkbox" ? checked : value });
  };

  // Form validation
  const validateForm = () => {
    let formValid = true;
    let validationErrors = { name: "", email: "", established: "" };

    if (!startup.name) {
      validationErrors.name = "Name is required.";
      formValid = false;
    }

    if (!startup.email) {
      validationErrors.email = "Email is required.";
      formValid = false;
    } else if (!/\S+@\S+\.\S+/.test(startup.email)) {
      validationErrors.email = "Invalid email format.";
      formValid = false;
    }

    if (!startup.established) {
      validationErrors.established = "Established year is required.";
      formValid = false;
    }

    setErrors(validationErrors);
    return formValid;
  };

  // Update startup data
  const handleUpdateStartup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setUpdating(true);

    try {
      const response = await fetch(`https://innoventure-api.vercel.app/startups/${startupId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(startup),
      });

      if (!response.ok) throw new Error("Failed to update startup data");

      toast.success("Startup information updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Error updating startup information");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-5xl mx-auto">
            <h1 className="text-3xl text-gray-800 font-bold mb-6">Startup Dashboard</h1>

            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Update Startup Information</h2>
                <form onSubmit={handleUpdateStartup} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-gray-700 font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={startup.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-700 font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={startup.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>

                  {/* Established Year */}
                  <div>
                    <label className="block text-gray-700 font-medium">Established</label>
                    <input
                      type="text"
                      name="established"
                      value={startup.established}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    {errors.established && <p className="text-red-500 text-sm">{errors.established}</p>}
                  </div>

                  {/* Funding */}
                  <div>
                    <label className="block text-gray-700 font-medium">Funding</label>
                    <input
                      type="number"
                      name="funding"
                      value={startup.funding}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  {/* Investors */}
                  <div>
                    <label className="block text-gray-700 font-medium">Investors</label>
                    {startup.investors.length > 0 ? (
                      <ul className="list-disc pl-5 text-gray-700">
                        {startup.investors.map((investor, index) => (
                          <li key={index}>{investor}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700">No investors yet.</p>
                    )}
                  </div>

                  {/* Notifications */}
                  <div>
                    <label className="block text-gray-700 font-medium">Notifications</label>
                    {startup.notifications.length > 0 ? (
                      <ul className="list-disc pl-5 text-gray-700">
                        {startup.notifications.map((notification, index) => (
                          <li key={index}>{notification}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700">No notifications yet.</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={updating}
                    className={`px-6 py-2 rounded-lg text-white ${
                      updating ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    {updating ? "Updating..." : "Save Changes"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
