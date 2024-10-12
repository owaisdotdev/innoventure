import React from 'react';

function DashboardCard12() {
  const recentActivities = [
    {
      date: "Today",
      activities: [
        {
          id: 1,
          iconColor: "bg-violet-500",
          iconPath: "M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z",
          description: "New investment made by John Doe",
          linkText: "View",
          linkUrl: "#",
        },
        {
          id: 2,
          iconColor: "bg-red-500",
          iconPath: "M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z",
          description: "Startup ABC registered",
          linkText: "View",
          linkUrl: "#",
        },
      ],
    },
    {
      date: "Yesterday",
      activities: [
        {
          id: 3,
          iconColor: "bg-green-500",
          iconPath: "M15 13v-3l-5 4 5 4v-3h8a1 1 0 000-2h-8zM21 21h-8a1 1 0 000 2h8v3l5-4-5-4v3z",
          description: "Dispute raised between Investor X and Startup Y",
          linkText: "View",
          linkUrl: "#",
        },
        {
          id: 4,
          iconColor: "bg-sky-500",
          iconPath: "M23 11v2.085c-2.841.401-4.41 2.462-5.8 4.315-1.449 1.932-2.7 3.6-5.2 3.6h-1v2h1c3.5 0 5.253-2.338 6.8-4.4 1.449-1.932 2.7-3.6 5.2-3.6h3l-4-4zM15.406 16.455c.066-.087.125-.162.194-.254.314-.419.656-.872 1.033-1.33C15.475 13.802 14.038 13 12 13h-1v2h1c1.471 0 2.505.586 3.406 1.455zM24 21c-1.471 0-2.505-.586-3.406-1.455-.066.087-.125.162-.194.254-.316.422-.656.873-1.028 1.328.959.878 2.108 1.573 3.628 1.788V25l4-4h-3z",
          description: "Startup XYZ acquired new funding",
          linkText: "View",
          linkUrl: "#",
        },
      ],
    },
  ];

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Recent Activity</h2>
      </header>
      <div className="p-3">
        {recentActivities.map((group, index) => (
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
        ))}
      </div>
    </div>
  );
}

export default DashboardCard12;