import React, { useState } from 'react';
import Layout from './Layout';
import { FaPencil } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';

function Startups() {
  const [customers, setCustomers] = useState([
    {
      id: '0',
      name: 'Alex Shatov',
      email: 'alexshatov@gmail.com',
      location: '🇺🇸',
      spent: '$2,890.66',
    },
    {
      id: '1',
      name: 'Philip Harbach',
      email: 'philip.h@gmail.com',
      location: '🇩🇪',
      spent: '$2,767.04',
    },
    // ... Other customers
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

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
      setCustomers(customers.map(c => (c.id === customer.id ? customer : c)));
    } else {
      // Add new customer
      setCustomers([...customers, { ...customer, id: (customers.length).toString() }]);
    }
    handleCloseModal();
  };

  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  return (
    <Layout>
      <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Customers</h2>
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
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-left">Spent</div></th>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-center">Country</div></th>
                  <th className="p-2 whitespace-nowrap"><div className="font-semibold text-center">Actions</div></th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                {customers.map(customer => (
                  <tr key={customer.id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="font-medium text-gray-800 dark:text-gray-100">{customer.name}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{customer.email}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium text-green-500">{customer.spent}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center">{customer.location}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleOpenModal(customer)}
                        className="text-yellow-500 hover:text-yellow-600 mr-2"
                      >
                       <FaPencil/> 
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(customer.id)}
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

      {/* Modal for Add/Edit Customer */}
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

// Component for the Add/Edit Form
const CustomerForm = ({ customer, onSave, onCancel }) => {
  const [name, setName] = useState(customer ? customer.name : '');
  const [email, setEmail] = useState(customer ? customer.email : '');
  const [spent, setSpent] = useState(customer ? customer.spent : '');
  const [location, setLocation] = useState(customer ? customer.location : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = { id: customer ? customer.id : null, name, email, spent, location };
    onSave(newCustomer);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Spent</label>
        <input
          type="text"
          value={spent}
          onChange={(e) => setSpent(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
        />
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={onCancel} className="mr-2 bg-gray-200 px-4 py-2 rounded">
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {customer ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
}

export default Startups;
