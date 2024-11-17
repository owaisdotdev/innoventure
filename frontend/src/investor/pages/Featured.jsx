import React from 'react';
import Layout from './Layout';

const FeaturedStartups = () => {
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
        <h1 className="text-xl text-gray-800 font-bold mb-4">Featured Startups</h1>
        
        <div className="space-y-6">
          {startups.map((startup, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 bg-white  shadow-sm hover:shadow-md transition-shadow flex items-start"
            >
              <div className="flex-none w-16 h-16  rounded-full flex items-center justify-center text-gray-700 font-bold">
                {startup.name.charAt(0)}
              </div>
              
              <div className="ml-6">
                <h2 className="text-lg font-semibold">{startup.name}</h2>
                <p className="text-xs text-gray-500 mb-2">{startup.location} • {startup.year}</p>
                <p className="text-gray-700 mb-3">{startup.description}</p>
                <div className="flex space-x-3 text-sm">
                  <span className="flex items-center">
                    <span className="material-icons text-green-500 mr-1">monetization_on</span>
                    {startup.fundingType}
                  </span>
                  <span className="flex items-center">
                    <span className="material-icons text-purple-500 mr-1">category</span>
                    {startup.category}
                  </span>
                  <span className="flex items-center">
                    <span className="material-icons text-blue-500 mr-1">bar_chart</span>
                    {startup.fundingStage}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
            View All
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default FeaturedStartups;
