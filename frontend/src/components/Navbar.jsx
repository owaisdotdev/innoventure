import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
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

      <nav className={`hidden md:flex space-x-8`}>
        <a href="#invest" className="text-gray-700 hover:text-black">
          Invest
        </a>
        <a href="#how-it-works" className="text-gray-700 hover:text-black">
          How it works
        </a>
        <a href="#about" className="text-gray-700 hover:text-black">
          About us
        </a>
      </nav>

      {isOpen && (
        <nav className="absolute top-16 left-0 w-full bg-white flex flex-col items-center md:hidden">
          <a href="#invest" className="text-gray-700 hover:text-black py-2">
            Invest
          </a>
          <a href="#how-it-works" className="text-gray-700 hover:text-black py-2">
            How it works
          </a>
          <a href="#about" className="text-gray-700 hover:text-black py-2">
            About us
          </a>
        </nav>
      )}

      <div className="space-x-4 hidden md:flex">
        <button className="px-4 py-2 text-gray-700 hover:text-black">Login</button>
        <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900">Sign Up</button>
      </div>
    </header>
  );
};

export default Navbar;
