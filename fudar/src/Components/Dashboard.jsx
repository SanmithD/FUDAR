import axios from "axios";
import { Menu, Truck, UserCircle, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  // Fetch User Profile
  const getUser = async () => {
    try {
      const response = await axios.get('https://fudar-dqqd.onrender.com/api/user/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUserData(response.data.user.name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfile = async () => {
    try {
      const response = await axios.get('https://fudar-dqqd.onrender.com/api/driver/viewDriverInfo', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // UseEffect for fetching user data and animations
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      getUser();
    }
    getUser();
    const timer = setTimeout(() => {
      setAnimateCards(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [navigate]);

  const closeDropdowns = () => {
    setDropdownOpen(false);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const screen = innerWidth;

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile Header with Menu Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 p-4 flex justify-between items-center bg-white shadow-sm z-20" >
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-black">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Staff Management</h1>
        {/* <UserCircle
          className="w-8 h-8 text-black cursor-pointer"
          onClick={() => setDropdownOpen(dropdownOpen)}
        /> */}
        <button onClick={()=>{ localStorage.removeItem('token'), navigate('/login') }} >Logout</button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-green shadow-lg z-30 transition-transform duration-300 ease-in-out md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white mb-6 mt-8">Staff Management</h2>
            <button className="md:hidden text-white" >
              <X size={24} onClick={()=>setSidebarOpen(!sidebarOpen)}/>
            </button>
          </div>
          <ul className="flex flex-col gap-6 p-4">
            <li className="flex items-center p-3 text-white hover:bg-gray-500 rounded-md cursor-pointer transition-colors" onClick={() => { navigate("/driver"); closeDropdowns(); }}>
              <Users className="mr-2 text-white" /> Drivers
            </li>
            <li className="flex items-center p-3 text-white hover:bg-gray-500 rounded-md cursor-pointer transition-colors" onClick={() => { navigate("/vehicles"); closeDropdowns(); }}>
              <Truck className="mr-2 text-white" /> Add Vehicles
            </li>
            <li className="flex items-center p-3 text-white hover:bg-gray-500 rounded-md cursor-pointer transition-colors" onClick={() => { navigate("/allDrivers"); closeDropdowns(); }}>
              <Users className="mr-2 text-white" /> All Drivers
            </li>
            <li className="flex items-center p-3 text-white hover:bg-gray-500 rounded-md cursor-pointer transition-colors" onClick={() => { navigate("/vehicleManage"); closeDropdowns(); }}>
              <Users className="mr-2 text-white" /> Assign Drivers
            </li>
            <li className="flex items-center p-3 text-white hover:bg-gray-500 rounded-md cursor-pointer transition-colors" onClick={() => { navigate("/allVehicles"); closeDropdowns(); }}>
              <Truck className="mr-2 text-white" /> All Vehicles
            </li>
            
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen bg-[white]">
        <div className="hidden md:flex fixed top-0 left-64 right-0 p-4 justify-between items-center pr-8 bg-white shadow-sm z-30">
          <h1 className="text-3xl font-bold text-gray-800 pl-6">Staff Management Dashboard</h1>
          <div className="flex items-center">
            <span className="text-gray-700 text-lg font-medium mr-2">Welcome, {userData || "Loading..."} &nbsp;</span>
            <div className="relative">
              <UserCircle className="w-12 h-12 text-black cursor-pointer mr-4" onClick={() => setDropdownOpen(!dropdownOpen)} />

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-40">
                  <p className="px-4 py-2 text-gray-700 font-semibold cursor-pointer" onClick={handleProfile}>{userData}</p>
                  <hr />
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md">Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className={`md:pt-24 pt-[130px] px-4 md:px-8 w-[100%] flex justify-center  ${sidebarOpen ? 'opacity-50' : 'opacity-100' }  bg-white`}>
          <Outlet />
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}
