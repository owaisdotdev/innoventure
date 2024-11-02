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

import InvestorDashboard from './investor/pages/Dashboard';
import StartupDashboard from './startup/pages/Dashboard';

import Login from './pages/Login/Login.jsx';
import SignUp from './pages/Signup/Signup.jsx';

import { AuthContextProvider } from './contexts/AuthContext';
import AuthGuard from './AuthGuard';
import adminRoutes from './admin/pages/adminRoutes';
function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/" element={<Home />} />
        
        <Route >
         {adminRoutes}
          <Route path="/investor/salman" element={<InvestorDashboard />} />
          <Route exact path="/investor/dashboard" element={<InvestorDashboard />} />
          <Route exact path="/startup/dashboard" element={<StartupDashboard />} />
        </Route>
      </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
