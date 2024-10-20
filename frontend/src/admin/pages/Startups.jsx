import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

function Startups() {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await fetch('https://innoventure-api.vercel.app/startups');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Failed to fetch startups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  if (loading) return <p>Loading...</p>;

  const handleOpenModal = (customer = null) => {
    setCurrentCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCustomer(null);
  };

  const handleAddUpdateCustomer = (customer) => {
    if (currentCustomer) {
      // Update existing customer
      setCustomers(customers.map(c => (c._id === customer._id ? customer : c))); // Ensure matching by `_id`
    } else {
      // Add new customer
      setCustomers([...customers, { ...customer, _id: (customers.length + 1).toString() }]);
    }
    handleCloseModal();
  };

  const handleDeleteCustomer = async (id) => {
    try {
      const response = await fetch(`https://innoventure-api.vercel.app/startups/${id}`, {
        method: 'DELETE',
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
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Startups</h2>
        </header>
        <div className="p-3">
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Add Startup
          </button>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
                <tr>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Name</div></th>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Email</div></th>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Industry</div></th>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Funding Needs</div></th>
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
                      <div className="text-left">{customer.businessPlan?.industry || 'N/A'}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{customer.fundingNeeds?.milestones.length > 0 ? 'Yes' : 'No'}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleOpenModal(customer)}
                        className="text-yellow-500 hover:text-yellow-600 mr-2"
                      >
                       <FaPencilAlt/> 
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(customer._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                       <FaTrash/> 
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit Startup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">{currentCustomer ? 'Edit Startup' : 'Add Startup'}</h3>
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

// Assume CustomerForm is defined elsewhere to handle the form submission for adding/editing a startup

export default Startups;
