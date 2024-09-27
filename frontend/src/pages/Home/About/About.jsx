import React from 'react'

const About = () => {
  return (
    <section className=" ">
      <div className="py-12 h-screen bg-gray-900"> {/* Dark background */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="lg:text-center">
            <h2
              className="font-heading mb-4 bg-orange-800  px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest text-white uppercase title-font">
              Why choose us?
            </h2>
            <p className="font-heading mt-2  text-3xl leading-8 font-semibold tracking-tight text-white sm:text-4xl">
              We know tech, we know finance. We are fintech experts.
            </p>
          
          </div>

          <div className="mt-20 ">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-800 text-white">
                    <img src="https://www.svgrepo.com/show/503163/api-settings.svg" alt="API Settings" />
                  </div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-300">Powerful API</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-400">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                </dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-800 text-white">
                    <img src="https://www.svgrepo.com/show/503138/webpack.svg" alt="Webpack" />
                  </div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-300">Easy to integrate SDK</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-400"> 
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                </dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-800 text-white">
                    <img src="https://www.svgrepo.com/show/511771/dashboard-671.svg" alt="Dashboard" />
                  </div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-300">Low Transaction Cost</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-400"> 
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                </dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-800 text-white">
                    <img src="https://www.svgrepo.com/show/76267/free-commercial-label.svg" alt="Commercial Label" />
                  </div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-300">Powerful Dashboard</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-400"> 
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                </dd>
              </div>
            </dl>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About
