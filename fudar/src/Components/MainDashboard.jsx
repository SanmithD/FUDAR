import { Menu, Truck, UserCircle, Users, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Managestaff from './Managestaff';
import Totaldata from './Totaldata';
import VehicleManagement from "./VehicleManagement ";
const MainDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [document, setDocument] = useState(false);
  const [vehicle, setVehicle] = useState(false);
  // Removed unused state variables for simplicity

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const Driver = () => {
    setDocument(true);
    setVehicle(false);
    setIsSidebarOpen(false); // Close sidebar on mobile
  }

  const AllVehicles = () => {
    setVehicle(true);
    setDocument(false);
    setIsSidebarOpen(false); // Close sidebar on mobile
  }

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-white relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-black text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Fudar</h2>
          <button onClick={toggleSidebar} className="text-white">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 right-0 transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } md:relative md:translate-x-0 w-64 bg-black text-white p-4 transition-transform duration-300 md:min-h-screen z-50`}
        >
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h2 className="text-3xl font-bold">Fudar</h2>
            <button onClick={toggleSidebar} className="text-white">
              <X size={24} />
            </button>
          </div>

          <h2 className="text-3xl font-bold mb-4 hidden md:block">Fudar</h2>
          <div className="ml-4 mt-2 space-y-2 h-[100%]">
            <ul className="flex flex-col gap-6 p-4">
              <li 
                className="flex items-center p-3 hover:bg-gray-500 rounded-md cursor-pointer" 
                onClick={AllVehicles}
              >
                <Truck className="mr-2" /> Add Vehicles
              </li>
              <li 
                className="flex items-center p-3 hover:bg-gray-500 rounded-md cursor-pointer" 
                onClick={Driver}
              >
                <Users className="mr-2" /> Manage Drivers
              </li>
              
              <li 
                className="flex items-center p-3 hover:bg-gray-500 rounded-md cursor-pointer" 
                onClick={Driver}
              >
                <Users className="mr-2" /> Manage staff
              </li>
              {/* Other menu items */}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen bg-[#F3F4F6]">
          <div className="hidden md:flex fixed top-0 md:left-64 right-0 p-4 justify-between items-center pr-8 bg-white shadow-sm z-30">
            <h1 className="text-3xl font-bold text-gray-800 pl-6">Admin Dashboard</h1>
            <div className="flex items-center">
              <UserCircle className="w-12 h-12 text-black cursor-pointer mr-4" />
            </div>
          </div>

          {/* Conditional Rendering */}
          {document && 
          <div className="md:absolute md:top-[10px] md:left-[270px]">
          {/* <DriversList /> */} <Managestaff />
          </div>
          }
          {vehicle && 
          
          <div className="md:absolute md:top-[80px] md:left-[-10px] md:h-[50%]">
          <VehicleManagement />
          
          </div>
          }
          </div>
      </div>
      <Totaldata />
    </>
  );
};

export default MainDashboard;