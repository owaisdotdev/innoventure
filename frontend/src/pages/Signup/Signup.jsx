"use client";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; // Adjust path

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
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    businessPlan: { description: "", industry: "" },
    profileStatus: "active",
    preferences: { sectors: [], regions: [], riskTolerance: "" },
    criteria: { minInvestment: "", maxInvestment: "", investmentHorizon: "" },
    isFydp: false,
    fydpDetails: {
      university: "",
      year: "",
      supervisorName: "",
      githubRepoUrl: "",
      tags: [],
      remarks: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({ ...formData, isFydp: e.target.value === "startup" });
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

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
          [name]: value ? value.split(",").map((item) => item.trim()) : [],
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

  const handleFydpDetailsChange = (e) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setFormData({
        ...formData,
        fydpDetails: {
          ...formData.fydpDetails,
          [name]: value ? value.split(",").map((tag) => tag.trim()) : [],
        },
      });
    } else {
      setFormData({
        ...formData,
        fydpDetails: { ...formData.fydpDetails, [name]: value },
      });
    }
  };

  const validateForm = () => {
    const { name, email, password, businessPlan } = formData;

    // Common validations
    if (!name.trim()) {
      toast.error("Name is required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return false;
    }

    if (!businessPlan.description.trim()) {
      toast.error("Business plan description is required.");
      return false;
    }

    if (!businessPlan.industry.trim()) {
      toast.error("Business plan industry is required.");
      return false;
    }

    if (!role) {
      toast.error("Please select a role (Investor or Startup).");
      return false;
    }

    // Investor-specific validations
    if (role === "investor") {
      const { preferences, criteria } = formData;
      if (!preferences.sectors.length || preferences.sectors.some((s) => !s.trim())) {
        toast.error("Please provide at least one valid sector (comma-separated).");
        return false;
      }
      if (!preferences.regions.length || preferences.regions.some((r) => !r.trim())) {
        toast.error("Please provide at least one valid region (comma-separated).");
        return false;
      }
      if (!["Low", "Medium", "High"].includes(preferences.riskTolerance)) {
        toast.error("Please select a valid risk tolerance (Low, Medium, High).");
        return false;
      }
      const minInvestment = Number(criteria.minInvestment);
      const maxInvestment = Number(criteria.maxInvestment);
      if (!criteria.minInvestment || minInvestment <= 0) {
        toast.error("Minimum investment must be a positive number.");
        return false;
      }
      if (!criteria.maxInvestment || maxInvestment <= 0) {
        toast.error("Maximum investment must be a positive number.");
        return false;
      }
      if (minInvestment > maxInvestment) {
        toast.error("Minimum investment cannot exceed maximum investment.");
        return false;
      }
      if (!criteria.investmentHorizon.trim()) {
        toast.error("Investment horizon is required.");
        return false;
      }
    }

    // Startup-specific validations
    if (role === "startup" && formData.isFydp) {
      const { fydpDetails } = formData;
      if (!fydpDetails.university.trim()) {
        toast.error("University is required for FYDP.");
        return false;
      }
      const year = Number(fydpDetails.year);
      if (!fydpDetails.year || isNaN(year) || year < 2000 || year > new Date().getFullYear() + 1) {
        toast.error("Please provide a valid year (2000 to next year).");
        return false;
      }
      if (!fydpDetails.supervisorName.trim()) {
        toast.error("Supervisor name is required for FYDP.");
        return false;
      }
      const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
      if (!fydpDetails.githubRepoUrl.trim() || !urlRegex.test(fydpDetails.githubRepoUrl)) {
        toast.error("Please provide a valid GitHub repository URL.");
        return false;
      }
      if (!fydpDetails.tags.length || fydpDetails.tags.some((t) => !t.trim())) {
        toast.error("Please provide at least one valid tag (comma-separated).");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const baseData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        businessPlan: {
          description: formData.businessPlan.description.trim(),
          industry: formData.businessPlan.industry.trim(),
        },
        profileStatus: formData.profileStatus,
      };

      let apiUrl = "";
      let dataToSend = {};

      if (role === "investor") {
        apiUrl = "https://innoventure-api.vercel.app/auth/signup/investor";
        dataToSend = {
          ...baseData,
          preferences: {
            sectors: formData.preferences.sectors.filter((s) => s.trim()),
            regions: formData.preferences.regions.filter((r) => r.trim()),
            riskTolerance: formData.preferences.riskTolerance,
          },
          criteria: {
            minInvestment: Number(formData.criteria.minInvestment),
            maxInvestment: Number(formData.criteria.maxInvestment),
            investmentHorizon: formData.criteria.investmentHorizon.trim(),
          },
        };
      } else if (role === "startup") {
        apiUrl = "https://innoventure-api.vercel.app/auth/signup/startup";
        dataToSend = {
          ...baseData,
          isFydp: formData.isFydp,
          fydpDetails: formData.isFydp
            ? {
                university: formData.fydpDetails.university.trim(),
                year: Number(formData.fydpDetails.year),
                supervisorName: formData.fydpDetails.supervisorName.trim(),
                githubRepoUrl: formData.fydpDetails.githubRepoUrl.trim(),
                tags: formData.fydpDetails.tags.filter((t) => t.trim()),
                remarks: formData.fydpDetails.remarks.trim(),
              }
            : undefined,
        };
      }

      console.log("Sending data:", dataToSend);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        toast.success("Signed up successfully!");
        const userId = result.userId || result.id || result._id;
        if (!userId) {
          throw new Error("User ID not found in response");
        }
        const user = {
          userId,
          email: formData.email.trim(),
          role,
        };
        localStorage.setItem("userId", userId);
        localStorage.setItem("role", role);
        console.log("Logging in with:", user, result.token);
        login(user, result.token);

        setTimeout(() => {
          const redirectPath = `/${role}/dashboard/${userId}`;
          console.log("Redirecting to:", redirectPath);
          navigate(redirectPath, { replace: true });
        }, 100);
      } else {
        throw new Error(result.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Blocklance | Sign up";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 text-gray-900 flex justify-center items-center p-4">
  <div className="max-w-6xl w-full bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col lg:flex-row">
    {/* Left Column - Form */}
    <div className="w-full lg:w-1/2 p-6 sm:p-12">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Join Innoventures</h1>
        <p className="text-gray-500 mb-8">Start your innovation journey today</p>
        
        {isLoading ? (
          <div className="w-full flex justify-center py-12">
            <Loader />
          </div>
        ) : (
          <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-3 text-gray-500 hover:text-blue-600"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Business Plan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Plan Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[100px]"
                  name="description"
                  placeholder="Describe your business idea or investment interests..."
                  value={formData.businessPlan.description}
                  onChange={handleBusinessPlanChange}
                  required
                />
              </div>
              
              {/* Industry */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  type="text"
                  name="industry"
                  placeholder="Technology, Healthcare, Finance..."
                  value={formData.businessPlan.industry}
                  onChange={handleBusinessPlanChange}
                  required
                />
              </div>
              
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleRoleChange({ target: { value: "investor" } })}
                    className={`py-3 px-4 rounded-lg border transition-all ${role === "investor" ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-300 hover:border-blue-300"}`}
                  >
                    Investor
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange({ target: { value: "startup" } })}
                    className={`py-3 px-4 rounded-lg border transition-all ${role === "startup" ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-300 hover:border-blue-300"}`}
                  >
                    Startup/FYP
                  </button>
                </div>
              </div>
              
              {/* Investor Fields */}
              {role === "investor" && (
                <div className="space-y-6 bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-700">Investor Preferences</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Sectors <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      type="text"
                      name="sectors"
                      placeholder="Tech, Finance, Healthcare (comma separated)"
                      value={formData.preferences.sectors.join(",")}
                      onChange={handlePreferencesChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Regions <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      type="text"
                      name="regions"
                      placeholder="North America, Europe, Asia (comma separated)"
                      value={formData.preferences.regions.join(",")}
                      onChange={handlePreferencesChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Risk Tolerance <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Low", "Medium", "High"].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => handlePreferencesChange({ target: { name: "riskTolerance", value: level } })}
                          className={`py-2 px-3 rounded-lg border transition-all ${formData.preferences.riskTolerance === level ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-300 hover:border-blue-300"}`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Min Investment ($) <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        type="number"
                        name="minInvestment"
                        placeholder="1000"
                        value={formData.criteria.minInvestment}
                        onChange={handleCriteriaChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max Investment ($) <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        type="number"
                        name="maxInvestment"
                        placeholder="100000"
                        value={formData.criteria.maxInvestment}
                        onChange={handleCriteriaChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Investment Horizon <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      name="investmentHorizon"
                      value={formData.criteria.investmentHorizon}
                      onChange={handleCriteriaChange}
                      required
                    >
                      <option value="">Select Horizon</option>
                      <option value="Short-term (1-2 years)">Short-term (1-2 years)</option>
                      <option value="Medium-term (3-5 years)">Medium-term (3-5 years)</option>
                      <option value="Long-term (5+ years)">Long-term (5+ years)</option>
                    </select>
                  </div>
                </div>
              )}
              
              {/* Startup Fields */}
              {role === "startup" && (
                <div className="space-y-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isFydp"
                      checked={formData.isFydp}
                      onChange={(e) => setFormData({ ...formData, isFydp: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isFydp" className="ml-2 block text-sm text-gray-700">
                      This is a Final Year Design Project (FYDP)
                    </label>
                  </div>
                  
                  {formData.isFydp && (
                    <div className="space-y-6 bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-700">FYDP Details</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          University <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          type="text"
                          name="university"
                          placeholder="University Name"
                          value={formData.fydpDetails.university}
                          onChange={handleFydpDetailsChange}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Year <span className="text-red-500">*</span>
                          </label>
                          <input
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            type="number"
                            name="year"
                            placeholder="2023"
                            value={formData.fydpDetails.year}
                            onChange={handleFydpDetailsChange}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Supervisor <span className="text-red-500">*</span>
                          </label>
                          <input
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            type="text"
                            name="supervisorName"
                            placeholder="Dr. Smith"
                            value={formData.fydpDetails.supervisorName}
                            onChange={handleFydpDetailsChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          GitHub Repository URL <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          type="url"
                          name="githubRepoUrl"
                          placeholder="https://github.com/your-repo"
                          value={formData.fydpDetails.githubRepoUrl}
                          onChange={handleFydpDetailsChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tags <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          type="text"
                          name="tags"
                          placeholder="AI, Blockchain, IoT (comma separated)"
                          value={formData.fydpDetails.tags.join(",")}
                          onChange={handleFydpDetailsChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Remarks
                        </label>
                        <textarea
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[80px]"
                          name="remarks"
                          placeholder="Any additional information..."
                          value={formData.fydpDetails.remarks}
                          onChange={handleFydpDetailsChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Submit Button */}
              <button
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-md transition-all duration-300 flex items-center justify-center"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                    </svg>
                    Sign Up
                  </>
                )}
              </button>
              
              {/* Login Link */}
              <div className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                  Log in here
                </Link>
              </div>
              
              {/* Terms */}
              <div className="text-xs text-gray-400 text-center">
                By signing up, you agree to our{' '}
                <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and{' '}
                <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
    
    {/* Right Column - Image */}
    <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-400 relative">
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-12">
        <div className="text-white text-center">
          <h2 className="text-4xl font-bold mb-4">Innovate. Collaborate. Succeed.</h2>
          <p className="text-xl mb-8">Join our platform to connect with like-minded innovators and investors</p>
          <div className="flex justify-center space-x-4">
            <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              <p>Growth</p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <p>Security</p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <p>Community</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ToastContainer position="top-center" autoClose={3000} />
</div>
  );
}

export default SignUp;