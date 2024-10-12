import React from 'react';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCardActiveStartups() {

  const chartData = {
    labels: [], // Add your labels here
    datasets: [
      {
        data: [/* Add data for Active Startups */],
        fill: true,
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          return chartAreaGradient(ctx, chartArea, [
            { stop: 0, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.green[500])}, 0)` },
            { stop: 1, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.green[500])}, 0.2)` }
          ]);
        },
        borderColor: tailwindConfig().theme.colors.green[500],
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="flex flex-col pb-10 col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800">Active Startups</h2>
        </header>
        <div className="text-3xl font-bold text-gray-800">350</div>
      </div>
      
    </div>
  );
}

export default DashboardCardActiveStartups;
