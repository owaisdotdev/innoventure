import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import Home from './pages/Home/Home';
import './css/style.css';
import Navbar from './components/Navbar';
import './charts/ChartjsConfig';
import StartupRoutes from './startup/routes/startupRoutes';
// Import pages
import AdminDashboard from './admin/pages/Dashboard';
import InvestorDashboard from './investor/pages/Dashboard';
import StartupDashboard from './startup/pages/Dashboard';
import UserActivity from './admin/pages/UserActivity';
import Investors from './admin/pages/Investors';
import Startups from './admin/pages/Startups';
import Fydps from './admin/pages/Fydps';
import Login from './pages/Login/Login.jsx';
import SignUp from './pages/Signup/Signup.jsx';
import PendingApprovals from './admin/pages/PendingApprovals';
import ActiveInvestments from './admin/pages/ActiveInvestments';
import CompletedInvestments from './admin/pages/CompletedInvestments';
import SmartContracts from './admin/pages/SmartContracts';
import { AuthContextProvider } from './contexts/AuthContext';
import AuthGuard from './AuthGuard';
function App() {

  const location = useLocation();
  // Show the Navbar only on '/' and '/about' routes
  const showNavbar = location.pathname === '/' || location.pathname === '/about';

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
    <AuthContextProvider>
    {showNavbar && <Navbar />}
    <Routes>
        <Route  path="/login" element={<Login />} />
        <Route  path="/signup" element={<SignUp />} />
        <Route  path="/" element={<Home />} />
        
        {/* Protect these routes with AuthContextProvider */}
          {/* Protected Admin Routes */}
          <Route path="/admin/dashboard" element={<><AdminDashboard /></>} />
          <Route path="/admin/activity" element={<><UserActivity /></>} />
          <Route path="/admin/investors" element={<><Investors /></>} />
          <Route path="/admin/startups" element={<><Startups /></>} />
          <Route path="/admin/fydp-projects" element={<><Fydps /></>} />
          <Route path="/admin/pending-approvals" element={<><PendingApprovals /></>} />
          <Route path="/admin/active-investments" element={<><ActiveInvestments /></>} />
          <Route path="/admin/completed-investments" element={<><CompletedInvestments /></>} />
          <Route path="/admin/smart-contracts" element={<><SmartContracts /></>} />
          
          {/* Protected Investor and Startup Routes */}
          <Route path="/investor/salman" element={<><InvestorDashboard /></>} />
          <Route path="/investor/dashboard" element={<><InvestorDashboard /></>} />
          <Route path="/startup/dashboard" element={<><StartupDashboard /></>} />
        </Routes>

        {/* EFFICIENT ROUTING */}
        <StartupRoutes/>
      </AuthContextProvider>
    </>
  );
}

export default App;
