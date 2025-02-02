import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { getAllSmartContracts } from '../../api/smartContractService';
import Loader from '@/utils/Loader';

function SmartContracts() {
  const [smartContracts, setSmartContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSmartContracts = async () => {
      setLoading(true);
      try {
        const data = await getAllSmartContracts();
        setSmartContracts(data || []);
        setError(null);
      } catch (err) {
        setError("Failed to load smart contracts.");
      } finally {
        setLoading(false);
      }
    };

    fetchSmartContracts();
  }, []);

  return (
    <Layout>
      <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Smart Contracts</h2>
        </header>
        
        <div className="p-3">
          {loading ? (
          <Loader/>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Contract ID</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Escrow Amount</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Milestone Condition</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Milestone Status</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Contract Status</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                  {smartContracts.length > 0 ? (
                    smartContracts.map((contract) => (
                      <tr key={contract._id}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium text-gray-800 dark:text-gray-100">
                            {contract._id}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-center font-medium text-green-500">
                            ${contract.escrowAmount}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-center">
                            {contract.terms?.milestoneConditions || 'N/A'}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-center">
                            {contract.milestoneStatus?.status || 'Pending'}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-center">
                            {contract.status || 'N/A'}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-gray-500">
                        No smart contracts available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default SmartContracts;
