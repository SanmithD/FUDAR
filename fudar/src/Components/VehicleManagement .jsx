import axios from "axios";
import { useEffect, useState } from "react";

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleNumber: "",
    driverId: "",
  });
  const [files, setFiles] = useState({
    vehicleImage: null,
    emissionTest: null,
    vehicleRC: null,
    vehicleInsurance: null,
  });
  const [viewMode, setViewMode] = useState("list");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [assignMode, setAssignMode] = useState(false);
  const [selectedAssignVehicle, setSelectedAssignVehicle] = useState("");
  const [staffVehicleId, setStaffVehicleId] = useState(null);
  const [driverIdData, setDriverIdData] = useState(null);

  useEffect(() => {
    fetchVehicles();
    fetchDrivers();
    fetchAvailableVehicles();
  }, []);

  const fetchAvailableVehicles = async () => {
    try {
      const res = await axios.get("https://fudar-dqqd.onrender.com/api/staffVehicle/all");
      const allVehicles = res.data.vehicles || [];
      let assignedVehicleIds = [];

      try {
        const bookings = await axios.get(
          "https://fudar-dqqd.onrender.com/api/book/active"
        );
        setStaffVehicleId(bookings.data[0].staffVehicle);
        assignedVehicleIds = bookings.data.map((booking) =>
          booking.staffVehicle.toString()
        );
      } catch (bookingErr) {
        console.warn(
          "No active bookings found or endpoint unavailable",
          bookingErr
        );
      }

      const available = allVehicles.filter(
        (vehicle) => !assignedVehicleIds.includes(vehicle._id.toString())
      );
      setAvailableVehicles(available);
    } catch (err) {
      setError("Failed to fetch available vehicles: " + err.message);
    }
  };

  const fetchVehicles = async () => {
    try {
      const res = await axios.get("https://fudar-dqqd.onrender.com/api/staffVehicle/all");
      setVehicles(res.data.vehicles || []);
      setDriverIdData(res.data.vehicles._id);
    } catch (err) {
      setError("Failed to fetch vehicles: " + err.message);
    }
  };

  const fetchDrivers = async () => {
    try {
      const res = await axios.get(
        "https://fudar-dqqd.onrender.com/api/driver/getAllDriver"
      );
      setDrivers(res.data.details || []);
      setDriverIdData(res.data.details[0]._id);
    } catch (err) {
      console.error("Failed to fetch drivers:", err);
      setError("Failed to fetch drivers");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleCreateUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });

    Object.entries(files).forEach(([key, file]) => {
      if (file) formDataToSend.append(key, file);
    });

    try {
      if (selectedVehicle) {
        const response = await axios.put(
          `https://fudar-dqqd.onrender.com/api/vehicle/${selectedVehicle._id}`,
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setSuccess("Vehicle updated successfully");
      }
      resetState();
      fetchVehicles();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this vehicle?")) {
      try {
        await axios.delete(
          `https://fudar-dqqd.onrender.com/api/staffVehicle/deleteStaffVehicle/${id}`
        );
        setSuccess("Vehicle deleted successfully");
        fetchVehicles();
      } catch (err) {
        setError("Failed to delete vehicle: " + err.message);
      }
    }
  };

  const handleStaffAssign = async () => {
    if (!selectedAssignVehicle || !formData.driverId) {
      setError("Please select a vehicle and driver");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://fudar-dqqd.onrender.com/api/vehicle/staffAssign",
        {
          vehicleId: selectedAssignVehicle,
          driverId: formData.driverId,
        }
      );

      setSuccess("Vehicle assigned successfully");
      setAssignMode(false);
      setSelectedAssignVehicle("");
      setFormData({ ...formData, driverId: "" });
      fetchVehicles();
      fetchAvailableVehicles();
      fetchDrivers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to assign vehicle");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // const handleUnassignDriver = async (vehicleId, driverIdData) => {
  //   try {
  //     await axios.put(
  //       `https://fudar-dqqd.onrender.com/api/vehicle/unassign/${vehicleId}/driver/${driverIdData}`
  //     );
  //     setSuccess("Driver unassigned successfully");
  //     fetchVehicles();
  //     fetchAvailableVehicles();
  //     fetchDrivers();
  //   } catch (err) {
  //     setError("Failed to unassign driver: " + err.message);
  //     console.error("Error unassigning driver:", err);
  //   }
  // };

  const resetState = () => {
    setFormData({ vehicleType: "", vehicleNumber: "", driverId: "" });
    setFiles({
      vehicleImage: null,
      emissionTest: null,
      vehicleRC: null,
      vehicleInsurance: null,
    });
    setSelectedVehicle(null);
    setViewMode("list");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Vehicle Management
      </h1>

      {error && (
        <div className="bg-red-100 text-red-800 p-4 mb-6 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 text-green-800 p-4 mb-6 rounded-lg">
          {success}
        </div>
      )}

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setViewMode("list")}
          className={`px-4 py-2 rounded-md transition-colors ${
            viewMode === "list"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          View All
        </button>
        <button
          onClick={() => setAssignMode(true)}
          className={`px-4 py-2 rounded-md transition-colors ${
            assignMode
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Assign Vehicle
        </button>
      </div>

      {assignMode && (
        <div className="bg-white p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold mb-6">
            Assign Vehicle to Driver
          </h2>
          <div className="flex gap-6 mb-6">
            <div className="w-1/2">
              <label className="block mb-2 font-medium text-gray-700">
                Select Vehicle
              </label>
              <select
                value={selectedAssignVehicle}
                onChange={(e) => setSelectedAssignVehicle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Vehicle</option>
                {availableVehicles.map((vehicle) => (
                  <option key={vehicle._id} value={vehicle._id}>
                    {vehicle.vehicleNumber} - {vehicle.vehicleType}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-1/2">
              <label className="block mb-2 font-medium text-gray-700">
                Select Driver
              </label>
              <select
                value={formData.driverId}
                onChange={(e) =>
                  setFormData({ ...formData, driverId: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Driver</option>
                {drivers
                  .filter((driver) => driver.status === "available")
                  .map((driver) => (
                    <option key={driver._id} value={driver._id}>
                      {driver.driverName}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={handleStaffAssign}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {loading ? "Assigning..." : "Assign"}
            </button>
            <button
              onClick={() => {
                setAssignMode(false);
                setSelectedAssignVehicle("");
                setFormData({ ...formData, driverId: "" });
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {viewMode === "list" && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Number</th>
                <th className="p-4 text-left">Assigned Driver</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle._id} className="border-b border-gray-200">
                  <td className="p-4">{vehicle.vehicleType}</td>
                  <td className="p-4">{vehicle.vehicleNumber}</td>
                  <td className="p-4">
                    {drivers.find((d) => d.vehicle === vehicle._id)
                      ?.driverName || "Unassigned"}
                  </td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedVehicle(vehicle);
                        setViewMode("details");
                      }}
                      className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle._id)}
                      className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === "form" && selectedVehicle && (
        <form onSubmit={handleCreateUpdate} className="bg-white p-6 rounded-lg">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Vehicle Type
              </label>
              <input
                type="text"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Vehicle Number
              </label>
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Vehicle Image
              </label>
              <input
                type="file"
                name="vehicleImage"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Emission Test
              </label>
              <input
                type="file"
                name="emissionTest"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Vehicle RC
              </label>
              <input
                type="file"
                name="vehicleRC"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Vehicle Insurance
              </label>
              <input
                type="file"
                name="vehicleInsurance"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {loading ? "Processing..." : "Update Vehicle"}
            </button>
            <button
              type="button"
              onClick={resetState}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {viewMode === "details" && selectedVehicle && (
        <div className="bg-white p-6 rounded-lg flex flex-col gap-[20px] ">
          <div className="flex gap[20px]">
            <div className="flex gap-[20px]">
              <div className="gap-6 mb-6 flex flex-col w-[30%] ">
                <h2 className="text-2xl font-semibold mb-6">Vehicle Details</h2>
                <div>
                  <p className="font-medium mb-2">
                    Type: {selectedVehicle.vehicleType}
                  </p>
                  <p className="font-medium mb-2">
                    Number: {selectedVehicle.vehicleNumber}
                  </p>
                  <p className="font-medium mb-2">
                    Assigned Driver:{" "}
                    {drivers.find((d) => d.vehicle === selectedVehicle._id)
                      ?.driverName || "None"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4 text-[30px] ">Documents:</h3>
                <div className="flex gap-[30px] ">
                  <div>
                    <p className="mb-4">
                      Emission Test:{" "}
                      <img
                        src={selectedVehicle.staffVehicleEmission}
                        alt={selectedVehicle.staffVehicleEmission}
                        className="h-48 w-64 object-cover"
                      />
                    </p>
                    <p className="mb-4">
                      Vehicle RC:{" "}
                      <img
                        src={selectedVehicle.staffVehicleRC}
                        alt={selectedVehicle.staffVehicleRC}
                        className="h-48 w-64 object-cover"
                      />
                    </p>
                    <p>
                      Insurance:{" "}
                      <img
                        src={selectedVehicle.staffVehicleInsurance}
                        alt={selectedVehicle.staffVehicleInsurance}
                        className="h-48 w-64 object-cover"
                      />
                    </p>
                  </div>
                  <div>
                    <p className="mb-4">
                      Front View:{" "}
                      <img
                        src={selectedVehicle.vehicleImage[0].front}
                        alt={selectedVehicle.vehicleImage.back}
                        className="h-48 w-64 object-cover"
                      />
                    </p>
                    <p className="mb-4">
                      Back View:{" "}
                      <img
                        src={selectedVehicle.vehicleImage[0].back}
                        alt={selectedVehicle.vehicleImage.back}
                        className="h-48 w-64 object-cover"
                      />
                    </p>
                    <p className="mb-4">
                      Side View:{" "}
                      <img
                        src={selectedVehicle.vehicleImage[0].side}
                        alt={selectedVehicle.vehicleImage.side}
                        className="h-48 w-64 object-cover"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex items-center gap-2 mb-6">
            <select
              value={formData.driverId}
              onChange={(e) =>
                setFormData({ ...formData, driverId: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Driver</option>
              {drivers
                .filter((driver) => driver.status === "available")
                .map((driver) => (
                  <option key={driver._id} value={driver._id}>
                    {driver.driverName}
                  </option>
                ))}
            </select>
            <button
              onClick={() => handleDelete(driverIdData)}
              className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div> */}
          <button
            onClick={() => setViewMode("list")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to List
          </button>
        </div>
      )}
    </div>
  );
};

export default VehicleManagement;
