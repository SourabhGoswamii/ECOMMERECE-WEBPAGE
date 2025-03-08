import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChartPie, FaBox, FaTags, FaUsers, FaShoppingCart, FaCog, FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../../context/user.context"; // Adjust the path based on your project structure

const Sidebar = () => {
  const { setUser } = useContext(UserContext); // Assuming you have an AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    setUser(null); // Clear user context state
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/admin/dashboard" className="flex items-center gap-3 text-gray-700 hover:text-blue-500">
            <FaChartPie /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/products" className="flex items-center gap-3 text-gray-700 hover:text-blue-500">
            <FaBox /> Products
          </Link>
        </li>
        <li>
          <Link to="/admin/categories" className="flex items-center gap-3 text-gray-700 hover:text-blue-500">
            <FaTags /> Categories
          </Link>
        </li>
        <li>
          <Link to="/admin/customers" className="flex items-center gap-3 text-gray-700 hover:text-blue-500">
            <FaUsers /> Customers
          </Link>
        </li>
        <li>
          <Link to="/admin/orders" className="flex items-center gap-3 text-gray-700 hover:text-blue-500">
            <FaShoppingCart /> Orders
          </Link>
        </li>
        <li>
          <Link to="/admin/settings" className="flex items-center gap-3 text-gray-700 hover:text-blue-500">
            <FaCog /> Settings
          </Link>
        </li>
        <li>
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 text-gray-700 hover:text-red-500"
          >
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
