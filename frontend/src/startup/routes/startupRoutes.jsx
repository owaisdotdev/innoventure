import React, { useEffect, useState } from 'react';
import { Route,Routes } from 'react-router-dom';
import StartupDashboard from '../pages/Dashboard';

// Add other startup-related components
import StartupService from '../api/api';
import ActiveProject from '../pages/ActiveProject/ActiveProject';
import Investors from '../pages/GetInvestors/Investors';
import InvestorDetail from '../pages/GetInvestors/InvestorDetail.jsx';
import Milestone from '../pages/Milestones/Milestone';
import Active_Investors from '../pages/ActiveInvestment/ActiveInvestment';
import AllOffers from '../pages/OfferByInvestor/AllOffers';
import Proposals from '../pages/Proposals/Proposals';

const StartupRoutes = () => {
  const [startup, setStartup] = useState(null); // Single startup fetched by ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Retrieve the ID from localStorage and fetch startup data by ID
    const fetchStartupById = async () => {
      const userId = localStorage.getItem('user'); // Retrieve ID from localStorage
      if (userId) {
        try {
          const data = await StartupService.getStartupById("675d8f1bdfaebd7bdfb533d2");
          console.log(data);
          setStartup(data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchStartupById();
  }, []);
  return (
    <Routes>
      <Route path="/startup/dashboard" element={<StartupDashboard startup={startup} />} />
      <Route path="/startup/active-projects" element={<ActiveProject />} />
      <Route path="/startup/find-investors" element={<Investors startup={startup} />} />
      <Route path="/startup/investor/:id" element={<InvestorDetail startup={startup} />} />
      <Route path="/startup/milestones" element={<Milestone startup={startup} />} />
      <Route path="/startup/active-investor" element={<Active_Investors   startup={startup} />} />
      <Route path="/startup/all-offers" element={<AllOffers   startup={startup} />} />
      <Route path="/startup/proposals" element={<Proposals  startup={startup} />} />
    </Routes>
  );
};
export default StartupRoutes;

// import React, { useEffect, useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import StartupDashboard from '../pages/Dashboard';
// import InvestorDashboard from '../pages/InvestorDashboard';  // ✅ Added Investor Dashboard
// import StartupService from '../api/api';
// // Startup Pages
// import ActiveProject from '../pages/ActiveProject/ActiveProject';
// import Investors from '../pages/GetInvestors/Investors';
// import InvestorDetail from '../pages/GetInvestors/InvestorDetail.jsx';
// import Milestone from '../pages/Milestones/Milestone';
// import Active_Investors from '../pages/ActiveInvestment/ActiveInvestment';
// import AllOffers from '../pages/OfferByInvestor/AllOffers';
// import Proposals from '../pages/Proposals/Proposals';

// // Investor Pages
// import InvestorProfile from '../pages/InvestorProfile/InvestorProfile';
// import InvestmentOpportunities from '../pages/InvestmentOpportunities/InvestmentOpportunities';

// const StartupRoutes = () => {
//   const [startup, setStartup] = useState(null);
//   const [investor, setInvestor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userId = localStorage.getItem('user'); // Retrieve user ID

//       if (userId) {
//         try {
//           const userType = localStorage.getItem('role'); // "startup" or "investor"

//           if (userType === "startup") {
//             const data = await StartupService.getStartupById(userId);
//             setStartup(data);
//           } else if (userType === "investor") {
//             const data = await StartupService.getInvestorById(userId);  // ✅ Fetch investor details
//             setInvestor(data);
//           }
//         } catch (error) {
//           setError(error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <Routes>
//       {/* ✅ Startup Routes */}
//       <Route path="/startup/dashboard" element={<StartupDashboard startup={startup} />} />
//       <Route path="/startup/active-projects" element={<ActiveProject />} />
//       <Route path="/startup/find-investors" element={<Investors startup={startup} />} />
//       <Route path="/startup/investor/:id" element={<InvestorDetail startup={startup} />} />
//       <Route path="/startup/milestones" element={<Milestone startup={startup} />} />
//       <Route path="/startup/active-investor" element={<Active_Investors startup={startup} />} />
//       <Route path="/startup/all-offers" element={<AllOffers startup={startup} />} />
//       <Route path="/startup/proposals" element={<Proposals startup={startup} />} />

//       {/* ✅ Investor Routes - Fixing the Error */}
//       <Route path="/investor/dashboard/:userId" element={<InvestorDashboard />} />
//       <Route path="/investor/profile" element={<InvestorProfile investor={investor} />} />
//       <Route path="/investor/opportunities" element={<InvestmentOpportunities investor={investor} />} />
//     </Routes>
//   );
// };

// export default StartupRoutes;
