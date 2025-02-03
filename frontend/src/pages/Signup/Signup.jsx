"use client";
import React, { useState, useEffect } from "react";
import { signupInvestor, signupStartup } from "@/api/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi"; // Import the hooks
import { ConnectKitButton } from "connectkit";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 8px solid rgba(255, 255, 255, 0.3);
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useNavigate();
  const { isConnected, address } = useAccount();

  const [formData, setFormData] = useState({
    address: address || "",
    name: "",
    email: "",
    password: "",
    businessPlan: {
      description: "",
      industry: "",
    },
    profileStatus: "active",
    preferences: {
      sectors: [],
      regions: [],
      riskTolerance: "",
    },
    criteria: {
      minInvestment: "",
      maxInvestment: "",
      investmentHorizon: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleBusinessPlanChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      businessPlan: { ...formData.businessPlan, [name]: value },
    });
  };

  const handlePreferencesChange = (e) => {
    const { name, value } = e.target;
    if (name === "sectors" || name === "regions") {
      setFormData({
        ...formData,
        preferences: {
          ...formData.preferences,
          [name]: value.split(","),
        },
      });
    } else {
      setFormData({
        ...formData,
        preferences: { ...formData.preferences, [name]: value },
      });
    }
  };

  const handleCriteriaChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      criteria: { ...formData.criteria, [name]: value },
    });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.address
    ) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    if (!formData.businessPlan.description || !formData.businessPlan.industry) {
      toast.error("Please fill in business plan details.");
      return false;
    }
    if (
      !formData.preferences.sectors.length ||
      !formData.preferences.regions.length
    ) {
      toast.error("Please select at least one sector and region.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      if (role === "investor") {
        await signupInvestor(formData);
      } else if (role === "startup") {
        await signupStartup(formData);
      }
      toast.success("Signed up successfully!");
      router("/investor/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    document.title = "Blocklance | Sign up";
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex justify-center items-center pt-10">
              <h1 className="h1 heading text-3xl">Join Innoventures, Now!</h1>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="mt-3 flex flex-col items-center">
                <div className="w-full flex-1 mt-3">
                  <form onSubmit={handleSubmit}>
                    <div className="mx-auto max-w-xs">
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="text-sm text-blue-600 hover:underline my-1"
                      >
                        {showPassword ? "Hide Password" : "Show Password"}
                      </button>

                      {/* Business Plan */}
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="text"
                        name="description"
                        placeholder="Business Plan Description"
                        value={formData.businessPlan.description}
                        onChange={handleBusinessPlanChange}
                        required
                      />
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="text"
                        name="industry"
                        placeholder="Industry"
                        value={formData.businessPlan.industry}
                        onChange={handleBusinessPlanChange}
                        required
                      />

                      {/* Preferences */}
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="text"
                        name="sectors"
                        placeholder="Preferred Sectors (tech, finance)"
                        value={formData.preferences.sectors.join(",")}
                        onChange={handlePreferencesChange}
                        required
                      />
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="text"
                        name="regions"
                        placeholder="Preferred Regions (comma separated)"
                        value={formData.preferences.regions.join(",")}
                        onChange={handlePreferencesChange}
                        required
                      />
                      <select
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        name="riskTolerance"
                        value={formData.preferences.riskTolerance}
                        onChange={handlePreferencesChange}
                        placeholder="Risk Tolerance"
                        required
                      >
                        <option value="">Select Risk Tolerance</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>

                      {/* Investment Criteria */}
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="text"
                        name="minInvestment"
                        placeholder="Minimum Investment"
                        value={formData.criteria.minInvestment}
                        onChange={handleCriteriaChange}
                        required
                      />
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="text"
                        name="maxInvestment"
                        placeholder="Maximum Investment"
                        value={formData.criteria.maxInvestment}
                        onChange={handleCriteriaChange}
                        required
                      />
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="text"
                        name="investmentHorizon"
                        placeholder="Investment Horizon"
                        value={formData.criteria.investmentHorizon}
                        onChange={handleCriteriaChange}
                        required
                      />

                      {/* Address Input */}
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={isConnected ? address : "Connect your wallet"}
                        onChange={handleChange}
                        readOnly
                      />

                      <select
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        name="role"
                        value={role}
                        onChange={handleRoleChange}
                        required
                      >
                        <option value="">Select Role</option>
                        <option value="investor">Investor</option>
                        <option value="startup">Startup/Fyp</option>
                      </select>

                      <button
                        className="mt-5 tracking-wide font-semibold bg-blue-400 text-white-500 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        type="submit"
                      >
                        <svg
                          className="w-6 h-6 -ml-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <path d="M20 8v6M23 11h-6" />
                        </svg>
                        <span className="ml-3">Sign Up</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
