import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.context";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md  p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-purple-600">
        <Link to="/">DPT Products</Link>
      </div>
      
      {/* Search Bar */}
      <div className="flex-grow mx-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500" />
        </div>
      </div>
      
      {/* User & Cart */}
      <div className="flex items-center space-x-6">
        <a href="/cart">
        <FaShoppingCart className="text-xl cursor-pointer" />
            </a>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/signin" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Sign In
            </Link>
            <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
