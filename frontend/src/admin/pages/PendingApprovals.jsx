import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { getPendingInvestments, getInvestorById, getStartupById } from '../../api/adminService';
import Loader from '@/utils/Loader';

function PendingApprovals() {
  const [approvals, setApprovals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentApproval, setCurrentApproval] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      const investments = await getPendingInvestments();
      if (investments) {
        const approvalsWithDetails = await Promise.all(
          investments.map(async (approval) => {
            const investor = await getInvestorById(approval?.investorId);
            const startup = await getStartupById(approval?.startupId);
            return {
              ...approval,
              investorName: investor?.name || 'N/A',
              startupName: startup?.name || 'N/A',
            };
          })
        );
        setApprovals(approvalsWithDetails);
      }
      setIsLoading(false); // Set loading to false after data is fetched
    };
    fetchData();
  }, []);

  const handleOpenModal = (approval = null) => {
    setCurrentApproval(approval);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentApproval(null);
  };

  const handleApprove = async (id) => {
    try {
      await API.put(`/admin-dashboard/investments/approve/${id}`);
      setApprovals((prev) => prev.filter(approval => approval?._id !== id));
      handleCloseModal();
    } catch (error) {
      console.error('Error approving investment:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await API.put(`/admin-dashboard/investments/reject/${id}`);
      setApprovals((prev) => prev.filter(approval => approval?._id !== id));
      handleCloseModal();
    } catch (error) {
      console.error('Error rejecting investment:', error);
    }
  };

  return (
    <Layout>
      <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Pending Approvals</h2>
        </header>
        <div className="p-3">
          {isLoading ? ( // Show loader if data is loading
            <Loader />
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Investment Name</div></th>
                    <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Investor</div></th>
                    <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Startup</div></th>
                    <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Amount</div></th>
                    <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Date Submitted</div></th>
                    <th className="p-2 whitespace-nowrap"><div className="font-semibold text-center">Actions</div></th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                  {approvals?.map(approval => (
                    <tr key={approval?._id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-gray-800 dark:text-gray-100">{approval?.investmentName}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-gray-800 dark:text-gray-100">{approval?.investorName}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-gray-800 dark:text-gray-100">{approval?.startupName}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">${approval?.amount}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{new Date(approval?.investmentDate).toLocaleDateString()}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center flex gap-4 items-center">
                          <button onClick={() => handleApprove(approval?._id)} className="text-green-500 hover:text-green-700"><FaCheck /></button>
                          <button onClick={() => handleReject(approval?._id)} className="text-red-500 hover:text-red-700"><FaTimes /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Investment Details</h3>
              <p><strong>Terms:</strong> {currentApproval?.terms?.conditions}</p>
              <p><strong>Status:</strong> {currentApproval?.escrowStatus?.status}</p>
              <div className="flex mt-4 justify-end gap-2">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded" onClick={() => handleApprove(currentApproval?._id)}>Approve</button>
                <button className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded" onClick={() => handleCloseModal()}>Close</button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded" onClick={() => handleReject(currentApproval?._id)}>Reject</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default PendingApprovals;
