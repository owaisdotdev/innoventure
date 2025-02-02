import { useState } from 'react';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('investors');

  return (
    <div className='bg-white'>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-gray-700 mb-6">
          How It Works
        </h1>

        <div className="flex justify-center mb-4">
          <button
            className={`px-6 py-2 mr-4 text-lg font-semibold ${
              activeTab === 'investors' ? 'bg-blue-500 text-white' : 'text-blue-500'
            }`}
            onClick={() => setActiveTab('investors')}
          >
            For Investors
          </button>
          <button
            className={`px-6 py-2 text-lg font-semibold ${
              activeTab === 'startups' ? 'bg-blue-500 text-white' : 'text-blue-500'
            }`}
            onClick={() => setActiveTab('startups')}
          >
            For Startups/FYDPs
          </button>
        </div>

        <div className="mt-8">
          {activeTab === 'investors' ? (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                How Investors Benefit
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Our platform empowers investors with secure and transparent access to equity-based investments in startups and FYDPs.<br />
                Here's how it works:
              </p>

              {/* Cards for Investors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-700">1. Secure Investment via Blockchain</h3>
                  <p className="text-lg text-gray-700">
                    All transactions are powered by blockchain technology, ensuring complete transparency and security. Investments are managed through smart contracts, and all funds are securely held in escrow until conditions are met. Investors have the confidence that their money is safe.
                  </p>
                </div>

                <div className="border p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-700">2. ERC20-Based Equity Tokens</h3>
                  <p className="text-lg text-gray-700">
                    Each investment is represented by an ERC20 token, which acts as a digital share in the startup. These tokens are easily tradeable and transferable, offering liquidity to investors while ensuring that equity ownership is securely managed on the blockchain.
                  </p>
                </div>

                <div className="border p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-700">3. AI-Powered Investor Matching</h3>
                  <p className="text-lg text-gray-700">
                    Our AI-powered matching system helps investors find the best opportunities based on their preferences, investment history, and risk tolerance. The platform uses machine learning and NLP algorithms to analyze both investor profiles and startup data for optimized matching.
                  </p>
                </div>

                <div className="border p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-700">4. Escrow and Milestone-Based Funding</h3>
                  <p className="text-lg text-gray-700">
                    Investments are held in escrow and released according to milestones, ensuring that funds are used effectively. This reduces risk for both investors and startups. Investors can track the progress of their investments and approve or reject future funding releases based on performance.
                  </p>
                </div>

                <div className="border p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-700">5. Real-Time Analytics and Reporting</h3>
                  <p className="text-lg text-gray-700">
                    Investors have access to real-time analytics on the startups they're invested in, including financial health reports, performance updates, and projected ROI. AI-driven insights help investors make data-informed decisions on whether to continue or withdraw from investments.
                  </p>
                </div>

                <div className="border p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-700">6. Decentralized Governance</h3>
                  <p className="text-lg text-gray-700">
                    As part of our decentralized governance (DAO) model, investors have a say in key decisions affecting the platform. Investors can vote on project direction, funding rounds, and more, ensuring that the platform is driven by the collective will of its users.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                How Startups/FYDPs Benefit
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Startups and Final Year Design Projects (FYDPs) benefit from our platform by gaining access to a global network of investors, automated funding solutions, and AI-backed analytics to showcase their potential. Here’s how it works:
              </p>

              {/* Cards for Startups/FYDPs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-700">1. Gaining Investor Exposure</h3>
                  <p className="text-lg text-gray-700">
                    Your startup or FYDP will be visible to a wide range of investors. Our platform offers detailed profiles of each project, including milestones, financial reports, and market potential, increasing your chances of securing investment.
                  </p>
                </div>

                <div className="border p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-700">2. AI-Driven Investment Matching</h3>
                  <p className="text-lg text-gray-700">
                    The platform’s AI system matches startups with investors based on the project’s potential and investor preferences. This helps ensure that your project reaches the right audience of investors who are likely to support your vision.
                  </p>
                </div>

                <div className="border p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-700">3. Secure Funding with Smart Contracts</h3>
                  <p className="text-lg text-gray-700">
                    Our platform uses smart contracts to automate the funding process. As milestones are met, funds are released from escrow to keep your project moving forward. This ensures that investors' funds are used effectively and that the project is completed on time.
                  </p>
                </div>

                <div className="border p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-700">4. Transparent Milestone Tracking</h3>
                  <p className="text-lg text-gray-700">
                    Startups and FYDPs can showcase their progress through transparent milestone tracking, which gives investors confidence that funds are being used appropriately. This system helps both parties stay on track and aligned with project goals.
                  </p>
                </div>

                <div className="border p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-700">5. AI-Assisted Financial Reporting</h3>
                  <p className="text-lg text-gray-700">
                    To increase credibility with investors, startups are required to provide regular financial reports. AI tools will analyze these reports to offer insights on the financial health of your project, helping guide future funding rounds and strategic decisions.
                  </p>
                </div>

                <div className="border p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-700">6. Exposure to University FYDPs</h3>
                  <p className="text-lg text-gray-700">
                    For academic projects, the platform offers visibility and support for Final Year Design Projects (FYDPs), turning student ideas into market-ready products. The platform bridges the gap between academia and industry, allowing students to access funding and mentorship.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='mt-5 flex justify-center items-center'>
          <button className='bg-black px-4 py-2 my-3 text-white rounded'>Let's Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
