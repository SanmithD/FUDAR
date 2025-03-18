import axios from "axios";
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import DriverManagement from "./DriverManagement";

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

  // Current logged-in driver (for demo purposes)
  const currentDriver = {
    id: 3,
    name: "Priya Sharma",
    salary: 29000,
    bank: "SBI",
    accountNo: "XXXX9012",
    status: "Yet to Pay",
    paymentDate: "15/03/2025",
    driverID: "DRV-2023-103",
  };
  const [profileData, setProfileData] = useState(null);

  // // Salary data state (would normally be fetched from backend)
  // const [salaryData, setSalaryData] = useState([
  //   { id: 1, name: "Rajesh Kumar", salary: 28000, bank: "HDFC Bank", accountNo: "XXXX1234", status: "Paid" },
  //   { id: 2, name: "Amit Singh", salary: 26500, bank: "ICICI Bank", accountNo: "XXXX5678", status: "Paid" },
  //   { id: 3, name: "Priya Sharma", salary: 29000, bank: "SBI", accountNo: "XXXX9012", status: "Yet to Pay" },
  //   { id: 4, name: "Sunil Verma", salary: 27500, bank: "Axis Bank", accountNo: "XXXX3456", status: "Yet to Pay" },
  //   { id: 5, name: "Deepak Patel", salary: 28500, bank: "Kotak Mahindra", accountNo: "XXXX7890", status: "Paid" },
  // ]);

  // // Vehicle list with updated statuses
  // const [vehicles, setVehicles] = useState([
  //   { id: 1, name: "Toyota Innova", model: "2022", type: "SUV", image: "src/assets/Toyota Innova.jpeg", status: "Available" },
  //   { id: 2, name: "Maruti Swift", model: "2021", type: "Hatchback", image: "src/assets/Maruti Swift.jpeg", status: "Available" },
  //   { id: 3, name: "Honda City", model: "2023", type: "Sedan", image: "src/assets/Honda City.jpeg", status: "Available" },
  //   { id: 4, name: "Hyundai Creta", model: "2022", type: "SUV", image: "src/assets/Hyundai Creta.jpeg", status: "Available" },
  //   { id: 5, name: "Mahindra XUV700", model: "2023", type: "SUV", image: "src/assets/Mahindra XUV700.jpeg", status: "Available" },
  //   { id: 6, name: "Tata Nexon", model: "2022", type: "Compact SUV", image: "src/assets/Tata Nexon.jpeg", status: "Available" },
  //   { id: 7, name: "Ford EcoSport", model: "2021", type: "Compact SUV", image:"src/assets/Ford EcoSport.jpeg", status: "Available" },
  //   { id: 8, name: "Kia Seltos", model: "2023", type: "SUV", image: "src/assets/Kia Seltos.jpeg", status: "Available" },
  //   { id: 9, name: "Renault Kwid", model: "2022", type: "Hatchback", image: "src/assets/Renault Kwid.jpeg", status: "Available" },
  //   { id: 10, name: "MG Hector", model: "2023", type: "SUV", image: "src/assets/MG Hector.jpeg", status: "Available" },
  //   { id: 11, name: "Skoda Octavia", model: "2022", type: "Sedan", image: "src/assets/Skoda Octavia.jpeg", status: "Available" },
  //   { id: 12, name: "Volkswagen Polo", model: "2021", type: "Hatchback", image: "src/assets/Volkswagen Polo.jpeg", status: "Available" },
  //   { id: 13, name: "Hyundai i20", model: "2022", type: "Hatchback", image: "src/assets/Hyundai i20.jpeg", status: "Available" },
  // ]);

  const profile = async () => {
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
    // In a real application, you would handle logout logic here
    // Such as clearing tokens, user session, redirect to login page, etc.
    alert("You have been logged out successfully!");
    closeLogoutModal();
    // Normally would redirect to login page
    // window.location.href = "/login";
  };

  // Handle menu item click to close sidebar on mobile
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
            {/* <button
              onClick={() => handleDriverSectionClick("salary")}
              className="w-full text-left px-4 py-2 bg-gray-400  rounded hover:bg-green-600"
            >
              Register
            </button> */}
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

                  {/* Just a single example row */}
                  <div className="grid grid-cols-4 border-b">
                    <div className="p-3">March 2025</div>
                    <div className="p-3">₹29,000</div>
                    <div className="p-3">15/03/2025</div>
                    <div className="p-3">
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                        Yet to Pay
                      </span>
                    </div>
                  </div>

                  {/* Previous month example */}
                  <div className="grid grid-cols-4">
                    <div className="p-3">February 2025</div>
                    <div className="p-3">₹29,000</div>
                    <div className="p-3">15/02/2025</div>
                    <div className="p-3">
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Paid
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Driver Documents Section */}
        {activeDriverSection === "documents" && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Driver Documents</h2>

            <div className="bg-white rounded-lg shadow p-6">
              {/* Driver Basic Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-800 border-b pb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Full Name</p>
                    <p className="font-medium">{currentDriver.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Driver ID</p>
                    <p className="font-medium">{currentDriver.driverID}</p>
                  </div>
                  {/* <div>
                      <p className="text-gray-600 text-sm">Phone Number</p>
                      <p className="font-medium">+91 9876543210</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Alternate Number</p>
                      <p className="font-medium text-gray-500">Not provided</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Email</p>
                      <p className="font-medium">priya.sharma@example.com</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Date of Birth</p>
                      <p className="font-medium">15/06/1990</p>
                    </div> */}
                </div>
              </div>

              {/* Document Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Aadhaar Card */}
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-blue-50 p-3 border-b">
                    <h3 className="font-semibold text-blue-800">
                      Aadhaar Card
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="aspect-[16/9] bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      <img
                        src={profileData.driverAdhaar}
                        alt="Aadhaar Card"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Aadhaar Number:</span>
                        <span className="font-medium">XXXX XXXX 4567</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Verification Status:
                        </span>
                        <span className="font-medium text-green-600">
                          Verified
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Date of Issue:</span>
                        <span className="font-medium">12/09/2018</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PAN Card */}
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-yellow-50 p-3 border-b">
                    <h3 className="font-semibold text-yellow-800">PAN Card</h3>
                  </div>
                  <div className="p-4">
                    <div className="aspect-[16/9] bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      <img
                        src="/api/placeholder/400/225"
                        alt="PAN Card"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">PAN Number:</span>
                        <span className="font-medium">ABCDE1234F</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Verification Status:
                        </span>
                        <span className="font-medium text-green-600">
                          Verified
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Name on Card:</span>
                        <span className="font-medium">Priya Sharma</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Driving License */}
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-green-50 p-3 border-b">
                    <h3 className="font-semibold text-green-800">
                      Driving License
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="aspect-[16/9] bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      <img
                        src="/api/placeholder/400/225"
                        alt="Driving License"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">License Number:</span>
                        <span className="font-medium">DL-1420110012345</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Class:</span>
                        <span className="font-medium">LMV/HMV</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Valid Until:</span>
                        <span className="font-medium">25/03/2030</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Verification Status:
                        </span>
                        <span className="font-medium text-green-600">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Proof */}
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-purple-50 p-3 border-b">
                    <h3 className="font-semibold text-purple-800">
                      Address Proof
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="aspect-[16/9] bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      <img
                        src="/api/placeholder/400/225"
                        alt="Address Proof"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Document Type:</span>
                        <span className="font-medium">Electricity Bill</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Address:</span>
                        <span className="font-medium">123 Main St, Mumbai</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Verification Status:
                        </span>
                        <span className="font-medium text-green-600">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Police Verification */}
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-red-50 p-3 border-b">
                    <h3 className="font-semibold text-red-800">
                      Police Verification
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="aspect-[16/9] bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      <img
                        src="/api/placeholder/400/225"
                        alt="Police Verification"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Certificate Number:
                        </span>
                        <span className="font-medium">PV-2023-45678</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Issued By:</span>
                        <span className="font-medium">Mumbai Police</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Issue Date:</span>
                        <span className="font-medium">10/01/2023</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Verification Status:
                        </span>
                        <span className="font-medium text-green-600">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bank Details */}
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-indigo-50 p-3 border-b">
                    <h3 className="font-semibold text-indigo-800">
                      Bank Details
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="aspect-[16/9] bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      <img
                        src="/api/placeholder/400/225"
                        alt="Bank Details"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Bank Name:</span>
                        <span className="font-medium">SBI</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Account Number:</span>
                        <span className="font-medium">XXXX XXXX 9012</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">IFSC Code:</span>
                        <span className="font-medium">SBIN0001234</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Account Type:</span>
                        <span className="font-medium">Savings</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <DriverManagement />
      </div>
    </div>
  );
};

export default Dashboard;
