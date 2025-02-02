import React, { useEffect, useState } from 'react';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCardTotalInvestments() {
  const [totalInvestments, setTotalInvestments] = useState({ amount: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the total investments data from the API
    const fetchTotalInvestments = async () => {
      try {
        const response = await fetch('https://innoventure-api.vercel.app/admin-dashboard/total-investments');
        const data = await response.json();
        setTotalInvestments({
          totalAmount: data.totalAmount|| 0, // Adjust to the actual API response structure
          totalCount: data.totalCount || 0,   // Adjust to the actual API response structure
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch total investments', err);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchTotalInvestments();
  }, []);

  return (
    <div className="flex flex-col pb-10 col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800">Total Investment Amount</h2>
        </header>
        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="text-3xl font-bold text-gray-800">${totalInvestments.totalAmount}</div>
        )}
        <div className="text-sm text-gray-500 mt-2">Total Investments: {totalInvestments.totalCount}</div>
      </div>
    </div>
  );
}

export default DashboardCardTotalInvestments;
