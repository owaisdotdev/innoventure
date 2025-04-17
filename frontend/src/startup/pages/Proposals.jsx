import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../../partials/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Proposals() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-5xl mx-auto">
            <h1 className="text-3xl text-white font-bold mb-8 tracking-tight">
              Proposals
            </h1>
            <p className="text-gray-400 text-lg">
              This section is under development.
            </p>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Proposals;