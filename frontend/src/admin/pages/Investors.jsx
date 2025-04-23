import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Loader from '@/utils/Loader';

function Investors() {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch('http://localhost:3000/investors');
      const data = await response.json();
      setCustomers(data);
      setIsLoading(false)
    };

    fetchCustomers();
  }, []);

  
  

  return (
    <Layout>
      {isLoading ? <Loader/> : <>
        <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Investors</h2>
        </header>
        <div className="p-3">
          
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

      
      </>}

     
     
    </Layout>
  );
}

export default Investors;
