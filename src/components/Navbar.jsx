import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-4xl mx-auto flex justify-center items-center">
        <Link to="/" className="text-white text-xl mr-6">Home</Link>
        <Link to="/achievements" className="text-white text-xl">Achievements</Link>
      </div>
    </nav>
  );
};

export default Navbar;
