import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-24 px-6 sm:px-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Heading */}
      <div className="text-center max-w-4xl mx-auto mb-20">
        <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
          Empowering Blockchain-Driven Investments for Innovative Ventures
        </h2>
        <p className="text-lg sm:text-xl text-gray-300">
          This platform bridges the gap between investors and startups by enabling secure, AI-driven investment opportunities, transforming Final Year Design Projects (FYDPs) into real-world solutions.
        </p>
      </div>

      {/* Feature Blocks */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left Features */}
        <div className="flex flex-col gap-16 justify-center">
          {[
            {
              title: 'Secure Investments',
              desc: 'Our platform ensures security with blockchain technology, safeguarding data and transactions for reliable investment opportunities.',
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 19l6.879-6.879M5.121 5l6.879 6.879"
                />
              ),
            },
            {
              title: 'AI-Powered Matching',
              desc: 'Using AI algorithms, our platform connects investors with startups and FYDPs, enhancing investment precision and decision-making.',
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M20.374 18.353A8.001 8.001 0 0116.343 4.516 8.001 8.001 0 013.627 18.353M12 8c1.656 0 3 1.344 3 3v4c0 1.656-1.344 3-3 3s-3-1.344-3-3v-4"
                />
              ),
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-6">
              <div className="bg-blue-700 p-4 rounded-full">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {item.icon}
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-300 text-base leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Features */}
        <div className="flex flex-col gap-16 justify-center">
          {[
            {
              title: 'Smart Contract Automation',
              desc: 'Our platform leverages smart contracts for automating equity distribution and milestone-based funding, streamlining investments.',
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5L20 7" />,
            },
            {
              title: 'Transparent Governance',
              desc: 'Through decentralized governance (DAO), users can vote on key platform decisions, ensuring transparency and fair participation.',
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m1 5h.01m-.01-4h.01M9 12v10m0 0h6m-6 0v-6h6v6z"
                />
              ),
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-6">
              <div className="bg-blue-700 p-4 rounded-full">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {item.icon}
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-300 text-base leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-28 text-center">
        <div className="flex flex-wrap justify-center gap-12 text-gray-300">
          {[
            { title: 'Startups Connected', value: '20+' },
            { title: 'Funding Opportunities', value: '$100k+' },
            { title: 'Investors Engaged', value: '50+' },
          ].map((item, idx) => (
            <div key={idx} className="min-w-[150px]">
              <h4 className="text-lg font-medium text-blue-500">{item.title}</h4>
              <p className="text-3xl font-extrabold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;