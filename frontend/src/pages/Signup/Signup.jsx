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
          [name]: value.split(",").map((item) => item.trim()),
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
          [name]: value.split(",").map((tag) => tag.trim()),
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

    if (!name || !email || !password) {
      toast.error("Please fill in all required fields.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long.");
      return false;
    }

    if (!businessPlan.description || !businessPlan.industry) {
      toast.error("Please fill in business plan details.");
      return false;
    }

    if (role === "investor") {
      const { preferences, criteria } = formData;
      if (
        preferences.sectors.length === 0 ||
        preferences.regions.length === 0 ||
        !preferences.riskTolerance ||
        !criteria.minInvestment ||
        !criteria.maxInvestment ||
        !criteria.investmentHorizon
      ) {
        toast.error("Please fill in all investor-specific fields.");
        return false;
      }
    }

    if (role === "startup") {
      const { fydpDetails } = formData;
      if (
        formData.isFydp &&
        (!fydpDetails.university ||
          !fydpDetails.year ||
          !fydpDetails.supervisorName ||
          !fydpDetails.githubRepoUrl ||
          fydpDetails.tags.length === 0)
      ) {
        toast.error("Please fill in all FYDP details for startups.");
        return false;
      }
    }

    if (!role) {
      toast.error("Please select a role (Investor or Startup).");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const baseData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        businessPlan: {
          description: formData.businessPlan.description,
          industry: formData.businessPlan.industry,
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
            sectors: formData.preferences.sectors,
            regions: formData.preferences.regions,
            riskTolerance: formData.preferences.riskTolerance,
          },
          criteria: {
            minInvestment: Number(formData.criteria.minInvestment),
            maxInvestment: Number(formData.criteria.maxInvestment),
            investmentHorizon: formData.criteria.investmentHorizon,
          },
        };
      } else if (role === "startup") {
        apiUrl = "https://innoventure-api.vercel.app/auth/signup/startup";
        dataToSend = {
          ...baseData,
          isFydp: formData.isFydp,
          fydpDetails: formData.isFydp
            ? {
                university: formData.fydpDetails.university,
                year: Number(formData.fydpDetails.year),
                supervisorName: formData.fydpDetails.supervisorName,
                githubRepoUrl: formData.fydpDetails.githubRepoUrl,
                tags: formData.fydpDetails.tags,
                remarks: formData.fydpDetails.remarks,
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
        const user = {
          userId: result.userId || result.id || result._id || "temp-id",
          email: formData.email,
          role: role,
        };
        console.log("Logging in with:", user, result.token);
        login(user, result.token);

        setTimeout(() => {
          const redirectPath = `/${role}/dashboard/${user.userId}`;
          console.log("Redirecting to:", redirectPath);
          navigate(redirectPath);
        }, 100);
      } else {
        throw new Error(result.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message);
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
                    {role === "investor" && (
                      <>
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
                          required
                        >
                          <option value="">Select Risk Tolerance</option>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                        <input
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                          type="number"
                          name="minInvestment"
                          placeholder="Minimum Investment"
                          value={formData.criteria.minInvestment}
                          onChange={handleCriteriaChange}
                          required
                        />
                        <input
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                          type="number"
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
                            <input
                              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                              type="text"
                              name="university"
                              placeholder="University"
                              value={formData.fydpDetails.university}
                              onChange={handleFydpDetailsChange}
                              required
                            />
                            <input
                              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                              type="number"
                              name="year"
                              placeholder="Year"
                              value={formData.fydpDetails.year}
                              onChange={handleFydpDetailsChange}
                              required
                            />
                            <input
                              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                              type="text"
                              name="supervisorName"
                              placeholder="Supervisor Name"
                              value={formData.fydpDetails.supervisorName}
                              onChange={handleFydpDetailsChange}
                              required
                            />
                            <input
                              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                              type="text"
                              name="githubRepoUrl"
                              placeholder="GitHub Repository URL"
                              value={formData.fydpDetails.githubRepoUrl}
                              onChange={handleFydpDetailsChange}
                              required
                            />
                            <input
                              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                              type="text"
                              name="tags"
                              placeholder="Tags (comma separated)"
                              value={formData.fydpDetails.tags.join(",")}
                              onChange={handleFydpDetailsChange}
                              required
                            />
                            <input
                              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
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