import React from 'react';

const Sidebar = () => (
  <aside className="w-64 h-full bg-gray-800 text-white flex flex-col p-4">
    <h2 className="text-xl font-bold mb-6">Menu</h2>
    <nav className="flex flex-col gap-2">
      {/* TODO: Add role-based links */}
      <a href="/employee/dashboard" className="hover:bg-gray-700 rounded p-2">Employee Dashboard</a>
      <a href="/employee/search" className="hover:bg-gray-700 rounded p-2">My Tasks</a>
      <a href="/admin/dashboard" className="hover:bg-gray-700 rounded p-2">Admin Dashboard</a>
      <a href="/admin/all-tasks" className="hover:bg-gray-700 rounded p-2">All Reports</a>
      <a href="/admin/search" className="hover:bg-gray-700 rounded p-2">Admin Search</a>
    </nav>
  </aside>
);

export default Sidebar; 