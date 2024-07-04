import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex justify-center items-center space-x-8">
        <NavLink
          to="/"
          exact
          className={({ isActive }) =>
            isActive
              ? "text-white text-xl font-bold border-b-2 border-blue-500 pb-1"
              : "text-gray-300 text-xl hover:text-white transition-colors duration-300"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/achievements"
          className={({ isActive }) =>
            isActive
              ? "text-white text-xl font-bold border-b-2 border-blue-500 pb-1"
              : "text-gray-300 text-xl hover:text-white transition-colors duration-300"
          }
        >
          Achievements
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
