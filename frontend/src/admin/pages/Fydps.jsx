import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Loader from '@/utils/Loader';

function Fydps() {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await fetch('https://innoventure-api.vercel.app/startups');
        let data = await response.json();
        data = data.filter(result => result?.isFydp === true);
        
        setCustomers(data);
      } catch (error) {
        console.error('Failed to fetch startups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);



 

  

  return (
    <Layout>

{/* test */}
{customers.length === 0 ? <div>No FYDP found</div> : <>
      {loading ? <Loader/> : <> 
        <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Fydps</h2>
        </header>
        <div className="p-3">
          
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
      </>}
    
              </>
              }
    
    </Layout>
  );
}

// Assume CustomerForm is defined elsewhere to handle the form submission for adding/editing a startup

export default Fydps;
