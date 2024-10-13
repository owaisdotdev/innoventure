import React, { useState } from "react";

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
    <>
      {shouldShowNavbar && ( // Conditional rendering
        <header className="bg-white w-full py-6 px-4 flex justify-between items-center">
          <div className="text-2xl font-black">Innoventure</div>

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

          {/* Render the navbar only if the selected link is in the list of links to show */}
          <nav className={`hidden md:flex space-x-8`}>
            <a
              href="#invest"
              className={`text-gray-700 hover:text-black ${activeLink === "invest" ? "font-bold" : ""}`}
              onClick={() => handleLinkClick("invest")}
            >
              Invest
            </a>
            <a
              href="#how-it-works"
              className={`text-gray-700 hover:text-black ${activeLink === "how-it-works" ? "font-bold" : ""}`}
              onClick={() => handleLinkClick("how-it-works")}
            >
              How it works
            </a>
            <a
              href="#about"
              className={`text-gray-700 hover:text-black ${activeLink === "about" ? "font-bold" : ""}`}
              onClick={() => handleLinkClick("about")}
            >
              About us
            </a>
          </nav>

          {isOpen && (
            <nav className="absolute top-16 left-0 w-full bg-white flex flex-col items-center md:hidden">
              <a
                href="#invest"
                className="text-gray-700 hover:text-black py-2"
                onClick={() => handleLinkClick("invest")}
              >
                Invest
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-black py-2"
                onClick={() => handleLinkClick("how-it-works")}
              >
                How it works
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-black py-2"
                onClick={() => handleLinkClick("about")}
              >
                About us
              </a>
            </nav>
          )}

          <div className="space-x-4 hidden md:flex">
            <button className="px-4 py-2 text-gray-700 hover:text-black">Login</button>
            <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900">Sign Up</button>
          </div>
        </header>
      )}
    </>
  );
};

export default Navbar;
