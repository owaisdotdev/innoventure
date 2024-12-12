import React from 'react';
import Layout from './Layout';

const FydpsList = () => {
  const fydps = [
    {
      title: 'Smart Agriculture Monitoring System',
      description: 'A project aimed at automating agriculture by using IoT-based sensors to monitor soil moisture, temperature, and other parameters in real-time.',
      university: 'University of Lahore',
      year: '2023',
      category: 'IoT & Automation',
      status: 'Completed',
    },
    {
      title: 'Autonomous Delivery Robot',
      description: 'An autonomous robot designed to navigate urban areas and deliver small packages to doorsteps, powered by AI and computer vision.',
      university: 'NED University',
      year: '2023',
      category: 'AI & Robotics',
      status: 'In Progress',
    },
    {
      title: 'Renewable Energy Management System',
      description: 'A software solution to optimize the usage of renewable energy sources like solar and wind for residential and commercial buildings.',
      university: 'FAST-NUCES',
      year: '2023',
      category: 'Energy Tech',
      status: 'Completed',
    },
  ];

  return (
    <Layout>
      <div className="px-6 py-4">
        <h1 className="text-xl text-gray-800 font-bold mb-4">FYDPs List</h1>
        
        <div className="space-y-6">
          {fydps.map((fydp, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow flex items-start"
            >
              <div className="flex-none bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center text-gray-700 font-bold">
                {fydp.title.charAt(0)}
              </div>

              <div className="ml-6">
                <h2 className="text-lg font-semibold">{fydp.title}</h2>
                <p className="text-xs text-gray-500 mb-2">{fydp.university} • {fydp.year}</p>
                <p className="text-gray-700 mb-3">{fydp.description}</p>
                <div className="flex space-x-3 text-sm">
                  <span className="flex items-center">
                    <span className="material-icons text-green-500 mr-1">category</span>
                    {fydp.category}
                  </span>
                  <span className="flex items-center">
                    <span className="material-icons text-blue-500 mr-1">assignment_turned_in</span>
                    {fydp.status}
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

export default FydpsList;
