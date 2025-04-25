import { useState } from 'react';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('investors');

  return (
    <div className='bg-gradient-to-b from-gray-50 to-white'>
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our platform revolutionizes investment and funding through blockchain and AI technology
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 rounded-full p-1 shadow-sm">
            <button
              className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                activeTab === 'investors' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('investors')}
            >
              For Investors
            </button>
            <button
              className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                activeTab === 'startups' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('startups')}
            >
              For Startups/FYDPs
            </button>
          </div>
        </div>

        <div className="mt-8">
          {activeTab === 'investors' ? (
            <div className="space-y-12">
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  How Investors Benefit
                </h2>
                <p className="text-xl text-gray-600">
                  Our platform empowers investors with secure and transparent access to equity-based investments in startups and FYDPs through cutting-edge blockchain technology and AI-powered matching.
                </p>
              </div>

              {/* Cards for Investors */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                  {
                    title: "Secure Investment via Blockchain",
                    content: "All transactions are powered by blockchain technology, ensuring complete transparency and security. Investments are managed through smart contracts, and all funds are securely held in escrow until conditions are met.",
                    icon: "🔒"
                  },
                  {
                    title: "ERC20-Based Equity Tokens",
                    content: "Each investment is represented by an ERC20 token, which acts as a digital share in the startup. These tokens are easily tradeable and transferable, offering liquidity to investors.",
                    icon: "🪙"
                  },
                  {
                    title: "AI-Powered Investor Matching",
                    content: "Our AI-powered matching system helps investors find the best opportunities based on their preferences, investment history, and risk tolerance using machine learning and NLP algorithms.",
                    icon: "🤖"
                  },
                  {
                    title: "Escrow and Milestone-Based Funding",
                    content: "Investments are held in escrow and released according to milestones, ensuring that funds are used effectively. Investors can track progress and approve future funding releases.",
                    icon: "📊"
                  },
                  {
                    title: "Real-Time Analytics and Reporting",
                    content: "Investors have access to real-time analytics on the startups they're invested in, including financial health reports, performance updates, and projected ROI with AI-driven insights.",
                    icon: "📈"
                  },
                  {
                    title: "Decentralized Governance",
                    content: "As part of our decentralized governance (DAO) model, investors have a say in key decisions affecting the platform through voting on project direction and funding rounds.",
                    icon: "🗳️"
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-blue-100"
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-lg text-gray-600">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  How Startups/FYDPs Benefit
                </h2>
                <p className="text-xl text-gray-600">
                  Startups and Final Year Design Projects (FYDPs) gain access to a global network of investors, automated funding solutions, and AI-backed analytics to showcase their potential.
                </p>
              </div>

              {/* Cards for Startups/FYDPs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                  {
                    title: "Gaining Investor Exposure",
                    content: "Your startup or FYDP will be visible to a wide range of investors with detailed profiles including milestones, financial reports, and market potential.",
                    icon: "👁️"
                  },
                  {
                    title: "AI-Driven Investment Matching",
                    content: "The platform's AI system matches startups with investors based on project potential and investor preferences, ensuring you reach the right audience.",
                    icon: "🔍"
                  },
                  {
                    title: "Secure Funding with Smart Contracts",
                    content: "Our platform uses smart contracts to automate the funding process, releasing funds from escrow as milestones are met to keep your project moving forward.",
                    icon: "🤝"
                  },
                  {
                    title: "Transparent Milestone Tracking",
                    content: "Showcase your progress through transparent milestone tracking, giving investors confidence that funds are being used appropriately.",
                    icon: "✅"
                  },
                  {
                    title: "AI-Assisted Financial Reporting",
                    content: "AI tools analyze financial reports to offer insights on your project's health, helping guide future funding rounds and strategic decisions.",
                    icon: "📑"
                  },
                  {
                    title: "Exposure to University FYDPs",
                    content: "For academic projects, the platform offers visibility and support for Final Year Design Projects, turning student ideas into market-ready products.",
                    icon: "🎓"
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-blue-100"
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-lg text-gray-600">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-16 text-center">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Let's Get Started
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;