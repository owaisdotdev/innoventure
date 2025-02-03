

import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import "./css/style.css";
import Navbar from "./components/Navbar";
import "./charts/ChartjsConfig";
import StartupRoutes from "./startup/routes/startupRoutes";
import Floating from "./components/Floating";

// Importing Pages
import HowItWorks from "./pages/How-it-works/How";
import InvestorDashboard from "./investor/pages/Dashboard";
import StartupDashboard from "./startup/pages/Dashboard";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/Signup/Signup.jsx";

import { AuthContextProvider } from "./contexts/AuthContext";
import AuthGuard from "./AuthGuard";
import adminRoutes from "./admin/pages/adminRoutes";
import InvestorRoutes from "./investor/pages/investorRoutes";

// Function to get user ID from local storage
const getUserIdSomehow = () => {
  return localStorage.getItem("userId");
};

// Redirect component for Investor Dashboard
const RedirectToUserDashboard = () => {
  const navigate = useNavigate();
  const userId = getUserIdSomehow();

  useEffect(() => {
    if (userId) {
      navigate(`/investor/dashboard/${userId}`);
    } else {
      navigate("/login");
    }
  }, [navigate, userId]);

  return null;
};

function App() {
  const location = useLocation();

  // Show Navbar on specific routes
  const showNavbar =
    location.pathname === "/" ||
    location.pathname === "/about" ||
    location.pathname === "/how-it-works" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <>
      <Floating />
      <AuthContextProvider>
        {showNavbar && <Navbar />}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/how-it-works" element={<HowItWorks />} />

          {/* Redirect for Investor Dashboard */}
          <Route path="/investor/dashboard" element={<RedirectToUserDashboard />} />

          {/* Protected Routes */}
          <Route element={<AuthGuard />}>
            {adminRoutes}
            {InvestorRoutes}
            <Route path="/investor/dashboard/:userId" element={<InvestorDashboard />} />
            <Route path="/startup/dashboard" element={<StartupDashboard />} />
          </Route>

          {/* Additional Startup Routes */}
          <Route path="/*" element={<StartupRoutes />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
