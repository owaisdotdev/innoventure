import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ConnectKitButton } from "connectkit";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(""); // Track the active link

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false); // Close the menu on link click if open
  };

  // Determine whether to show the navbar based on the active link
  const shouldShowNavbar = ["invest", "how-it-works"].includes(activeLink);

  return (
    <header className="bg-white w-full py-6 px-4 flex justify-between items-center">
      <div className="text-2xl font-black"><Link to="/">Innoventure</Link></div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {/* Hamburger Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

      <nav className={`hidden md:flex space-x-8`}>
        <Link to="/invest" className="text-gray-700 hover:text-black">
          Invest
        </Link>
        <Link to="/how-it-works" className="text-gray-700 hover:text-black">
          How it works
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-black">
          About us
        </Link>
      </nav>

      {isOpen && (
        <nav className="absolute top-16 left-0 w-full bg-white flex flex-col items-center md:hidden">
          <Link to="/invest" className="text-gray-700 hover:text-black py-2">
            Invest
          </Link>
          <Link to="/how-it-works" className="text-gray-700 hover:text-black py-2">
            How it works
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-black py-2">
            About us
          </Link>
        </nav>
      )}

      <div className="space-x-4 hidden md:flex">
      
      <ConnectKitButton/>
        <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-black">
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
