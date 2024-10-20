import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

function Investors() {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch('https://innoventure-api.vercel.app/investors');
      const data = await response.json();
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  const handleOpenModal = (customer = null) => {
    setCurrentCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCustomer(null);
  };

  const handleDeleteCustomer = async (id) => {
    try {
      const response = await fetch(`https://innoventure-api.vercel.app/investors/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setCustomers(customers.filter(customer => customer._id !== id));
      } else {
        console.error('Failed to delete the customer:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while deleting the customer:', error);
    }
  };

  return (
    <Layout>
      <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Investors</h2>
        </header>
        <div className="p-3">
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Add Investor
          </button>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
                <tr>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Name</div></th>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Email</div></th>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Min Investment</div></th>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Max Investment</div></th>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Investment Horizon</div></th>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Risk Tolerance</div></th>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Profile Status</div></th>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-center">Actions</div></th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                {customers.map(customer => (
                  <tr key={customer._id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="font-medium text-gray-800 dark:text-gray-100">{customer.name}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{customer.email}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{customer.criteria?.minInvestment}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{customer.criteria?.maxInvestment}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{customer.criteria?.investmentHorizon}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{customer.preferences?.riskTolerance}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{customer.profileStatus}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleOpenModal(customer)}
                        className="text-yellow-500 hover:text-yellow-600 mr-2"
                      >
                        <FaPencilAlt />
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(customer._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit Investor */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">{currentCustomer ? 'Edit Investor' : 'Add Investor'}</h3>
            <CustomerForm 
              customer={currentCustomer} 
              onSave={handleAddUpdateCustomer} 
              onCancel={handleCloseModal} 
            />
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Investors;
