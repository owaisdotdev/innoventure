import React from 'react';
import Layout from '@/startup/Layout/Layout';

const Proposals = () => {
  // Dummy proposals data
  const proposals = [
    {
      id: 1,
      title: 'Proposal for Renewable Energy Project',
      description: 'A project aimed at developing solar energy solutions for rural areas.',
      submittedBy: 'John Doe',
      date: '2024-12-10',
      equityOffer: '10%',
      fundingRequired: '$50,000',
      status: 'Pending',
    },
    {
      id: 2,
      title: 'Tech Education Initiative',
      description: 'Proposal to establish coding bootcamps for underprivileged youth.',
      submittedBy: 'Jane Smith',
      date: '2024-12-12',
      equityOffer: '15%',
      fundingRequired: '$75,000',
      status: 'Approved',
    },
    {
      id: 3,
      title: 'Urban Reforestation Plan',
      description: 'Planting 10,000 trees in urban areas to combat climate change.',
      submittedBy: 'Mark Johnson',
      date: '2024-12-14',
      equityOffer: '8%',
      fundingRequired: '$30,000',
      status: 'Rejected',
    },
  ];

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Proposals</h1>
        {proposals.length === 0 ? (
          <div className="flex items-center justify-center h-[60vh] text-xl font-bold">
            No Proposals Found
          </div>
        ) : (
          <div className="space-y-4  ">
            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                className="border p-4 bg-white rounded-md shadow-sm hover:shadow-lg transition"
              >
                <h2 className="text-xl text-blue-900 font-semibold">{proposal.title}</h2>
                <p className="text-blue-900">{proposal.description}</p>
                <div className="mt-4">
               
                  <p className="text-sm">
                    <span className="font-bold">Submission Date:</span> {proposal.date}
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">Equity Offer:</span> {proposal.equityOffer}
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">Funding Required:</span> {proposal.fundingRequired}
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">Status:</span>{' '}
                    <span
                      className={`font-semibold ${
                        proposal.status === 'Pending'
                          ? 'text-yellow-500'
                          : proposal.status === 'Approved'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {proposal.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Proposals;
