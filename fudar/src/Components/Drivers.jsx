import axios from "axios";
import {
  Edit,
  Eye,
  Filter,
  Search,
  // Truck,
  UserPlus,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Drivers() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);
  const [showDriverDetailModal, setShowDriverDetailModal] = useState(false);
  const [showEditDriverModal, setShowEditDriverModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [newDriver, setNewDriver] = useState({
    name: "",
    licenseNumber: "",
    contact: "",
    joinedDate: new Date().toISOString().split("T")[0],
    salaryStatus: "unpaid",
  });
  const [editedDriver, setEditedDriver] = useState({
    name: "",
    licenseNumber: "",
    contact: "",
    joinedDate: "",
    salaryStatus: "unpaid",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 10;

  const [error, setError] = useState(null);

  const getAllDriverDetails = async() =>{
    try {
      const response = await axios.get('https://fudar-dqqd.onrender.com/api/driver/getAllDriver');
      setBookings(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "https://fudar-dqqd.onrender.com/api/book/staff/bookings/all"
      );
      if (response.data.success) {
        setBookings(response.data.bookings);
        console.log(response.data.bookings);
        setLoading(false);
      } else {
        setError("Failed to fetch bookings");
      }
    } catch (error) {
      setError("Failed to fetch bookings");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookings();
    getAllDriverDetails();
  }, []);

  // Update the filteredDrivers logic to match backend data structure
  const filteredBookings = bookings.filter((booking) => {
    const driver = booking.driver;
    const matchesSearch =
      driver.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.driverNumber[0].primaryNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      driver.driverNumber[0].secondaryNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    if (filterStatus === "all") return matchesSearch;
    if (filterStatus === "assigned")
      return matchesSearch && driver.status === "assigned";
    if (filterStatus === "unassigned")
      return matchesSearch && driver.status !== "assigned";

    return matchesSearch;
  });

  // Pagination
  const indexOfLastBooking = currentPage * driversPerPage;
  const indexOfFirstBooking = indexOfLastBooking - driversPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const totalPages = Math.ceil(filteredBookings.length / driversPerPage);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-gray-100">
        {/* Page Heading */}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full mx-auto">
          <div className="p-6 flex justify-between items-center border-b border-gray-200">
            <h1 className="text-2xl font-bold">Drivers Management</h1>
            <button
              onClick={() => navigate('/newDriver')}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <UserPlus size={16} className="mr-2" /> Add New Driver
            </button>
          </div>

          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[250px] relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, license number, or contact"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="min-w-[200px]">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter size={18} className="text-gray-400" />
                  </div>
                  <select
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Drivers</option>
                    <option value="assigned">Assigned Drivers</option>
                    <option value="unassigned">Unassigned Drivers</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto flex-grow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Driver ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    License Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Joined Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Salary Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Assigned Vehicles
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentBookings.map((booking) => {
                  const driver = booking.driver;
                  const staffVehicle = booking.staffVehicle;
                  return (
                    <tr key={driver._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        DRV-{String(driver._id).slice(-4).toUpperCase()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {driver.driverName}
                        </div>
                      </td>
                      <td className="px-6 py-4 h-[150px] w-full whitespace-nowrap text-sm text-gray-500">
                        <img
                          src={driver.drivingLicence}
                          alt="Driving Licence"
                          className="h-[100%] w-[100px] "
                          style={{ width: '100px' }}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {driver.driverNumber[0].primaryNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(driver.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            driver.status === "assigned"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {driver.status === "assigned"
                            ? "Assigned"
                            : "Unassigned"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            driver.salaryStatus === "paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {driver.salaryStatus === "paid" ? "Paid" : "Unpaid"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {staffVehicle.vehicleType ? (
                          <div>
                            <p className="font-medium">
                              {staffVehicle.vehicleType}
                            </p>
                            <p className="text-sm text-gray-500">
                              {staffVehicle.vehicleNumber}
                            </p>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">None</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={()=>navigate(`/driverDetails/${driver._id}`)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setEditedDriver({
                              name: driver.driverName,
                              licenseNumber: driver.drivingLicence,
                              contact: driver.driverNumber[0].primaryNumber,
                              joinedDate: driver.createdAt,
                              salaryStatus: driver.salaryStatus,
                            });
                            setSelectedDriver(driver);
                            setShowEditDriverModal(true);
                            navigate(`/driverDetails/${driver._id}`)
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {currentBookings.length === 0 && (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No drivers match your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex justify-between items-center">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Driver Modal */}
      {showAddDriverModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add New Driver</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                value={newDriver.name}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, name: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                License Number
              </label>
              <input
                type="text"
                value={newDriver.licenseNumber}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, licenseNumber: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Contact
              </label>
              <input
                type="text"
                value={newDriver.contact}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, contact: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Joined Date
              </label>
              <input
                type="date"
                value={newDriver.joinedDate}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, joinedDate: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Salary Status
              </label>
              <select
                value={newDriver.salaryStatus}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, salaryStatus: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowAddDriverModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDriver}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Driver
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Driver Detail Modal */}
      {showDriverDetailModal && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Driver Details</h3>
            <div className="mb-3">
              <p className="text-sm text-gray-500 mb-1">Driver ID</p>
              <p className="font-medium">
                DRV-{String(selectedDriver._id).slice(-4)}
              </p>
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-500 mb-1">Name</p>
              <p className="font-medium">{selectedDriver.driverName}</p>
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-500 mb-1">License Number</p>
              <img
                src={selectedDriver.drivingLicence}
                alt="Driving Licence"
                height="200px"
                width="200px"
              />
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-500 mb-1">Contact</p>
              <p className="font-medium">
                {selectedDriver.driverNumber[0].primaryNumber}
              </p>
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-500 mb-1">Joined Date</p>
              <p className="font-medium">
                {new Date(selectedDriver.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-500 mb-1">Assignment Status</p>
              <span
                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  selectedDriver.status === "assigned"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {selectedDriver.status === "assigned"
                  ? "Assigned"
                  : "Unassigned"}
              </span>
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-500 mb-1">Salary Status</p>
              <span
                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  selectedDriver.salaryStatus === "paid"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {selectedDriver.salaryStatus === "paid" ? "Paid" : "Unpaid"}
              </span>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Assigned Vehicles</p>
              {selectedDriver.vehicle ? (
                <div>
                  <p className="font-medium">
                    {selectedDriver.vehicle.vehicleType}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedDriver.vehicle.vehicleNumber}
                  </p>
                </div>
              ) : (
                <p>None</p>
              )}
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setEditedDriver({
                    name: selectedDriver.driverName,
                    licenseNumber: selectedDriver.drivingLicence,
                    contact: selectedDriver.driverNumber[0].primaryNumber,
                    joinedDate: selectedDriver.createdAt,
                    salaryStatus: selectedDriver.salaryStatus,
                  });
                  setShowDriverDetailModal(false);
                  setShowEditDriverModal(true);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
              >
                <Edit size={16} className="mr-2" /> Edit
              </button>
              <button
                onClick={() => setShowDriverDetailModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Driver Modal */}
      {showEditDriverModal && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Edit Driver</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                value={editedDriver.name}
                onChange={(e) =>
                  setEditedDriver({ ...editedDriver, name: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                License Number
              </label>
              <input
                type="text"
                value={editedDriver.licenseNumber}
                onChange={(e) =>
                  setEditedDriver({
                    ...editedDriver,
                    licenseNumber: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Contact
              </label>
              <input
                type="text"
                value={editedDriver.contact}
                onChange={(e) =>
                  setEditedDriver({ ...editedDriver, contact: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Joined Date
              </label>
              <input
                type="date"
                value={editedDriver.joinedDate}
                onChange={(e) =>
                  setEditedDriver({
                    ...editedDriver,
                    joinedDate: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Salary Status
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    setEditedDriver({ ...editedDriver, salaryStatus: "paid" })
                  }
                  className={`px-4 py-2 rounded-md ${
                    editedDriver.salaryStatus === "paid"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Paid
                </button>
                <button
                  onClick={() =>
                    setEditedDriver({ ...editedDriver, salaryStatus: "unpaid" })
                  }
                  className={`px-4 py-2 rounded-md ${
                    editedDriver.salaryStatus === "unpaid"
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Unpaid
                </button>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowEditDriverModal(false);
                  if (showDriverDetailModal) {
                    setShowDriverDetailModal(true);
                  }
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEditDriver}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
