import React from 'react';
import { Route } from 'react-router-dom';
import AdminDashboard from './Dashboard';
import UserActivity from './UserActivity';
import Investors from './Investors';
import Startups from './Startups';
import Fydps from './Fydps';
import PendingApprovals from './PendingApprovals';
import ActiveInvestments from './ActiveInvestments';
import CompletedInvestments from './CompletedInvestments';
import SmartContracts from './SmartContracts';

const adminRoutes = (
  <>
    <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
    <Route exact path="/admin/activity" element={<UserActivity />} />
    <Route exact path="/admin/investors" element={<Investors />} />
    <Route exact path="/admin/startups" element={<Startups />} />
    <Route exact path="/admin/fydp-projects" element={<Fydps />} />
    <Route exact path="/admin/pending-approvals" element={<PendingApprovals />} />
    <Route exact path="/admin/active-investments" element={<ActiveInvestments />} />
    <Route exact path="/admin/completed-investments" element={<CompletedInvestments />} />
    <Route exact path="/admin/smart-contracts" element={<SmartContracts />} />
  </>
);

export default adminRoutes;
