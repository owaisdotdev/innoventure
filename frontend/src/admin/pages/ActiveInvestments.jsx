import React, { useState } from 'react';
import Layout from './Layout';

function ActiveInvestments() {
  const [activeInvestments, setActiveInvestments] = useState([
    {
      id: '0',
      investmentName: 'Real Estate Project B',
      amount: '$250,000',
      startDate: '2024-09-15',
    },
    {
      id: '1',
      investmentName: 'Energy Startup C',
      amount: '$500,000',
      startDate: '2024-08-20',
    },
    // Add more active investments as needed
  ]);

  return (
    <Layout>
      <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Active Investments</h2>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
                <tr>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Investment Name</div></th>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Amount</div></th>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Start Date</div></th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                {activeInvestments.map(investment => (
                  <tr key={investment.id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="font-medium text-gray-800 dark:text-gray-100">{investment.investmentName}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium text-green-500">{investment.amount}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{investment.startDate}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ActiveInvestments;
