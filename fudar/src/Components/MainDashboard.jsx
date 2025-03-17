import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const MainDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        !event.target.closest("#sidebar") &&
        !event.target.closest("#menu-button")
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white relative">
      {/* Mobile Header */}
      <div className="md:hidden bg-black text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Fudar</h2>
        <button id="menu-button" onClick={toggleSidebar} className="text-white">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay (for closing sidebar when clicking outside) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar (Right-Aligned) */}
      <div
        id="sidebar"
        className={`fixed inset-y-0 right-0 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:relative md:translate-x-0 w-64 bg-black text-white p-4 transition-transform duration-300 md:min-h-screen z-50`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="text-3xl font-bold">Fudar</h2>
          <button onClick={toggleSidebar} className="text-white">
            <X size={24} />
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-4 hidden md:block">Fudar</h2>
        <button className="w-full text-left px-4 py-2 rounded">Dashboard</button>
        <div className="ml-4 mt-2 space-y-2">
          <button
            onClick={() => navigate("/LoginDrivers")}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-700"
          >
            Drivers
          </button>
          <button
            onClick={() => navigate("/LoginStaff")}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-700"
          >
            Staff
          </button>
          <button
            onClick={() => navigate("/LoginAdmin")}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-700"
          >
            Admin
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6">
        <h1 className="text-4xl md:text-6xl font-bold -mt-1 text-center">
          Welcome to Fudar
        </h1>
        <img
          src="/public/Images/fudar_logo.png"
          alt="Dashboard Visual"
          className="mt-4 w-64 h-auto md:w-96"
        />
      </div>
    </div>
  );
};

export default MainDashboard;
