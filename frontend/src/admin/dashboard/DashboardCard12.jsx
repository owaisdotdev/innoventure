import React, { useEffect, useState } from 'react';

function DashboardCard12() {
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const response = await fetch('https://innoventure-api.vercel.app/admin-dashboard/recent-activity', {
          method: 'GET',
          headers: {
            'accept': '*/*',
          },
        });
        
        // Check if the response is ok (status 200)
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        
        // Process the fetched data to format it for rendering
        const activities = data.recentInvestments.map((investment) => ({
          id: investment._id,
          iconColor: "bg-violet-500", // You can set this dynamically based on conditions if needed
          iconPath: "M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z",
          description: `New investment of $${investment.amount} made on ${new Date(investment.investmentDate).toLocaleDateString()}`,
          linkText: "View",
          linkUrl: `#investment/${investment._id}`, // Link to view the investment details
        }));

        setRecentActivities([{ date: "Today", activities }]); // Group by date if needed
      } catch (err) {
        console.error('Failed to fetch recent activities', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentActivities();
  }, []);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Recent Activity</h2>
      </header>
      <div className="p-3">
        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          recentActivities.map((group, index) => (
            <div key={index}>
              <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
                {group.date}
              </header>
              <ul className="my-1">
                {group.activities.map((activity) => (
                  <li className="flex px-2" key={activity.id}>
                    <div className={`w-9 h-9 rounded-full shrink-0 ${activity.iconColor} my-2 mr-3`}>
                      <svg className="w-9 h-9 fill-current text-white" viewBox="0 0 36 36">
                        <path d={activity.iconPath} />
                      </svg>
                    </div>
                    <div className="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2">
                      <div className="grow flex justify-between">
                        <div className="self-center">
                          {activity.description}
                        </div>
                        <div className="shrink-0 self-end ml-2">
                          <a className="font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400" href={activity.linkUrl}>
                            {activity.linkText}
                            <span className="hidden sm:inline"> -&gt;</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DashboardCard12;
