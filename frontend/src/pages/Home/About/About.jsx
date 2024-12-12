import React from 'react'

const About = () => {
  return (
    <section className=" ">
      <div className="py-10   h-[100vh] my-20 flex justify-center items-center bg-gray-900"> {/* Dark background */}
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
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-300">Blockchain Security
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-400">
                Ensure trust and transparency in every transaction with blockchain-backed security, providing unparalleled reliability and immutability.

</dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-800 text-white">
                    <img src="https://www.svgrepo.com/show/503138/webpack.svg" alt="Webpack" />
                  </div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-300">Fraud-Free Investment Environment
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-400"> 
                Eliminate scams with blockchain’s tamper-proof records, ensuring transparency and fairness for every transaction.



                </dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-800 text-white">
                    <img src="https://www.svgrepo.com/show/511771/dashboard-671.svg" alt="Dashboard" />
                  </div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-300">Unified Analytics Dashboard
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-400"> 
                Manage and monitor your investments through an all-in-one dashboard, offering real-time insights and AI-driven recommendations.

</dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-800 text-white">
                    <img src="https://www.svgrepo.com/show/76267/free-commercial-label.svg" alt="Commercial Label" />
                  </div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-300">Customized Funding Solutions
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-400"> 
                Empowering FYP teams and startups to identify and connect with funding opportunities tailored to their unique goals.

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
