import React from "react";
import Typewriter from "typewriter-effect";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <main className="flex flex-col md:flex-row items-center justify-between mt-16 px-6 md:px-20 w-full max-w-7xl">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            We make it easy for everyone to invest
          </h1>
          <h2 className="pb-2 flex space-x-1 text-2xl text-blue-900 font-bold">
           <span> Invest in</span> <Typewriter
            options={{
              strings: ["Startups", "FYPs","Ventures"],
              autoStart: true,
              loop: true,
            }}
          /></h2>
          <p className="text-gray-700 text-lg mb-8">
            At our platform, we believe in empowering individuals from all walks
            of life to embrace the world of investing with ease.
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-black text-white rounded hover:bg-gray-900">
              Start investing
            </button>
            <button className="px-6 py-3 border border-gray-400 rounded hover:bg-gray-100">
              Watch Demo
            </button>
          </div>
        </div>
        <div className="md:w-1/2 h-100  mt-10 md:mt-0 relative">
          <img
            src="https://www.shutterstock.com/image-photo/analysis-finance-grow-graph-market-600nw-2478761707.jpg"
            // https://img.freepik.com/premium-photo/hand-holds-gold-bitcoin-with-blurry-background-stock-exchange-background_193066-800.jpg
            alt="Chart"
            className="rounded-md"
          />
          {/* Diagonally aligned divs for the investment platform */}
          <div className="absolute md:bottom-1 left-1 -bottom-5 md:-left-7  ">
            <div className="bg-gray-200 shadow-2xl shadow-gray-800/80 rounded-lg  p-3 md:w-48 md:p-4 w-40   mb-1">
              <h3 className="text-xs font-semibold text-gray-900">
                Total Investment
              </h3>
              <p className="text-md font-bold">$5,200,000</p>
            </div>
            <div className="bg-gray-200 shadow-2xl shadow-gray-800/80 rounded-lg p-3 md:w-48 md:p-4 w-40 ml-3  md:ml-7">
              <h3 className="text-xs font-semibold text-gray-900">
                Annual Growth
              </h3>
              <p className="text-md font-bold">18%</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
