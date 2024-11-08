import React, { useState } from 'react';

import Sidebar from '../components/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../../components/DropdownFilter';
import Datepicker from '../../components/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
// import DashboardCard02 from '../partials/dashboard/DashboardCard02';
// import DashboardCard03 from '../partials/dashboard/DashboardCard03';
// import DashboardCard04 from '../partials/dashboard/DashboardCard04';
// import DashboardCard05 from '../partials/dashboard/DashboardCard05';
// import DashboardCard06 from '../partials/dashboard/DashboardCard06';
// import DashboardCard07 from '../partials/dashboard/DashboardCard07';
// import DashboardCard08 from '../partials/dashboard/DashboardCard08';
// import DashboardCard09 from '../partials/dashboard/DashboardCard09';
// import DashboardCard10 from '../partials/dashboard/DashboardCard10';
// import DashboardCard11 from '../partials/dashboard/DashboardCard11';
// import DashboardCard12 from '../partials/dashboard/DashboardCard12';
// import DashboardCard13 from '../partials/dashboard/DashboardCard13';


function Dashboard({startup}) {


  
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
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
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
            <div className="grid grid-cols-12 gap-8">
  {/* Startup Information Card */}
  <div className="col-span-12 md:col-span-6 lg:col-span-4 p-6 bg-white shadow-md rounded-lg">
    <div className="p-4 rounded-lg">
      <h2 className="text-3xl text-gray-800 font-bold mb-6">Startup Information</h2>
      <p className="text-xl"><strong>Name:</strong> {startup?.name}</p>
      <p className="text-xl"><strong>Email:</strong> {startup?.email}</p>
      <p className="text-xl"><strong>Industry:</strong> {startup?.industry}</p>
      <p className="text-xl"><strong>Location:</strong> {startup?.location}</p>
      <p className="text-xl"><strong>Established:</strong> {startup?.established}</p>
      <p className="text-xl"><strong>FYDP Status:</strong> {startup?.isFydp ? 'Yes' : 'No'}</p>
    </div>
  </div>

  {/* Funding Card */}
  <div className="col-span-12 md:col-span-6 lg:col-span-4 p-6 bg-white shadow-md rounded-lg">
    <div className="p-4 rounded-lg">
      <h2 className="text-4xl text-gray-800 font-bold mb-6">Funding</h2>
      <p className="text-xl"><strong>Industry:</strong> {startup?.industry}</p>
      <p className="text-xl"><strong>Location:</strong> {startup?.location}</p>
      <p className="text-xl"><strong>Established:</strong> {startup?.established}</p>
      <p className="text-xl"><strong>FYDP Status:</strong> {startup?.isFydp ? 'Yes' : 'No'}</p>
    </div>
  </div>

  {/* Funding Amount Card */}
  <div className="col-span-12 md:col-span-6 lg:col-span-4 p-6 bg-white shadow-md rounded-lg">
    <div className="p-4 rounded-lg">
      <h2 className="text-4xl text-gray-800 font-bold mb-6">Total Funding</h2>
      <p className="text-5xl font-bold text-blue-900">${startup?.funding?.toLocaleString()}</p>
    </div>
  </div>

  {/* Documents Card */}
  <div className="col-span-12 md:col-span-6 lg:col-span-4 p-6 bg-white shadow-md rounded-lg">
    <div className="p-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Documents</h2>
      {startup?.documents.length > 0 ? (
        <ul>
          {startup?.documents.map((doc, index) => (
            <li key={index} className="text-xl">{doc}</li>
          ))}
        </ul>
      ) : (
        <p className="text-xl text-gray-700">No documents available.</p>
      )}
    </div>
  </div>

  {/* Investors Card */}
  <div className="col-span-12 md:col-span-6 lg:col-span-4 p-6 bg-white shadow-md rounded-lg">
    <div className="p-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Investors</h2>
      {startup?.investors.length > 0 ? (
        <ul>
          {startup?.investors.map((investor, index) => (
            <li key={index} className="text-xl">{investor}</li>
          ))}
        </ul>
      ) : (
        <p className="text-xl text-gray-700">No investors added yet.</p>
      )}
    </div>
  </div>

  {/* Progress Reports Card */}
  <div className="col-span-12 md:col-span-6 lg:col-span-4 p-6 bg-white shadow-md rounded-lg">
    <div className="p-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Progress Reports</h2>
      {startup?.progressReports.length > 0 ? (
        <ul>
          {startup?.progressReports.map((report, index) => (
            <li key={index} className="text-xl">{report}</li>
          ))}
        </ul>
      ) : (
        <p className="text-xl text-gray-700">No progress reports available.</p>
      )}
    </div>
  </div>

  {/* Notifications Card */}
  <div className="col-span-12 p-6 bg-white shadow-md rounded-lg">
    <div className="p-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notifications</h2>
      {startup?.notifications.length > 0 ? (
        <ul>
          {startup?.notifications.map((notification, index) => (
            <li key={index} className="text-xl">{notification}</li>
          ))}
        </ul>
      ) : (
        <p className="text-xl text-gray-700">No notifications yet.</p>
      )}
    </div>
  </div>
</div>


          </div>
        </main>



      </div>
    </div>
  );
}

export default Dashboard;