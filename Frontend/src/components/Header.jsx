import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPlus, FaUserAlt, FaSignOutAlt, FaGoogle, FaHandshake } from "react-icons/fa";

function Header({ role }) {
  return (
    <header className="bg-white text-gray-800 py-4 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* Left Side - Website Name */}
        <h1 className="text-3xl font-bold tracking-wide hover:scale-105 transition-transform">
          AffiliateAdda
        </h1>

        {/* Centered Navigation */}
        {role === "USER" && (
          <nav className="hidden md:flex gap-6 text-md">
            {[
              { to: "/", icon: <FaHome />, label: "Home" },
              { to: "/affiliate", icon: <FaHandshake />, label: "Affiliate" },
              { to: "/add-product", icon: <FaPlus />, label: "Promote Product" },
            ].map(({ to, icon, label }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-0.5 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
              >
                {icon} <span>{label}</span>
              </Link>
            ))}
          </nav>
        )}

        {/* Right Side - Authentication/Profile/Logout */}
        <nav className="flex items-center gap-4">
          {role === "USER" ? (
            [
              { to: "/Authenticate", icon: <FaGoogle />, label: "GoogleAuth" },
              { to: "/user-profile", icon: <FaUserAlt />, label: "Profile" },
              { to: "/logout", icon: <FaSignOutAlt />, label: "Logout" },
            ].map(({ to, icon, label }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-0.5 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
              >
                {icon} <span>{label}</span>
              </Link>
            ))
          ) : (
            [
              { to: "/admin-home", icon: <FaHome />, label: "Home" },
              { to: "/logout", icon: <FaSignOutAlt />, label: "Logout" },
            ].map(({ to, icon, label }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
              >
                {icon} <span>{label}</span>
              </Link>
            ))
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
