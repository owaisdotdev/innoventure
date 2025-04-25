import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./css/style.css";
import Navbar from "./components/Navbar";
import "./charts/ChartjsConfig";
import StartupRoutes from "./startup/routes/startupRoutes";
import Floating from "./components/Floating";
import HowItWorks from "./pages/How-it-works/How";
import InvestorDashboard from "./investor/pages/Dashboard";
import StartupDashboard from "./startup/pages/Dashboard";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/Signup/Signup.jsx";
import SendProposal from "./investor/pages/SendProposal";
import Proposals from "./startup/pages/Proposals";
import AcceptedProposals from "./startup/pages/AcceptedProposals";
import { AuthContextProvider } from "./contexts/AuthContext";
import AuthGuard from "./AuthGuard";
import adminRoutes from "./admin/pages/adminRoutes";
import InvestorRoutes from "./investor/pages/investorRoutes";
import Milestones from "./investor/pages/Milestones";
import About from "./pages/Home/About/About";

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

// Redirect component for Startup Dashboard
const RedirectToStartupDashboard = () => {
  const navigate = useNavigate();
  const userId = getUserIdSomehow();

  useEffect(() => {
    if (userId) {
      navigate(`/startup/dashboard/${userId}`);
    } else {
      navigate("/login");
    }
  }, [navigate, userId]);

  return null;
};

// Redirect component for Startup Proposals
const RedirectToStartupProposals = () => {
  const navigate = useNavigate();
  const userId = getUserIdSomehow();

  useEffect(() => {
    if (userId) {
      navigate(`/startup/proposals/${userId}`);
    } else {
      navigate("/login");
    }
  }, [navigate, userId]);

  return null;
};

// Redirect component for Accepted Proposals
const RedirectToAcceptedProposals = () => {
  const navigate = useNavigate();
  const userId = getUserIdSomehow();

  useEffect(() => {
    if (userId) {
      navigate(`/startup/accepted-proposals/${userId}`);
    } else {
      navigate("/login");
    }
  }, [navigate, userId]);

  return null;
};

function App() {
  const location = useLocation();

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
          <Route path="/about" element={<About />} />

          {/* Redirects for Dashboards */}
          <Route path="/investor/dashboard" element={<RedirectToUserDashboard />} />
          <Route path="/startup/dashboard" element={<RedirectToStartupDashboard />} />
          <Route path="/startup/proposals" element={<RedirectToStartupProposals />} />
          <Route path="/startup/accepted-proposals" element={<RedirectToAcceptedProposals />} /> {/* Added */}
          <Route path="/investor/milestones" element={<Milestones />} />
          <Route path =""/>
          {/* Protected Routes */}
          <Route>
            {adminRoutes}
            <Route path="/investor/*" element={<InvestorRoutes />} />
            <Route path="/investor/dashboard/:userId" element={<InvestorDashboard />} />
            <Route path="/investor/send-proposals" element={<SendProposal />} />
            <Route path="/startup/dashboard/:userId" element={<StartupDashboard />} />
            <Route path="/startup/proposals/:userId" element={<Proposals />} />
            <Route path="/startup/accepted-proposals/:userId" element={<AcceptedProposals />} /> {/* Updated */}
          </Route>

          {/* Additional Startup Routes */}
          <Route path="/*" element={<StartupRoutes />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;