import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const navBaseClasses = "fixed top-0 left-0 right-0 z-50 navbar flex justify-between items-center p-3 md:p-4 shadow-2xl backdrop-blur-lg";
  const darkThemeClasses = "bg-gradient-to-r from-[#1a1a1d] via-[#4e4e50] to-[#1a1a1d] border-b border-gray-700 text-white";
  const lightThemeClasses = "bg-white border-b border-gray-200 text-black";

  const mobileMenuBaseClasses = "absolute right-2 top-full mt-2 w-56 sm:w-64 rounded-lg shadow-xl";
  const mobileMenuDarkClasses = "bg-gradient-to-r from-[#1a1a1d] via-[#4e4e50] to-[#1a1a1d] border border-gray-700 text-white";
  const mobileMenuLightClasses = "bg-white border border-gray-200 text-black";

  const dropdownMenuBaseClasses = "menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow";
  const dropdownMenuDarkClasses = "bg-gradient-to-r from-[#1a1a1d] via-[#4e4e50] to-[#1a1a1d] text-white";
  const dropdownMenuLightClasses = "bg-white text-black border border-gray-200";

  return (
    <div className={`${navBaseClasses} ${darkMode ? darkThemeClasses : lightThemeClasses}`}>
      <div className="navbar-start">
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FF8C00] tracking-wide transform hover:scale-105 transition-all duration-300"
        >
          ✨LuxeStay
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-6 md:space-x-8">
          {['Home', 'Rooms', 'About', 'MyBookings'].map((item) => (
            <li key={item}>
              <Link
                to={item === 'Home' ? '/' : `/${item.replace(/\s+/g, '')}`}
                className={`text-base md:text-lg font-semibold ${darkMode ? "text-white" : "text-black"} tracking-wider transition-all duration-300 relative group`}
              >
                {item}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] group-hover:w-full transition-all duration-500"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end hidden lg:flex items-center space-x-3 md:space-x-4">
        <button
          onClick={toggleTheme}
          className={`btn btn-circle btn-xs sm:btn-sm ${darkMode ? "bg-gray-700 text-white" : "bg-yellow-400 text-black"}`}
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>

        {user && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full">
                <img alt={user?.displayName || "User"} src={user?.photoURL || "/placeholder-avatar.png"} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className={`${dropdownMenuBaseClasses} ${darkMode ? dropdownMenuDarkClasses : dropdownMenuLightClasses}`}
            >
              <li className={`text-center p-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{user?.displayName}</li>
            </ul>
          </div>
        )}

        {user ? (
          <button
            onClick={handleLogout}
            className="btn btn-sm md:btn-md px-4 md:px-6 py-1 md:py-2 border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-bold rounded-full hover:scale-105 transition-all duration-300"
          >
            Logout
          </button>
        ) : (
          <Link
            to={'/login'}
            className="btn btn-sm md:btn-md px-4 md:px-6 py-1 md:py-2 border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-bold rounded-full hover:scale-105 transition-all duration-300"
          >
            Login
          </Link>
        )}
      </div>

      <div className="lg:hidden flex items-center space-x-2">
        <button
          onClick={toggleTheme}
          className={`btn btn-circle btn-xs ${darkMode ? "bg-gray-700 text-white" : "bg-yellow-400 text-black"}`}
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${darkMode ? "text-white" : "text-black"} focus:outline-none p-1`}
          aria-label="Open mobile menu"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className={`${mobileMenuBaseClasses} ${darkMode ? mobileMenuDarkClasses : mobileMenuLightClasses}`}>
          <ul className="menu p-3 space-y-2 text-sm">
            {user && (
              <li className="flex items-center justify-center p-2 space-x-2 border-b" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }}>
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full">
                    <img alt={user?.displayName || "User"} src={user?.photoURL || "/placeholder-avatar.png"} />
                  </div>
                </div>
                <span className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} font-medium`}>{user?.displayName}</span>
              </li>
            )}
            {['Home', 'Rooms', 'About', 'MyBookings'].map((item) => (
              <li key={'mobile-' + item}>
                <Link
                  to={item === 'Home' ? '/' : `/${item.replace(/\s+/g, '')}`}
                  onClick={closeMobileMenu}
                  className={`${darkMode ? "text-gray-200 hover:bg-gray-700" : "text-black hover:bg-gray-100"} block p-2 rounded-md w-full text-left`}
                >
                  {item}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }}>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="btn btn-sm w-full border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-bold rounded-lg text-center"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to={'/login'}
                  onClick={closeMobileMenu}
                  className="btn btn-sm w-full border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-bold rounded-lg text-center block"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;