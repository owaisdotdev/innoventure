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
        apiUrl = "http://localhost:3000/auth/signup/investor";
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
        apiUrl = "http://localhost:3000/auth/signup/startup";
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
                    <label className="block text-sm text-gray-600 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <label className="block text-sm text-gray-600 mb-1 mt-5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <label className="block text-sm text-gray-600 mb-1 mt-5">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
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
                    <label className="block text-sm text-gray-600 mb-1 mt-5">
                      Business Plan Description <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      name="description"
                      placeholder="Business Plan Description"
                      value={formData.businessPlan.description}
                      onChange={handleBusinessPlanChange}
                      required
                    />
                    <label className="block text-sm text-gray-600 mb-1 mt-5">
                      Industry <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      name="industry"
                      placeholder="Industry"
                      value={formData.businessPlan.industry}
                      onChange={handleBusinessPlanChange}
                      required
                    />
                    <label className="block text-sm text-gray-600 mb-1 mt-5">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      name="role"
                      value={role}
                      onChange={handleRoleChange}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="investor">Investor</option>
                      <option value="startup">Startup/Fyp</option>
                    </select>
                    {role === "investor" && (
                      <>
                        <label className="block text-sm text-gray-600 mb-1 mt-5">
                          Preferred Sectors <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          type="text"
                          name="sectors"
                          placeholder="Preferred Sectors (tech, finance)"
                          value={formData.preferences.sectors.join(",")}
                          onChange={handlePreferencesChange}
                          required
                        />
                        <label className="block text-sm text-gray-600 mb-1 mt-5">
                          Preferred Regions <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          type="text"
                          name="regions"
                          placeholder="Preferred Regions (comma separated)"
                          value={formData.preferences.regions.join(",")}
                          onChange={handlePreferencesChange}
                          required
                        />
                        <label className="block text-sm text-gray-600 mb-1 mt-5">
                          Risk Tolerance <span className="text-red-500">*</span>
                        </label>
                        <select
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          name="riskTolerance"
                          value={formData.preferences.riskTolerance}
                          onChange={handlePreferencesChange}
                          required
                        >
                          <option value="">Select Risk Tolerance</option>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                        <label className="block text-sm text-gray-600 mb-1 mt-5">
                          Minimum Investment <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          type="number"
                          name="minInvestment"
                          placeholder="Minimum Investment"
                          value={formData.criteria.minInvestment}
                          onChange={handleCriteriaChange}
                          required
                        />
                        <label className="block text-sm text-gray-600 mb-1 mt-5">
                          Maximum Investment <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          type="number"
                          name="maxInvestment"
                          placeholder="Maximum Investment"
                          value={formData.criteria.maxInvestment}
                          onChange={handleCriteriaChange}
                          required
                        />
                        <label className="block text-sm text-gray-600 mb-1 mt-5">
                          Investment Horizon <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          type="text"
                          name="investmentHorizon"
                          placeholder="Investment Horizon"
                          value={formData.criteria.investmentHorizon}
                          onChange={handleCriteriaChange}
                          required
                        />
                      </>
                    )}
                    {role === "startup" && (
                      <>
                        <label className="mt-5 block text-sm text-gray-600">
                          Is this a Final Year Design Project (FYDP)?
                          <input
                            type="checkbox"
                            checked={formData.isFydp}
                            onChange={(e) =>
                              setFormData({ ...formData, isFydp: e.target.checked })
                            }
                            className="ml-2"
                          />
                        </label>
                        {formData.isFydp && (
                          <>
                            <label className="block text-sm text-gray-600 mb-1 mt-5">
                              University <span className="text-red-500">*</span>
                            </label>
                            <input
                              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                              type="text"
                              name="university"
                              placeholder="University"
                              value={formData.fydpDetails.university}
                              onChange={handleFydpDetailsChange}
                              required
                            />
                            <label className="block text-sm text-gray-600 mb-1 mt-5">
                              Year <span className="text-red-500">*</span>
                            </label>
                            <input
                              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                              type="number"
                              name="year"
                              placeholder="Year"
                              value={formData.fydpDetails.year}
                              onChange={handleFydpDetailsChange}
                              required
                            />
                            <label className="block text-sm text-gray-600 mb-1 mt-5">
                              Supervisor Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                              type="text"
                              name="supervisorName"
                              placeholder="Supervisor Name"
                              value={formData.fydpDetails.supervisorName}
                              onChange={handleFydpDetailsChange}
                              required
                            />
                            <label className="block text-sm text-gray-600 mb-1 mt-5">
                              GitHub Repository URL <span className="text-red-500">*</span>
                            </label>
                            <input
                              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                              type="text"
                              name="githubRepoUrl"
                              placeholder="GitHub Repository URL"
                              value={formData.fydpDetails.githubRepoUrl}
                              onChange={handleFydpDetailsChange}
                              required
                            />
                            <label className="block text-sm text-gray-600 mb-1 mt-5">
                              Tags <span className="text-red-500">*</span>
                            </label>
                            <input
                              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                              type="text"
                              name="tags"
                              placeholder="Tags (comma separated)"
                              value={formData.fydpDetails.tags.join(",")}
                              onChange={handleFydpDetailsChange}
                              required
                            />
                            <label className="block text-sm text-gray-600 mb-1 mt-5">
                              Remarks
                            </label>
                            <input
                              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                              type="text"
                              name="remarks"
                              placeholder="Remarks"
                              value={formData.fydpDetails.remarks}
                              onChange={handleFydpDetailsChange}
                            />
                          </>
                        )}
                      </>
                    )}
                    <button
                      className="mt-5 tracking-wide font-semibold bg-blue-400 text-white w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      type="submit"
                      disabled={isLoading}
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
                      <span className="ml-3">{isLoading ? "Signing Up..." : "Sign Up"}</span>
                    </button>
                    <p className="mt-6 text-sm text-gray-600 text-center">
                      Already a member?{" "}
                      <Link className="text-blue-500" to="/login">
                        Login
                      </Link>{" "}
                      now!
                    </p>
                    <p className="mt-6 text-xs text-gray-600 text-center">
                      I agree to abide by Blocklance{" "}
                      <a href="#" className="border-b border-gray-500 border-dotted">
                        Terms of Service{" "}
                      </a>
                      and its{" "}
                      <a href="#" className="border-b border-gray-500 border-dotted">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            backgroundSize: "fill",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="flex-1 bg-blue-100 text-center hidden lg:flex"
        >
          <img
            src="https://www.shutterstock.com/image-photo/blockchain-technology-concept-revolutionizing-industries-600nw-2481711293.jpg"
            className="text-center hidden lg:flex object-cover"
            alt=""
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;