import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { getRecentInvestmentsWithDetails } from '../../api/adminService'; // Import the service function

function UserActivity() {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const data = await getRecentInvestmentsWithDetails();
        console.log('Fetched Investments:', data);
        
        if (data) {
          setInvestments(data);
        }
      } catch (error) {
        console.error('Error fetching recent investments:', error);
      }
    };
    fetchInvestments();
  }, []);

  return (
    <Layout>
      <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Recent Investments</h2>
        </header>      
        <div className="p-3">

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Investor Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Startup</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Amount</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Equity</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Escrow Status</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Investment Date</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                {investments.map((investment) => (
                  <tr key={investment._id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="font-medium text-gray-800 dark:text-gray-100">
                        {investment.investorId?.name || 'N/A'}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium text-gray-800 dark:text-gray-100">
                        {investment.startupId?.name || 'N/A'}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-center font-medium text-green-500">${investment.amount}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-center">{investment.terms?.equity || 0}%</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-center">
                        {investment.escrowStatus?.status || 'N/A'}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-center">
                        {new Date(investment.investmentDate).toLocaleDateString() || 'N/A'}
                      </div>
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

export default UserActivity;
