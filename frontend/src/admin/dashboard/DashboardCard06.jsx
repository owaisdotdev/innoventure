import React, { useEffect, useState } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import { tailwindConfig } from '../../utils/Utils';
import { getCountInvestorsStartups } from '../../api/adminService';

function DashboardCard06() {
  const [investorStartupData, setInvestorStartupData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCountInvestorsStartups();
        console.log('Fetched Data:', data);
        
        if (data) {
          const chartValues = {
            activeInvestors: data?.activeInvestors || 0,
            activeStartups: data?.activeStartups || 0,
           
          };
          setInvestorStartupData(chartValues);
        }
      } catch (error) {
        console.error('Error fetching investor and startup data:', error);
      }
    };
    fetchData();
  }, []);

  const chartData = investorStartupData
    ? {
        labels: ['Investors', 'Startups'],
        datasets: [
          {
           
            data: [
              investorStartupData.activeInvestors,
              investorStartupData.activeStartups,
             
            ],
            backgroundColor: [
              tailwindConfig().theme.colors.violet[500],
              tailwindConfig().theme.colors.sky[500],
              
            ],
            hoverBackgroundColor: [
              tailwindConfig().theme.colors.violet[600],
              tailwindConfig().theme.colors.sky[600],
              
            ],
            borderWidth: 0,
          },
        ],
      }
    : null;

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Investors and Startups by Categories</h2>
      </header>
      {chartData ? (
        <DoughnutChart data={chartData} width={389} height={260} />
      ) : (
        <div className="p-5 text-center text-gray-500">Loading chart data...</div>
      )}
    </div>
  );
}

export default DashboardCard06;
