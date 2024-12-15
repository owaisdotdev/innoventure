import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Loader from '@/utils/Loader';


const RecommendedStartups = () => {
  const [startups, setStartups] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await fetch('https://innoventure-api.vercel.app/startups', {
          headers: { accept: 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          setStartups(data);
        } else {
          console.error('Failed to fetch startups');
        }
      } catch (error) {
        console.error('Error fetching startups:', error);
      } finally {
        setIsLoading(false); // Stop loading after fetch
      }
    };

    fetchStartups();
  }, []);

  const handleClick = (id) => {
    navigate(`/investor/startup/${id}`);
  };

  return (
    <Layout>
      <div className="px-6 py-4">
        <h1 className="text-xl text-gray-800 font-bold mb-4">Recommended Startups</h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader /> {/* Show Loader while fetching data */}
          </div>
        ) : (
          <div className="space-y-6">
            {startups.length > 0 ? (
              startups.map((startup) => (
                <div
                  key={startup._id}
                  className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md shadow-blue-100 transition-shadow flex items-start cursor-pointer"
                  onClick={() => handleClick(startup._id)}
                >
                  <div className="flex-none bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center text-gray-700 font-bold">
                    {startup.name?.charAt(0) || '-'}
                  </div>

                  <div className="ml-6">
                    <h2 className="text-lg font-semibold text-gray-800">{startup.name}</h2>
                    <p className="text-xs text-gray-500 mb-2">
                      {startup.fydpDetails?.university || startup.location || 'Unknown Location'} •{' '}
                      {startup.fydpDetails?.year || 'Unknown Year'}
                    </p>
                    <p className="text-gray-700 mb-3 line-clamp-3">
                      {startup.businessPlan?.description || 'No description available'}
                    </p>
                    <div className="flex space-x-3 text-sm">
                      {startup.businessPlan?.industry && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                          {startup.businessPlan.industry}
                        </span>
                      )}
                      {startup.fydpDetails?.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-100 text-purple-800 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No startups found.</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RecommendedStartups;
