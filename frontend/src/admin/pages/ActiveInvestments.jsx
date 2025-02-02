import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getApprovedInvestments, getInvestorById, getStartupById } from '../../api/adminService';
import Loader from '@/utils/Loader';

function ActiveInvestments() {
  const [activeInvestments, setActiveInvestments] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function fetchApprovedInvestments() {
      const investments = await getApprovedInvestments();
      setIsLoading(true);
      if (investments) {
        // Fetch additional details for each investment's investor and startup
        const investmentsWithDetails = await Promise.all(
          investments.map(async (investment) => {
            const investor = await getInvestorById(investment?.investorId);
            const startup = await getStartupById(investment?.startupId);
            return {
              ...investment,
              investorName: investor?.name || 'N/A',
              startupName: startup?.name || 'N/A',
            };
          })
        );
        setActiveInvestments(investmentsWithDetails);
        setIsLoading(false);
      }
    }
    fetchApprovedInvestments();
  }, []);

  return (
    <Layout>
      <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Active Investments</h2>
        </header>
        {isLoading ? <Loader/> : <>
       
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
                <tr>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Startup</div></th>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Investor</div></th>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Amount</div></th>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Investment Date</div></th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                {activeInvestments.map(investment => (
                  <tr key={investment?._id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="font-medium text-gray-800 dark:text-gray-100">{investment?.startupName}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="font-medium text-gray-800 dark:text-gray-100">{investment?.investorName}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium text-green-500">${investment?.amount}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{new Date(investment?.investmentDate).toLocaleDateString()}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </>}
      </div>
    </Layout>
  );
}

export default ActiveInvestments;
