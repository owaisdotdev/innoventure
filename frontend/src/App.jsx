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

// Import pages
import AdminDashboard from './admin/pages/Dashboard';
import InvestorDashboard from './investor/pages/Dashboard';
import StartupDashboard from './startup/pages/Dashboard';
import UserActivity from './admin/pages/UserActivity';
import Investors from './admin/pages/Investors';
import Startups from './admin/pages/Startups';
import Fydps from './admin/pages/Fydps';
import PendingApprovals from './admin/pages/PendingApprovals';
import ActiveInvestments from './admin/pages/ActiveInvestments';
import CompletedInvestments from './admin/pages/CompletedInvestments';
import SmartContracts from './admin/pages/SmartContracts';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
    <Navbar/>
      <Routes>
      
      <Route exact path="/" element={<Home />} />
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        <Route exact path="/admin/activity" element={<UserActivity />} />
        <Route exact path="/admin/investors" element={<Investors />} />
        <Route exact path="/admin/startups" element={<Startups />} />
        <Route exact path="/admin/fydp-projects" element={<Fydps />} />
        <Route exact path="/admin/pending-approvals" element={<PendingApprovals />} />
        <Route exact path="/admin/active-investments" element={<ActiveInvestments/>} />
        <Route exact path="/admin/completed-investments" element={<CompletedInvestments />} />
        <Route exact path="/admin/smart-contracts" element={<SmartContracts />} />
        <Route path="/investor/salman" element={<InvestorDashboard />} />

        <Route exact path="/investor/dashboard" element={<InvestorDashboard />} />
        <Route exact path="/startup/dashboard" element={<StartupDashboard />} />
      </Routes>
    </>
  );
}

export default App;
