import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars, FaTimes, FaHome, FaPlus, FaUserAlt, FaSignOutAlt,
  FaHandshake, FaSignInAlt, FaInfoCircle, FaEnvelope, FaMoon, FaSun
} from "react-icons/fa";

function Header({ role }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Toggle dark mode on <html> element
  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newTheme;
    });
  };

  return (
    <header
      className="
        bg-gray-50
        dark:bg-gradient-to-tr dark:from-cyan-900 dark:via-gray-900 dark:to-black
        text-gray-800 dark:text-cyan-100
        py-4 shadow-xl sticky top-0 z-50 w-full
        transition-colors duration-500
      "
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* Left Side - Website Name */}
        <h1
          className="
            text-xl font-bold tracking-wide
            hover:scale-105 transition-transform
            dark:hover:text-cyan-200
          "
        >
          AffiliateAdda
        </h1>

        {/* Mobile Menu Button */}
        <button
          className="
            md:hidden text-2xl
            text-gray-800 dark:text-cyan-100
            transition-colors duration-500
            hover:scale-110
          "
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Centered Navigation */}
        <nav
          className={`
            md:flex text-sm flex-grow justify-center
            absolute md:static top-16 left-0 w-full md:w-auto
            ${menuOpen ? "flex" : "hidden"}
            flex-col md:flex-row items-center
            bg-gray-50 md:bg-transparent
            dark:bg-transparent
            transition-colors duration-500
          `}
        >
          {(role === "USER" || role === "Guest") && (
            [
              { to: "/", icon: <FaHome />, label: "Home" },
              { to: "/affiliate", icon: <FaHandshake />, label: "Affiliate" },
              { to: "/add-product", icon: <FaPlus />, label: "Promote" },
              { to: "/AboutUs", icon: <FaInfoCircle />, label: "AboutUs" },
              { to: "/Contact", icon: <FaEnvelope />, label: "Contact" }
            ].map(({ to, icon, label }) => (
              <Link
                key={to}
                to={to}
                className="
                  flex items-center gap-1
                  px-3 py-2 text-sm rounded-full
                  text-gray-700 dark:text-cyan-100
                  hover:bg-gray-200 dark:hover:bg-cyan-800
                  dark:hover:text-white
                  transition-all duration-300
                  m-1
                  ring-2 ring-transparent dark:ring-cyan-700
                  hover:ring-gray-300 dark:hover:ring-cyan-400
                "
              >
                {icon} <span>{label}</span>
              </Link>
            ))
          )}
        </nav>

        {/* Right Side - Authentication/Profile/Logout and Theme Toggle */}
        <nav className="flex items-center">
          <>
            {role === "Guest" ? (
              <Link
                to="/Authenticate"
                className="
                  flex items-center gap-1
                  px-3 py-2 text-sm rounded-full
                  text-gray-700 dark:text-cyan-100
                  hover:bg-gray-200 dark:hover:bg-cyan-800
                  dark:hover:text-white
                  transition-all duration-300
                  m-1
                  ring-2 ring-transparent dark:ring-cyan-700
                  hover:ring-gray-300 dark:hover:ring-cyan-400
                "
              >
                <FaSignInAlt /> <span>Login</span>
              </Link>
            ) : role === "USER" ? (
              [
                { to: "/user-profile", icon: <FaUserAlt /> },
                { to: "/logout", icon: <FaSignOutAlt />, label: "Logout" }
              ].map(({ to, icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="
                    flex items-center gap-1
                    px-3 py-2 text-sm rounded-full
                    text-gray-700 dark:text-cyan-100
                    hover:bg-gray-200 dark:hover:bg-cyan-800
                    dark:hover:text-white
                    transition-all duration-300
                    m-1
                    ring-2 ring-transparent dark:ring-cyan-700
                    hover:ring-gray-300 dark:hover:ring-cyan-400
                  "
                >
                  {icon} <span>{label}</span>
                </Link>
              ))
            ) : (
              [
                { to: "/admin-home", icon: <FaHome />, label: "Home" },
                { to: "/logout", icon: <FaSignOutAlt />, label: "Logout" }
              ].map(({ to, icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="
                    flex items-center gap-1
                    px-3 py-2 text-sm rounded-full
                    text-gray-700 dark:text-cyan-100
                    hover:bg-gray-200 dark:hover:bg-cyan-800
                    dark:hover:text-white
                    transition-all duration-300
                    m-1
                    ring-2 ring-transparent dark:ring-cyan-700
                    hover:ring-gray-300 dark:hover:ring-cyan-400
                  "
                >
                  {icon} <span>{label}</span>
                </Link>
              ))
            )}
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="
                flex items-center ml-2 p-2 text-xl rounded-full
                bg-gray-200 dark:bg-cyan-900
                text-gray-700 dark:text-white
                hover:bg-gray-300 dark:hover:bg-cyan-700
                transition-all duration-300
                ring-2 ring-transparent dark:ring-cyan-600
                hover:ring-gray-400 dark:hover:ring-cyan-400
                shadow-md dark:shadow-cyan-800
                animate-[spin_1s_ease-in-out_infinite]
                hover:animate-none
              "
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          </>
        </nav>
      </div>  
    </header>
  );
}

export default Header;
