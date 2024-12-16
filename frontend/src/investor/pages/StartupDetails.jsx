import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';

const StartupDetails = () => {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);

  useEffect(() => {
    const fetchStartupDetails = async () => {
      try {
        const response = await fetch(`https://innoventure-api.vercel.app/startups/${id}`, {
          headers: { accept: 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          setStartup(data);
        } else {
          console.error('Failed to fetch startup details');
        }
      } catch (error) {
        console.error('Error fetching startup details:', error);
      }
    };

    fetchStartupDetails();
  }, [id]);

  if (!startup) {
    return (
      <Layout>
        <div className="px-6 py-4 flex items-center justify-center">
          <h1 className="text-2xl text-gray-800 font-bold">Loading...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-8 bg-white shadow-md rounded-lg">
        {/* Header Section */}
        <div className="flex items-center space-x-4">
          <div className="flex-none bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-700 font-bold text-2xl">
            {startup.name?.charAt(0) || '-'}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">{startup.name}</h1>
            <p className="text-sm text-gray-500">
              {startup.fydpDetails?.university || startup.location || 'Unknown Location'} •{' '}
              {startup.fydpDetails?.year || 'Unknown Year'}
            </p>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Business Plan</h2>
          <p className="mt-2 text-gray-700 leading-relaxed">
            {startup.businessPlan?.description || 'No description available'}
          </p>
        </div>

        {/* Additional Details */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Industry</h3>
            <p className="text-gray-700 mt-1">
              {startup.businessPlan?.industry || 'Not specified'}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Tags</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {startup.fydpDetails?.tags?.length > 0 ? (
                startup.fydpDetails.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-gray-700">No tags available</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8">
          <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-full shadow-lg text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            Contact Startup
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default StartupDetails;
