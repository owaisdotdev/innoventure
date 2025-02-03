// import React, { useEffect } from 'react';
// import {
//   Routes,
//   Route,
//   useLocation
// } from 'react-router-dom';
// import Home from './pages/Home/Home';
// import './css/style.css';
// import Navbar from './components/Navbar';
// import './charts/ChartjsConfig';
// import StartupRoutes from './startup/routes/startupRoutes';
// import Floating from './components/Floating';
// // Import pages
// import HowItWorks from './pages/How-it-works/How';
// import InvestorDashboard from './investor/pages/Dashboard';
// import StartupDashboard from './startup/pages/Dashboard';

// import Login from './pages/Login/Login.jsx';
// import SignUp from './pages/Signup/Signup.jsx';

// import { AuthContextProvider } from './contexts/AuthContext';
// import AuthGuard from './AuthGuard';
// import adminRoutes from './admin/pages/adminRoutes';
// import InvestorRoutes from './investor/pages/investorRoutes';
// function App() {

//   const location = useLocation();
//   // Show the Navbar only on '/' and '/about' routes
//   const showNavbar = location.pathname === '/' || location.pathname === '/about' || location.pathname === '/how-it-works' || location.pathname === '/login' || location.pathname === '/signup';

//   useEffect(() => {
//     document.querySelector('html').style.scrollBehavior = 'auto'
//     window.scroll({ top: 0 })
//     document.querySelector('html').style.scrollBehavior = ''
//   }, [location.pathname]); // triggered on route change

//   return (
//     <>
//       <Floating />
//       <AuthContextProvider>
//         {showNavbar && <Navbar />}
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/how-it-works" element={<HowItWorks />} />

//           <Route >
//             {adminRoutes}
//             {InvestorRoutes}
//             <Route path="/investor/salman" element={<InvestorDashboard />} />
//             <Route exact path="/investor/dashboard" element={<InvestorDashboard />} />
//             {/* <Route exact path="/startup/dashboard" element={<StartupDashboard />} /> */}
//           </Route>
//         </Routes>
//         <StartupRoutes />


//       </AuthContextProvider>
//     </>
//   );
// }

// export default App;

import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import './css/style.css';
import Navbar from './components/Navbar';
import './charts/ChartjsConfig';
import StartupRoutes from './startup/routes/startupRoutes';
import Floating from './components/Floating';

// Importing Pages
import HowItWorks from './pages/How-it-works/How';
import InvestorDashboard from './investor/pages/Dashboard';
import StartupDashboard from './startup/pages/Dashboard';
import Login from './pages/Login/Login.jsx';
import SignUp from './pages/Signup/Signup.jsx';

import { AuthContextProvider } from './contexts/AuthContext';
import AuthGuard from './AuthGuard';
import adminRoutes from './admin/pages/adminRoutes';
import InvestorRoutes from './investor/pages/investorRoutes';

const getUserIdSomehow = () => {
  return localStorage.getItem('userId'); // Get user ID from local storage
};

const RedirectToUserDashboard = () => {
  const navigate = useNavigate();
  const userId = getUserIdSomehow();

  useEffect(() => {
    if (userId) {
      navigate(`/investor/dashboard/${userId}`); // Redirect with user ID
    } else {
      navigate('/login'); // Redirect to login if no user ID
    }
  }, [navigate, userId]);

  return null;
};

function App() {
  const location = useLocation();

  const showNavbar =
    location.pathname === '/' ||
    location.pathname === '/about' ||
    location.pathname === '/how-it-works' ||
    location.pathname === '/login' ||
    location.pathname === '/signup';

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  return (
    <>
      <Floating />
      <AuthContextProvider>
        {showNavbar && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />

          {/* Protected Routes with AuthGuard */}
          <Route element={<AuthGuard />}> //task 3
            {adminRoutes}
            <Route path="/investor/dashboard/:userId" element={<InvestorDashboard />} />
            <Route path="/startup/dashboard" element={<StartupDashboard />} />
          </Route>

          {/* Redirect route for investor dashboard */}
          <Route path="/investor/dashboard" element={<RedirectToUserDashboard />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;

