import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext); // Get theme values

  const handleLogout = () => {
    logout();
    setIsOpen(false); // Close mobile menu on logout
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const navBaseClasses = "fixed top-0 left-0 z-50 navbar flex justify-between pr-10 p-4 shadow-2xl backdrop-blur-lg";
  const darkThemeClasses = "bg-gradient-to-r from-[#1a1a1d] via-[#4e4e50] to-[#1a1a1d] border border-gray-700 text-white";
  const lightThemeClasses = "bg-white border border-gray-200 text-black";

  const mobileMenuBaseClasses = "absolute right-2 top-14 mt-2 w-48 rounded-lg shadow-lg";
  const mobileMenuDarkClasses = "bg-gradient-to-r from-[#1a1a1d] via-[#4e4e50] to-[#1a1a1d] border border-gray-700 text-white";
  const mobileMenuLightClasses = "bg-white border border-gray-200 text-black";

  const dropdownMenuBaseClasses = "menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow";
  const dropdownMenuDarkClasses = "bg-gradient-to-r from-[#1a1a1d] via-[#4e4e50] to-[#1a1a1d] text-white";
  const dropdownMenuLightClasses = "bg-white text-black border border-gray-200";


  return (
    <div className={`${navBaseClasses} ${darkMode ? darkThemeClasses : lightThemeClasses}`}>
      {/* Logo */}
      <div className="navbar-start">
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FF8C00] tracking-wide transform hover:scale-110 hover:rotate-2 transition-all duration-500"
        >
          ✨LuxeStay
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-8">
          <li>
            <Link
              to="/"
              className={`text-lg font-semibold ${darkMode ? "text-white" : "text-black"} tracking-wider transition-all duration-300 relative group`}
            >
              Home
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] group-hover:w-full transition-all duration-500"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/rooms"
              className={`text-lg font-semibold ${darkMode ? "text-white" : "text-black"} tracking-wider transition-all duration-300 relative group`}
            >
              Rooms
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] group-hover:w-full transition-all duration-500"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`text-lg font-semibold ${darkMode ? "text-white" : "text-black"} tracking-wider transition-all duration-300 relative group`}
            >
              About
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] group-hover:w-full transition-all duration-500"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/MyBookings"
              className={`text-lg font-semibold ${darkMode ? "text-white" : "text-black"} tracking-wider transition-all duration-300 relative group`}
            >
              My Bookings
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] group-hover:w-full transition-all duration-500"></span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Side Buttons */}
      <div className="navbar-end space-x-4 hidden lg:flex items-center"> {/* Added items-center */}
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`btn btn-circle btn-sm ${darkMode ? "bg-gray-700 text-white" : "bg-yellow-400 text-black"}`}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* User Dropdown & Logout/Login */}
        {user && ( // Only show dropdown if user is logged in
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt={user?.displayName || "User"} src={user?.photoURL || "/placeholder-avatar.png"} /> {/* Added placeholder */}
              </div>
            </div>
            <ul
              tabIndex={0}
              className={`${dropdownMenuBaseClasses} ${darkMode ? dropdownMenuDarkClasses : dropdownMenuLightClasses}`}
            >
              <li className={`text-center p-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{user?.displayName}</li>
            </ul>
          </div>
        )}

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

      {/* Mobile Menu */}
      <div className="lg:hidden flex items-center space-x-3"> {/* Added flex items-center space-x-3 */}
        {/* Theme Toggle Button for Mobile */}
        <button
          onClick={toggleTheme}
          className={`btn btn-circle btn-sm ${darkMode ? "bg-gray-700 text-white" : "bg-yellow-400 text-black"}`}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${darkMode ? "text-white" : "text-black"} focus:outline-none`}
        >
          <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {isOpen && (
          <div className={`${mobileMenuBaseClasses} ${darkMode ? mobileMenuDarkClasses : mobileMenuLightClasses}`}>
            <ul className="menu p-2 space-y-2">
              <li><Link to="/" onClick={closeMobileMenu} className={`${darkMode ? "text-gray-200 hover:bg-gray-700" : "text-black hover:bg-gray-100"} block p-2 rounded-md`}>Home</Link></li>
              <li><Link to="/rooms" onClick={closeMobileMenu} className={`${darkMode ? "text-gray-200 hover:bg-gray-700" : "text-black hover:bg-gray-100"} block p-2 rounded-md`}>Rooms</Link></li>
              <li><Link to="/about" onClick={closeMobileMenu} className={`${darkMode ? "text-gray-200 hover:bg-gray-700" : "text-black hover:bg-gray-100"} block p-2 rounded-md`}>About</Link></li>
              <li><Link to="/MyBookings" onClick={closeMobileMenu} className={`${darkMode ? "text-gray-200 hover:bg-gray-700" : "text-black hover:bg-gray-100"} block p-2 rounded-md`}>My Bookings</Link></li>
              {/* User Info and Avatar for Mobile */}
              {user && (
                <>
                  <li className="flex items-center justify-center p-2 space-x-2 border-b border-t" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }}>
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img alt={user?.displayName || "User"} src={user?.photoURL || "/placeholder-avatar.png"} />
                      </div>
                    </div>
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{user?.displayName}</span>
                  </li>
                </>
              )}
              <li>
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="btn w-full border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-bold rounded-lg text-center"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to={'/login'}
                    onClick={closeMobileMenu}
                    className="btn w-full border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-bold rounded-lg text-center block" // Added block for Link
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