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
      <div className="text-2xl font-black flex  sapce items-center"> <img className="mr-2 ml-2 md:w-23 w-22 h-10 md:h-12" src="data:image/png;base64,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" alt="" />   <Link to="/"><span className=""> Innoventures </span></Link>
</div>

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
