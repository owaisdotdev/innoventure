import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import axios from 'axios';

const InvestmentPortfolio = () => {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get('https://innoventure-api.vercel.app/investor-dashboard/675d8f1bdfaebd7bdfb533cc/portfolio')
      .then((response) => {
        // Update the state with the API response
        const apiData = response.data.map((item) => ({
          name: item.startupName,
          returns: `$${item.amount}`, // Assuming "amount" represents the returns
          status: item.status.charAt(0).toUpperCase() + item.status.slice(1), // Capitalize status
        }));
        setInvestments(apiData);
      })
      .catch((error) => {
        console.error('Error fetching investments:', error);
      });
  }, []);

  return (
    <Layout>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Investment Portfolio</h2>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <table className="table-auto w-full text-left">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-2">Investment</th>
                <th className="px-4 py-2">Returns</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {investments.length > 0 ? (
                investments.map((investment, index) => (
                  <tr key={index} className="border-b last:border-none">
                    <td className="px-4 py-2">{investment.name}</td>
                    <td className="px-4 py-2">{investment.returns}</td>
                    <td
                      className={`px-4 py-2 font-semibold ${
                        investment.status === 'Active'
                          ? 'text-green-600'
                          : investment.status === 'Pending'
                          ? 'text-yellow-600'
                          : 'text-gray-600'
                      }`}
                    >
                      {investment.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    No investments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default InvestmentPortfolio;
