import React from 'react'

const About = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-blue-900 opacity-95"></div>
      <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')"}}></div>

      <div className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header Section */}
          <div className="text-center mb-16 lg:mb-20">
            <span className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-orange-600 to-orange-800 text-xs font-semibold tracking-widest text-white uppercase shadow-lg">
              Why choose us?
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              We know tech, we know finance. <br />
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                We are fintech experts.
              </span>
            </h2>
          </div>

          {/* Features Grid */}
          <div className="mt-12">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:gap-x-12 lg:gap-y-16">
              {[
                {
                  icon: 'https://www.svgrepo.com/show/503163/api-settings.svg',
                  title: 'Blockchain Security',
                  description: 'Ensure trust and transparency in every transaction with blockchain-backed security, providing unparalleled reliability and immutability.'
                },
                {
                  icon: 'https://www.svgrepo.com/show/503138/webpack.svg',
                  title: 'Fraud-Free Investment Environment',
                  description: 'Eliminate scams with blockchain\'s tamper-proof records, ensuring transparency and fairness for every transaction.'
                },
                {
                  icon: 'https://www.svgrepo.com/show/511771/dashboard-671.svg',
                  title: 'Unified Analytics Dashboard',
                  description: 'Manage and monitor your investments through an all-in-one dashboard, offering real-time insights and AI-driven recommendations.'
                },
                {
                  icon: 'https://www.svgrepo.com/show/76267/free-commercial-label.svg',
                  title: 'Customized Funding Solutions',
                  description: 'Empowering FYP teams and startups to identify and connect with funding opportunities tailored to their unique goals.'
                }
              ].map((feature, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -left-1 -top-1 w-24 h-24 bg-blue-600 rounded-xl opacity-10 group-hover:opacity-20 transition-all duration-300 transform group-hover:scale-110"></div>
                  <div className="relative z-10">
                    <dt className="flex items-start">
                      <div className="absolute flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg">
                        <img src={feature.icon} alt={feature.title} className="h-6 w-6" />
                      </div>
                      <div className="ml-20">
                        <p className="text-xl lg:text-2xl font-bold text-white leading-snug">
                          {feature.title}
                        </p>
                        <dd className="mt-2 text-base lg:text-lg text-gray-300 leading-relaxed">
                          {feature.description}
                        </dd>
                      </div>
                    </dt>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* Decorative elements */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-blue-600 opacity-20 blur-3xl"></div>
          <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-orange-600 opacity-20 blur-3xl"></div>
        </div>
      </div>
    </section>
  )
}

export default About