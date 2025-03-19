import { Menu, Truck, UserCircle, Users, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Totaldata from '../Components/Totaldata';
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
    <>
    <div className="flex flex-col md:flex-row min-h-screen bg-white relative">
      <div className="md:hidden bg-black text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Fudar</h2>
        <button id="menu-button" onClick={toggleSidebar} className="text-white">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

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
        <ul className="flex flex-col gap-6 p-4">
            <li className="flex items-center p-3 text-white hover:bg-gray-500 rounded-md cursor-pointer transition-colors" >
              <Users className="mr-2 text-white" /> Drivers
            </li>
            <li className="flex items-center p-3 text-white hover:bg-gray-500 rounded-md cursor-pointer transition-colors">
              <Truck className="mr-2 text-white" /> Add Vehicles
            </li>
            <li className="flex items-center p-3 text-white hover:bg-gray-500 rounded-md cursor-pointer transition-colors" >
              <Users className="mr-2 text-white" /> All Drivers
            </li>
            <li className="flex items-center p-3 text-white hover:bg-gray-500 rounded-md cursor-pointer transition-colors">
              <Users className="mr-2 text-white" /> Assign Drivers
            </li>
            <li className="flex items-center p-3 text-white hover:bg-gray-500 rounded-md cursor-pointer transition-colors">
              <Users className="mr-2 text-white" /> Assign Staff
            </li>
            <li className="flex items-center p-3 text-white hover:bg-gray-500 rounded-md cursor-pointer transition-colors" >
              <Truck className="mr-2 text-white" /> All Vehicles
            </li>
            <li className="flex items-center p-3 text-white hover:bg-gray-500 rounded-md cursor-pointer transition-colors" >
              <UserCircle className="mr-2 text-white" /> Add Users
            </li>
          </ul>
         
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen bg-[#F3F4F6]">
        <div className="hidden md:flex fixed top-0 md:left-64 right-0 p-4 justify-between items-center pr-8 bg-white shadow-sm z-30">
          <h1 className="text-3xl font-bold text-gray-800 pl-6">Admin Dashboard</h1>
          <div className="flex items-center">
            <span className="text-gray-700 text-lg font-medium mr-2">Welcome, Loading... &nbsp;</span>
            <div className="relative">
              <UserCircle className="w-12 h-12 text-black cursor-pointer mr-4" onClick={() => setDropdownOpen(!dropdownOpen)} />
                </div>
                </div>
                </div>
                </div>
       
    </div>
    
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 absolute md:top-[70px] md:left-[270px]">
    
        <h1 className="text-4xl md:text-6xl font-bold -mt-1 text-center">
          Welcome to Fudar
        </h1>
        
      </div>
      <Totaldata />
    </>
  );
};

export default MainDashboard;
