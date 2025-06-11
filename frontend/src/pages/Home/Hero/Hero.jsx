import React from "react";
import Typewriter from "typewriter-effect";

const LandingPage = () => {
  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-blue-50 to-white">
      <main className="container mx-auto px-6 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6 lg:space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            We make it easy for <span className="text-blue-600">everyone</span> to invest
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 flex items-center gap-2">
            <span>Invest in</span>
            <span className="text-blue-600 min-h-[1.5em] inline-block">
              <Typewriter
                options={{
                  strings: ["Startups", "FYPs", "Ventures"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            At our platform, we believe in empowering individuals from all walks
            of life to embrace the world of investing with ease.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Start investing
            </button>
            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right Content - Image Gallery */}
        <div className="md:w-1/2 relative h-[500px] w-full">
          {/* Main Image */}
          <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl z-10">
            <img
<<<<<<< HEAD
              src="https://www.shutterstock.com/image-photo/analysis-finance-grow-graph-market-600nw-2478761707.jpg"
=======
              src="https://www.neduet.edu.pk/sites/default/files/technologypark/nedpic.jpg"
>>>>>>> e9050eebedf513709703c017fe0c9aa904fbef26
              alt="Investment"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Secondary Image */}
          <div className="absolute bottom-0 left-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-xl">
            <img
<<<<<<< HEAD
              src="https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
=======
              src="https://www.shutterstock.com/image-photo/analysis-finance-grow-graph-market-600nw-2478761707.jpg"
>>>>>>> e9050eebedf513709703c017fe0c9aa904fbef26
              alt="Chart"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Stats Cards */}
          <div className="absolute -bottom-10 -left-10 z-20 flex gap-4">
            <div className="bg-white p-4 rounded-xl shadow-xl w-40">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total Investment
              </h3>
              <p className="text-xl font-bold text-gray-900">$5,200,000</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-xl w-40">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Annual Growth
              </h3>
              <p className="text-xl font-bold text-green-600">18%</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;