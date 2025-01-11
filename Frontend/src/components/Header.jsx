import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-teal-600 text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <h1 className="text-3xl font-bold">Pay Per Go</h1>
        <nav className="space-x-6">

          <Link
            to="/"
            className="text-lg hover:text-teal-200 transition duration-300"
          >
            Home
          </Link>
          
          <Link
            to="/Authenticate"
            className="text-lg hover:text-teal-200 transition duration-300"
          >
            GoogleAuth
          </Link>
        
          <Link
            to="/logout"
            className="text-lg hover:text-teal-200 transition duration-300"
          >
            Logout
          </Link>
        
        </nav>
      </div>
    </header>
  );
}

export default Header;
