import React from 'react';

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
    <div className="bg-white pt-20 p-6">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-5xl font-bold mb-2">Featured Startups</h1>
        <p className="text-gray-600 mb-8">
          Exploring breakthrough success and innovation of the featured startups.
        </p>
        <div className="space-y-10">
          {startups.map((startup, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow flex"
            >
              {/* Logo on the left side */}
              <div className="flex-none w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {startup.name.charAt(0)}
              </div>
              
              {/* Content on the right side */}
              <div className="ml-6 flex-grow">
                <h2 className="text-2xl font-semibold mb-2">{startup.name}</h2>
                <p className="text-sm text-gray-500 mb-4">{startup.location} • {startup.year}</p> {/* Location and Year */}
                <p className="text-gray-700 mb-4">{startup.description}</p>
                <div className="flex flex-wrap space-x-4 text-sm mb-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{startup.fundingType}</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">{startup.category}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{startup.fundingStage}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-8 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
          See all startups
        </button>
      </div>
    </div>
  );
};

export default FeaturedStartups;
