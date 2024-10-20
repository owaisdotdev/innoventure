import React, { useEffect, useState } from 'react';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCardActiveStartups() {
  const [activeStartups, setActiveStartups] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the total active startups data from the API
    const fetchActiveStartups = async () => {
      try {
        const response = await fetch('https://innoventure-api.vercel.app/admin-dashboard/active-startups');
        const data = await response.json();
        setActiveStartups(data.activeStartups || 0); // Adjust based on the actual API structure
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch active startups', err);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchActiveStartups();
  }, []);

  

  return (
    <div className="flex flex-col pb-10 col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800">Active Startups</h2>
        </header>
        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="text-3xl font-bold text-gray-800">{activeStartups}</div>
        )}
      </div>
      
      {/* You can add your chart here */}
      {/* <LineChart data={chartData} /> */}

    </div>
  );
}

export default DashboardCardActiveStartups;
