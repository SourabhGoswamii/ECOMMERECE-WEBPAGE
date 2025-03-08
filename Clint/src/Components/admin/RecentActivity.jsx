import React from "react";

const RecentActivity = () => {
  const activities = [
    { id: 1, message: "New item sold", time: "14 min ago" },
    { id: 2, message: "User signed up", time: "30 min ago" },
    { id: 3, message: "Product added to inventory", time: "1 hour ago" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <ul>
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="flex justify-between border-b py-2 text-gray-700"
          >
            <span>{activity.message}</span>
            <span className="text-sm text-gray-500">{activity.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;