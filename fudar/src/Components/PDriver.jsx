import axios from "axios";
import { Menu, X, UserCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DriverManagement from "./DriverManagement";
import DriverProfile from "./DriverProfile ";

const Dashboard = () => {
  const screen = innerWidth;
  const [activeSection, setActiveSection] = useState(null);
  const [activeDriverSection, setActiveDriverSection] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookedVehicle, setBookedVehicle] = useState(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState();
  const [document, setDocument] = useState(false);
  const [dropdownOpen, setDropdownOpen]=useState(false);
  const profile = async () => {
    setDocument(false);
    try {
      const response = await axios.get(
        `https://fudar-dqqd.onrender.com/api/driver/getOwn`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfileData(response.data);
      setDocument(true);
    } catch (error) {
      setDocument(false);
      console.log(error);
    }
  };

  useEffect(() => {
    profile();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleMenuClick = (section) => {
    setActiveSection(section);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleDriverSectionClick = (section) => {
    setActiveDriverSection(section);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleBookingDetails = () => {
    setShowBookingDetails(!showBookingDetails);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white" style={{ padding: screen < 1000 ? '20px' : '-20px' }}>
      <div className="md:hidden bg-black text-white p-4 flex justify-between items-center" style={{ display: screen < 1000 ? 'none' : 'none' }}>
        <h2 className="text-xl font-bold">Fudar</h2>
        <button onClick={toggleSidebar} className="text-white">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`${
          isSidebarOpen ? "fixed inset-0 z-50" : "hidden"
        } md:block md:relative md:z-auto md:w-64 bg-[black] text-white md:min-h-screen overflow-y-auto`}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-700 md:border-none">
          <h2 className="text-xl font-bold">Driver Dashboard</h2>
          <button 
            className="md:hidden text-white" 
            onClick={toggleSidebar}
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col space-y-3 p-5">
          <button
            onClick={() => {
              setDocument(true);
              toggleSidebar();
            }}
            className="w-full text-left px-4 py-3 rounded cursor-pointer hover:bg-gray-700 transition-colors flex items-center"
          >
            <span>Profile</span>
          </button>
          <button
            onClick={() => {
              setDocument(false);
              toggleSidebar();
            }}
            className="w-full text-left px-4 py-3 rounded cursor-pointer hover:bg-gray-700 transition-colors flex items-center"
          >
            <span>Register</span>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('token'),
              navigate('/login')
            }}
            className="w-full text-left px-4 py-3 rounded cursor-pointer hover:bg-gray-700 transition-colors flex items-center"
          >
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            {bookedVehicle && (
              <button
                onClick={toggleBookingDetails}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md"
              >
                My Booking
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col min-h-screen bg-[#F3F4F6]">
          <div className="hidden md:flex fixed top-0 md:left-64 right-0 p-4 justify-between items-center pr-8 bg-white shadow-sm z-30">
           
            <div className="flex items-center">
              <UserCircle className="w-12 h-12 text-black cursor-pointer mr-4 " onClick={() => setDropdownOpen(!dropdownOpen)}/>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-40">
                  <p className="px-4 py-2 text-gray-700 font-semibold cursor-pointer" >{profileData}</p>
                  <hr />
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md">Logout</button>
                </div>
              )}
            </div>
          </div>
          </div>
        {document ? <DriverProfile /> : <DriverManagement />}
      </div>
    </div>
  );
};

export default Dashboard;