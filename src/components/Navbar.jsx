import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex flex-row items-center justify-between w-full h-16 bg-white shadow-md fixed top-0 left-0 px-4 md:px-8">
      {/* Left Section */}
      <div className="flex items-center space-x-6">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <img
            src={assets.Task}
            alt="TaskBuddy Logo"
            className="h-10 w-10 sm:h-12 sm:w-12"
          />
          <h1 className="text-xl sm:text-2xl font-bold text-purple-600">
            TaskBuddy
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/home"
            className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition"
          >
            <img
              src={assets.list_icon}
              alt="List Icon"
              className="h-5 w-5 sm:h-6 sm:w-6"
            />
            <span className="font-medium text-sm sm:text-base">List</span>
          </Link>
          <Link
            to="/board"
            className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition"
          >
            <img
              src={assets.Group}
              alt="Board Icon"
              className="h-5 w-5 sm:h-6 sm:w-6"
            />
            <span className="font-medium text-sm sm:text-base">Board</span>
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Profile Icon */}
        <div className="flex items-center space-x-2">
          <img
            src={assets.profile}
            alt="Profile Icon"
            className="h-8 w-8 rounded-full"
          />
          <span className="text-gray-700 font-medium text-sm sm:text-base hidden sm:inline">
            Profile
          </span>
        </div>

        {/* Logout Icon */}
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 hover:opacity-80 transition">
            <img
              src={assets.logout_icon}
              alt="Logout Icon"
              className="h-8 w-8"
            />
            <span className="text-gray-700 font-medium text-sm sm:text-base hidden sm:inline">
              Logout
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
