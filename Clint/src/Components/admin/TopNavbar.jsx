import React, { useContext } from "react";
import { UserContext } from "../../context/user.context";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const TopNavbar = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* User Profile Icon */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-800 font-bold text-xl font-sans">{capitalizeFirstLetter(user.name)}</span>
      </div>
    </div>
  );
};

export default TopNavbar;
