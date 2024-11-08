import React, { useState } from 'react';
import Layout from './Layout';
import { FaCheck, FaTimes } from 'react-icons/fa';

function PendingApprovals() {
  const [approvals, setApprovals] = useState([
    {
      id: '0',
      investmentName: 'Real Estate Project A',
      amount: '$100,000',
      submittedDate: '2024-10-10',
    },
    {
      id: '1',
      investmentName: 'Tech Startup B',
      amount: '$50,000',
      submittedDate: '2024-10-09',
    },
    // Add more pending approvals as needed
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentApproval, setCurrentApproval] = useState(null);

  const handleOpenModal = (approval = null) => {
    setCurrentApproval(approval);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentApproval(null);
  };

  const handleApprove = (id) => {
    // Approve investment logic here
    setApprovals(approvals.filter(approval => approval.id !== id));
    console.log(`Investment with id ${id} approved`);
    handleCloseModal();
  };

    const handleReject = (id) => {
      setApprovals(approvals.filter(approval => approval.id !== id));
      console.log(`Investment with id ${id} rejected`);
      handleCloseModal();
    };

  return (
    <Layout>
      <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Pending Approvals</h2>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Investment Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Amount</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Date Submitted</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                {approvals.map(approval => (
                  <tr key={approval.id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="font-medium text-gray-800 dark:text-gray-100">
                        {approval.investmentName}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium text-green-500">
                        {approval.amount}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{approval.submittedDate}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleApprove(approval.id)}
                        className="text-green-500 hover:text-green-600 mr-2"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleReject(approval.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTimes />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Approve/Reject Investment */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Approve or Reject Investment</h3>
            <p><strong>Investment Name:</strong> {currentApproval?.investmentName}</p>
            <p><strong>Amount:</strong> {currentApproval?.amount}</p>
            <p><strong>Date Submitted:</strong> {currentApproval?.submittedDate}</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => handleApprove(currentApproval.id)} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                Approve
              </button>
              <button onClick={() => handleReject(currentApproval.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                Reject
              </button>
              <button onClick={handleCloseModal} className="bg-gray-200 px-4 py-2 rounded ml-2">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default PendingApprovals;
