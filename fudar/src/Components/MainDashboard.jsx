import { Menu, Truck, UserCircle, Users, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Axios } from "axios";
import Managestaff from './Managestaff';
import Totaldata from './Totaldata';
import VehicleManagement from "./VehicleManagement ";
import DriversList from "./DriversList";
const MainDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [document, setDocument] = useState(false);
  const [vehicle, setVehicle] = useState(false);
  const [staff,setStaff]=useState(false);
  const [userData, setUserData] = useState(null);

  // Removed unused state variables for simplicity
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const getUser = async () => {
    try {
      const response = await Axios.get('https://fudar-dqqd.onrender.com/api/user/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUserData(response.data.user.name);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => getUser,[]);
  const Driver = () => {
    setDocument(true);
    setVehicle(false);
    setStaff(false);
    setIsSidebarOpen(false); // Close sidebar on mobile
  }

  const AllVehicles = () => {
    setVehicle(true);
    setDocument(false);
    setStaff(false);
    setIsSidebarOpen(false); // Close sidebar on mobile
  }

  const allStaff = () => {
    setVehicle(false);
    setDocument(false);
    setStaff(true);
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
                onClick={allStaff}
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
              <UserCircle className="w-12 h-12 text-black cursor-pointer mr-4" onClick={() => setDropdownOpen(!dropdownOpen)}/>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-40">
                  <p className="px-4 py-2 text-gray-700 font-semibold cursor-pointer" >{userData}</p>
                  <hr />
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md">Logout</button>
                </div>
              )}
            </div>
          </div>

          {/* Conditional Rendering */}
          {document && 
          <div className="absolute md:top-[190px]  md:left-[270px] top-[360px] md:w-[80%]">
          <DriversList /> 
          </div>
          }
          {staff&&
            <div className="absolute md:top-[190px] top-[360px] w-[100%] md:left-[270px] md:w-[80%]">
             <Managestaff />
            </div>
          }
          {vehicle && 
          
          <div className="absolute md:top-[80px] top-[80px] md:left-[-10px] top-[360px] md:h-[20%] md:w-[100%]">
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