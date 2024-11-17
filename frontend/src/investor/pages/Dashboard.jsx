import React, { useState } from 'react';

import Sidebar from '../components/Sidebar';
import Header from '../../partials/Header';
import FilterButton from '../../components/DropdownFilter';
import Datepicker from '../../components/Datepicker';
import DashboardCard01 from './../dashboard/DashboardCard01';
import DashboardCard02 from './../dashboard/DashboardCard02';
import DashboardCard03 from './../dashboard/DashboardCard03';
import DashboardCard04 from './../dashboard/DashboardCard04';
import DashboardCard05 from './../dashboard/DashboardCard05';
import DashboardCard06 from './../dashboard/DashboardCard06';
import DashboardCard07 from './../dashboard/DashboardCard07';
import DashboardCard08 from './../dashboard/DashboardCard08';
import DashboardCard09 from './../dashboard/DashboardCard09';
import DashboardCard10 from './../dashboard/DashboardCard10';
import DashboardCard11 from './../dashboard/DashboardCard11';
import DashboardCard12 from './../dashboard/DashboardCard12';
import DashboardCard13 from './../dashboard/DashboardCard13';


function Dashboard() {
  const summaryData = {
    totalInvestments: 10,
    totalReturns: "$25,000",
    activeProjects: 5,
  };

  const opportunities = [
    { id: 1, name: "Startup A", description: "An innovative tech startup" },
    { id: 2, name: "Project B", description: "A renewable energy project" },
  ];

  const platformActivity = [
    { id: 1, activity: "Investment in Startup A", date: "2024-11-15" },
    { id: 2, activity: "Withdrawal from Project B", date: "2024-11-10" },
    { id: 3, activity: "New Opportunity: Venture C", date: "2024-11-05" },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Investor Dashboard</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton align="right" />
                {/* Datepicker built with flatpickr */}
                <Datepicker align="right" />
                {/* Add view button */}
                <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
                  <svg className="fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="max-xs:sr-only">Add View</span>
                </button>                
              </div>

            </div>

            {/* Cards */}
            <div className="p-6 bg-gray-100 space-y-6 rounded-lg shadow-md">
      {/* Summary Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Summary of Investments</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-gray-600">Total Investments</p>
            <h3 className="text-2xl font-bold">{summaryData.totalInvestments}</h3>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-gray-600">Total Returns</p>
            <h3 className="text-2xl font-bold">{summaryData.totalReturns}</h3>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <p className="text-gray-600">Active Projects</p>
            <h3 className="text-2xl font-bold">{summaryData.activeProjects}</h3>
          </div>
        </div>
      </div>

      {/* Opportunities Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Available Opportunities</h2>
        <table className="table-auto w-full text-left border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-4 py-2">Opportunity</th>
              <th className="border border-gray-200 px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opportunity) => (
              <tr key={opportunity.id} className="odd:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">
                  {opportunity.name}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {opportunity.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Platform Activity Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Platform Activity</h2>
        <table className="table-auto w-full text-left border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-4 py-2">Activity</th>
              <th className="border border-gray-200 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {platformActivity.map((activity) => (
              <tr key={activity.id} className="odd:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">
                  {activity.activity}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {activity.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

          </div>
        </main>



      </div>
    </div>
  );
}

export default Dashboard;