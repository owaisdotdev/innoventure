import React, { useEffect, useState } from 'react';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCardTotalUsers() {
  const [activeInvestors, setActiveInvestors] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActiveInvestors = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin-dashboard/active-investors', {
          method: 'GET',
          headers: {
            'accept': '*/*',
          },
        });
        
        // Check if the response is ok (status 200)
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setActiveInvestors(data.activeInvestors || 0);
      } catch (err) {
        console.error('Failed to fetch active investors', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchActiveInvestors();
  }, []);

 
  return (
    <div className="flex flex-col col-span-full pb-10 sm:col-span-6 xl:col-span-4 bg-white shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800">Active Investors</h2>
        </header>
        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="text-3xl font-bold text-gray-800">{activeInvestors}</div>
        )}
      </div>
      
      {/* Uncomment if you want to display the chart */}
      {/* <LineChart data={chartData} /> */}
      
    </div>
  );
}

export default DashboardCardTotalUsers;
