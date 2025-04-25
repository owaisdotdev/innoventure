import React from 'react';

const Footer = () => {
  return (
    <div className="bg-gray-100">
      {/* Call to Action */}
      <div className="max-w-6xl mx-auto text-center py-24 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Ready to start with us?
        </h1>
        <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
          Discover innovative startups and FYDPs, empower your investment journey with blockchain and AI, and ensure secure, fraud-resistant transactions through our platform.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition">
          Sign Up Now!
        </button>
      </div>

      {/* Main Footer */}
      <footer className="bg-slate-900 text-gray-300 pt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Social Section */}
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 pb-6">
            <p className="mb-4 md:mb-0 text-center md:text-left">
              Get connected with us on social networks:
            </p>
            <div className="flex space-x-6">
              {[
                { href: '#', icon: 'facebook-f' },
                { href: '#', icon: 'x-twitter' },
                { href: '#', icon: 'instagram' },
                { href: '#', icon: 'linkedin-in' },
              ].map(({ href, icon }, i) => (
                <a
                  key={i}
                  href={href}
                  className="hover:text-white transition"
                >
                  <i className={`fab fa-${icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 py-10 text-sm">
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Report Issue</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Newsletter</h4>
              <form className="flex flex-col sm:flex-row sm:items-center">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-3 py-2 rounded-md text-gray-900 mb-3 sm:mb-0 sm:mr-2"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Innoventure. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
