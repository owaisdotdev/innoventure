import React, { useState } from 'react';

import Sidebar from '../components/Sidebar';
function Layout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-xl md:text-2xl text-gray-800 dark:text-gray-100 font-bold">Startup Dashboard</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button
                <FilterButton align="right" />
                {/* Datepicker built with flatpickr */}
                {/* <Datepicker align="right" /> */}            
              </div>

            </div>

            {/* Cards */}
            <div className="">
            {children}
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}

export default Layout;