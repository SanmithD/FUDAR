import axios from "axios";
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DriverManagement from "./DriverManagement";
import DriverProfile from "./DriverProfile ";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeDriverSection, setActiveDriverSection] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [vehicleConfirmed, setVehicleConfirmed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [bookedVehicle, setBookedVehicle] = useState(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState();

  const profile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/driver/getOwn`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfileData(response.data);
      console.log("My Data", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    profile();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const openAdminModal = () => setIsAdminModalOpen(true);
  const closeAdminModal = () => {
    setIsAdminModalOpen(false);
    setPhoneNumber("");
    setOtp("");
    setIsOtpSent(false);
  };

  const handleSendOtp = () => {
    if (phoneNumber.length === 10) {
      setIsOtpSent(true);
    } else {
      alert("Please enter a valid phone number");
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      alert("Admin access granted");
      closeAdminModal();
    } else {
      alert("Invalid OTP");
    }
  };

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Header with hamburger menu */}
      <div className="md:hidden bg-gray-600 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Car Rental</h2>
        <button onClick={toggleSidebar} className="text-white">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar - hidden by default on mobile, shown when toggle is clicked */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-[#8cc745] text-white p-4 md:min-h-screen overflow-y-auto z-10 absolute md:relative top-0 left-0 h-screen md:h-auto`}
      >
        <h2 className="text-xl font-bold mb-4 hidden md:block">Car Rental</h2>
        <button
          onClick={() =>
            handleMenuClick(activeSection === "dashboard" ? null : "dashboard")
          }
          className="w-full text-left px-4 py-2  rounded hover:bg-green-600"
        >
          Dashboard
        </button>
        {activeSection === "dashboard" && (
          <div className="ml-4 mt-2 space-y-2">
            <button
              onClick={() => handleMenuClick("driver")}
              className="w-full text-left px-4 py-2  rounded hover:bg-green-600"
            >
              Driver
            </button>
          </div>
        )}
        {activeSection === "driver" && (
          <div className="ml-4 mt-2 space-y-2">
            {/* Removed "Available Vehicles" button */}
            <button
              onClick={() => handleDriverSectionClick("salary")}
              className="w-full text-left px-4 py-2 bg-gray-400  rounded hover:bg-green-600"
            >
              Salary
            </button>
            <button
              onClick={() => handleDriverSectionClick("documents")}
              className="w-full text-left px-4 py-2 bg-gray-400 rounded hover:bg-green-600"
            >
              Documents
            </button>
          </div>
        )}

        {/* Logout Button - Added at the bottom of sidebar */}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            {/* My Booking Button - Shows on right side when vehicle is booked */}
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

        {/* Booking Details Modal */}

        {/* Logout Confirmation Modal */}
        {isLogoutModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
              <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
              <p className="mb-6">
                Are you sure you want to logout from your account?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleLogout}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Yes, Logout
                </button>
                <button
                  onClick={closeLogoutModal}
                  className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Available Vehicles Section REMOVED */}

        {/* Salary Section - Driver View (Only Shows Their Own Salary) */}
        {activeDriverSection === "salary" && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Your Salary Details</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Driver Info Card */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    Driver Information
                  </h3>
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{profileData.name}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Driver ID:</span>
                      <span className="font-medium">
                        {profileData.driverID}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Salary Details Card */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 className="font-semibold text-green-800 mb-2">
                    Salary Information
                  </h3>
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span className="text-gray-600">Monthly Salary:</span>
                      <span className="font-medium">
                        ₹{currentDriver.salary.toLocaleString()}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Payment Date:</span>
                      <span className="font-medium">
                        {currentDriver.paymentDate}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Payment Status Card */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                  <h3 className="font-semibold text-yellow-800 mb-2">
                    Payment Status
                  </h3>
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span
                        className={`font-medium px-2 py-1 rounded-full text-xs ${
                          currentDriver.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {currentDriver.status}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Bank:</span>
                      <span className="font-medium">{currentDriver.bank}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Account:</span>
                      <span className="font-medium">
                        {currentDriver.accountNo}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Monthly Salary History - Could be expanded in a real app */}
              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Salary History
                </h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-4 bg-gray-50 border-b">
                    <div className="p-3 font-medium text-gray-700">Month</div>
                    <div className="p-3 font-medium text-gray-700">Amount</div>
                    <div className="p-3 font-medium text-gray-700">Date</div>
                    <div className="p-3 font-medium text-gray-700">Status</div>
                  </div>                  
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Driver Documents Section */}
        {activeDriverSection === "documents" && (
          <DriverProfile/>
        )}
        <DriverManagement />
      </div>
    </div>
  );
};

export default Dashboard;
