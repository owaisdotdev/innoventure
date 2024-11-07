import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-16 bg-slate-900 px-8">
      {/* Text at the top */}
      <div className="text-center mt-12 mb-20">
        <h2 className="text-3xl font-bold text-white mb-4">
          Empowering Blockchain-Driven Investments for Innovative Ventures.
        </h2>
        <p className="text-gray-300 mb-6">
          This platform bridges the gap between investors and startups by enabling secure, AI-driven investment opportunities, transforming Final Year Design Projects (FYDPs) into real-world solutions.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="flex flex-col space-y-20 justify-center">
          <div className="flex items-start space-x-4">
            <div className="bg-indigo-700 p-3 rounded-full">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 19l6.879-6.879M5.121 5l6.879 6.879"
                ></path>
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-lg text-white">Secure Investments</h4>
              <p className="text-gray-300">
                Our platform ensures security with blockchain technology, safeguarding data and transactions for reliable investment opportunities.
              </p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="flex items-start space-x-4">
            <div className="bg-indigo-700 p-3 rounded-full">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M20.374 18.353A8.001 8.001 0 0116.343 4.516 8.001 8.001 0 013.627 18.353M20.374 18.353A8.001 8.001 0 003.627 18.353M12 8c1.656 0 3 1.344 3 3v4m0 0c0 1.656-1.344 3-3 3s-3-1.344-3-3v-4"
                ></path>
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-lg text-white">AI-Powered Matching</h4>
              <p className="text-gray-300">
                Using AI algorithms, our platform connects investors with startups and FYDPs, enhancing investment precision and decision-making.
              </p>
            </div>
          </div>
        </div>

        {/* Middle - Image */}
        <div className="flex  justify-center">
          <div className="h-[80vh] w-full rounded-lg overflow-hidden">
            <img
              src="https://miro.medium.com/v2/resize:fit:1400/1*4-ZMRssGThgE6iMtAEmZAw.jpeg"
              alt="Blockchain platform interface"
              className="object-cover h-full w-full"
            />
          </div>
        </div>

        {/* Right Side - 2 Features */}
        <div className="flex flex-col space-y-20 justify-center">
          {/* Feature 3 */}
          <div className="flex items-start space-x-4">
            <div className="bg-indigo-700 p-3 rounded-full">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5L20 7"></path>
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-lg text-white">Smart Contract Automation</h4>
              <p className="text-gray-300">
                Our platform leverages smart contracts for automating equity distribution and milestone-based funding, streamlining investments.
              </p>
            </div>
          </div>
          {/* Feature 4 */}
          <div className="flex items-start space-x-4">
            <div className="bg-indigo-700 p-3 rounded-full">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m1 5h.01m-.01-4h.01M9 12v10m0 0h6m-6 0v-6h6v6z"
                ></path>
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-lg text-white">Transparent Governance</h4>
              <p className="text-gray-300">
                Through decentralized governance (DAO), users can vote on key platform decisions, ensuring transparency and fair participation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
