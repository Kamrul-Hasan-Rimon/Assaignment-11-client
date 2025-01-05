import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="fixed top-0 left-0 z-50 navbar flex justify-between pr-10 bg-gradient-to-r from-[#1a1a1d] via-[#4e4e50] to-[#1a1a1d] p-4 shadow-2xl backdrop-blur-lg border border-gray-700">
      <div className="navbar-start">
        <Link
          to="/"
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FF8C00] tracking-wide transform hover:scale-110 hover:rotate-2 transition-all duration-500"
        >
          ✨LuxeStay
        </Link>

      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-8">
          <li>
            <Link
              href="#home"
              className="text-lg font-semibold text-white tracking-wider transition-all duration-300 relative group"
            >
              Home
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] group-hover:w-full transition-all duration-500"></span>
            </Link>
          </li>
          <li>
            <Link
              to={'/rooms'}
              className="text-lg font-semibold text-white tracking-wider transition-all duration-300 relative group"
            >
              Rooms
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] group-hover:w-full transition-all duration-500"></span>
            </Link>
          </li>
          <li>
            <Link
              href="#services"
              className="text-lg font-semibold text-white tracking-wider transition-all duration-300 relative group"
            >
              Services
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] group-hover:w-full transition-all duration-500"></span>
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="text-lg font-semibold text-white tracking-wider transition-all duration-300 relative group"
            >
              About
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] group-hover:w-full transition-all duration-500"></span>
            </Link>
          </li>
          <li>
            <Link
              to={'/MyBookings'}
              className="text-lg font-semibold text-white tracking-wider transition-all duration-300 relative group"
            >
              My Bookings
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] group-hover:w-full transition-all duration-500"></span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end space-x-4 hidden lg:flex">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt={user?.displayName}
                src={user?.photoURL} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gradient-to-r from-[#1a1a1d] via-[#4e4e50] to-[#1a1a1d] text-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
      
            <li className="text-center">{user?.displayName}</li>
          </ul>
        </div>
        {user ? (
          <button
            onClick={handleLogout}
            className="btn px-6 py-2 border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-bold rounded-full hover:scale-110 hover:shadow-[0px_4px_20px_rgba(255,215,0,0.8)] transition-all duration-500"
          >
            Logout
          </button>
        ) : (
          <Link
            to={'/login'}
            className="btn px-6 py-2 border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-bold rounded-full hover:scale-110 hover:shadow-[0px_4px_20px_rgba(255,215,0,0.8)] transition-all duration-500"
          >
            Login
          </Link>
        )}
      </div>

      {/* Dropdown for Small Devices */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {/* Icon for Hamburger Menu */}
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute right-2 top-14 mt-2 w-48 bg-gradient-to-r from-[#1a1a1d] via-[#4e4e50] to-[#1a1a1d] rounded-lg shadow-lg border border-gray-700">
            <ul className="menu p-2 space-y-2">
              <li>
                <Link href="#home" className="text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to={'/rooms'} className="text-white">
                  Rooms
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to={'/MyBookings'} className="text-white">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link
                  href="#offers"
                  className="btn w-full bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-black font-bold shadow-md rounded-lg text-center"
                >
                  Offers
                </Link>
              </li>
              <li>
                {user && user?.email ? (
                  <button
                    onClick={handleLogout}
                    className="btn w-full border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-bold rounded-lg text-center"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to={'/login'}
                    className="btn w-full border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-bold rounded-lg text-center"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
