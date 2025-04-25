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
    <div className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-blue-600">Startups</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Exploring breakthrough success and innovation of the featured startups.
          </p>
        </div>

        {/* Startups Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {startups.map((startup, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Logo Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-3"></div>
              
              <div className="p-6">
                <div className="flex items-start">
                  {/* Logo */}
                  <div className="flex-shrink-0 bg-gradient-to-br from-blue-600 to-blue-800 w-14 h-14 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    {startup.name.charAt(0)}
                  </div>
                  
                  {/* Title and Location */}
                  <div className="ml-4">
                    <h2 className="text-xl font-bold text-gray-900">{startup.name}</h2>
                    <p className="text-sm text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {startup.location} • {startup.year}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-gray-600 line-clamp-3">{startup.description}</p>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {startup.fundingType}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {startup.category}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {startup.fundingStage}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105">
            Explore All Startups
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedStartups;