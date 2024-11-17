import React from 'react';
import Layout from './Layout';

const RecommendedStartups = () => {
  const startups = [
    {
      name: 'Amarnoot',
      description: 'Amarnoot is an innovative online marketplace platform that connects buyers and sellers from diverse backgrounds. With a user-friendly interface and advanced features.',
      location: 'Brussels',
      year: '2023',
      category: 'Marketplace',
      fundingStage: 'Post-Revenue',
      fundingType: 'VC-backed',
    },
    {  
      name: 'Opento',
      description: 'Our mission is to inspire and empower students to become compassionate, confident, and responsible global citizens, who actively contribute to society and make a positive impact.',
      location: 'Madrid',
      year: '2023',
      category: 'EdTech',
      fundingStage: 'Pre-Revenue',
      fundingType: 'Syndicate',
    },
    {
      name: 'Ninimo',
      description: 'With Ninimo, parents can easily issue a debit card to their children, which is fully controlled through the app. Parents have the power to set spending limits, monitor transactions, and promote financial literacy.',
      location: 'United States',
      year: '2023',
      category: 'FinTech',
      fundingStage: 'Post-Revenue',
      fundingType: 'VC-backed',
    },
  ];

  return (
    <Layout>
      <div className="px-6 py-4">
        <h1 className="text-2xl text-black font-extrabold mb-4">🌟 Recommended Startups</h1>
        
        <div className="flex overflow-x-auto space-x-4 overflow-hidden">
          {startups.map((startup, index) => (
            <div
              key={index}
              className="min-w-[300px] border rounded-lg p-6 shadow-lg  bg-white"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                {startup.name.charAt(0)}
              </div>
              
              <h2 className="text-xl font-semibold mt-4">{startup.name}</h2>
              <p className="text-sm text-gray-600 mb-1">{startup.location} • {startup.year}</p>
              <p className="text-gray-800 mb-3">{startup.description}</p>
              <div className="flex space-x-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{startup.fundingType}</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">{startup.category}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md hover:opacity-90">
            Explore More
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default RecommendedStartups;
