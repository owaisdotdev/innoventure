
import React from 'react';
import Layout from './Layout';

const InvestmentPortfolio = () => {
  const investments = [
    { id: 1, name: "Startup A", returns: "$5,000", status: "Active" },
    { id: 2, name: "Project B", returns: "$10,000", status: "Completed" },
    { id: 3, name: "Venture C", returns: "$3,000", status: "Active" },
  ];

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
            {investments.map((investment) => (
              <tr key={investment.id} className="border-b last:border-none">
                <td className="px-4 py-2">{investment.name}</td>
                <td className="px-4 py-2">{investment.returns}</td>
                <td className={`px-4 py-2 font-semibold ${
                  investment.status === "Active" ? "text-green-600" : "text-gray-600"
                }`}>
                  {investment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </Layout>
  
  );
};

export default InvestmentPortfolio;
