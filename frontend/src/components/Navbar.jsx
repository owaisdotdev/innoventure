import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ConnectKitButton } from "connectkit";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            className="h-10 w-10 object-contain"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/NEDUET_logo.svg/800px-NEDUET_logo.svg.png"
            alt="Logo"
          />
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Innoventures
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-black transition duration-200">
            Home
          </Link>
          <Link to="/how-it-works" className="text-gray-600 hover:text-black transition duration-200">
            How it works
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-black transition duration-200">
            About us
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <ConnectKitButton />
          <Link to="/login" className="text-gray-600 hover:text-black px-3 py-1 rounded transition">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <nav className="flex flex-col items-center space-y-2 py-4">
            <Link to="/invest" onClick={toggleMenu} className="text-gray-700 hover:text-black">
              Invest
            </Link>
            <Link to="/how-it-works" onClick={toggleMenu} className="text-gray-700 hover:text-black">
              How it works
            </Link>
            <Link to="/about" onClick={toggleMenu} className="text-gray-700 hover:text-black">
              About us
            </Link>
            <Link to="/login" onClick={toggleMenu} className="text-gray-700 hover:text-black">
              Login
            </Link>
            <Link
              to="/signup"
              onClick={toggleMenu}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;