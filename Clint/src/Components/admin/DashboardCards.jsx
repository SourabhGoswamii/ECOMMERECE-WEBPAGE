import React from "react";
import { FaShoppingCart, FaUsers, FaBoxOpen, FaDollarSign } from "react-icons/fa";

const DashboardCards = () => {
  const stats = [
    { title: "Total Sales", value: "$7,696,432", icon: <FaDollarSign />, color: "bg-green-500" },
    { title: "Total Orders", value: "1645", icon: <FaShoppingCart />, color: "bg-blue-500" },
    { title: "Total Customers", value: "14,634", icon: <FaUsers />, color: "bg-purple-500" },
    { title: "Total Products", value: "254", icon: <FaBoxOpen />, color: "bg-yellow-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-8 py-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-white shadow-lg rounded-lg p-6 w-full min-w-[240px] min-h-[130px] space-x-6"
        >
          <div className={`w-16 h-16 flex items-center justify-center rounded-full text-white text-3xl ${stat.color}`}>
            {stat.icon}
          </div>
          <div className="flex flex-col text-right">
            <p className="text-gray-500 text-sm">{stat.title}</p>
            <h3 className="text-2xl font-semibold">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
