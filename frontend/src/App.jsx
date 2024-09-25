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
        <Route exact path="/investor/dashboard" element={<InvestorDashboard />} />
        <Route exact path="/startup/dashboard" element={<StartupDashboard />} />
      </Routes>
    </>
  );
}

export default App;
