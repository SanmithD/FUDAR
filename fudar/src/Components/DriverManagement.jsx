import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DriverManagement = () => {
  const navigate = useNavigate();
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [formData, setFormData] = useState({
    driverName: "",
    driverNumber: {
      primaryNumber: "",
      secondaryNumber: "",
    },
    driverBankNumber: "",
    driverIFSC: "",
    driverBankAddress: "",
  });
  const [files, setFiles] = useState({
    driverImage: null,
    driverAdhaar: null,
    driverPan: null,
    drivingLicence: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "primaryNumber" || name === "secondaryNumber") {
      setFormData({
        ...formData,
        driverNumber: {
          ...formData.driverNumber,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFiles({
      ...files,
      [name]: e.target.files[0],
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, name) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFiles({
        ...files,
        [name]: file,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      driverName: "",
      driverNumber: {
        primaryNumber: "",
        secondaryNumber: "",
      },
      driverBankNumber: "",
      driverIFSC: "",
      driverBankAddress: "",
    });
    setFiles({
      driverImage: null,
      driverAdhaar: null,
      driverPan: null,
      drivingLicence: null,
    });
    setIsEditing(false);
    setSelectedDriver(null);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formDataToSend = new FormData();
    formDataToSend.append("driverName", formData.driverName);
    formDataToSend.append("driverNumber[primaryNumber]", formData.driverNumber.primaryNumber);
    formDataToSend.append("driverNumber[secondaryNumber]", formData.driverNumber.secondaryNumber);
    formDataToSend.append("driverBankNumber", formData.driverBankNumber);
    formDataToSend.append("driverIFSC", formData.driverIFSC);
    formDataToSend.append("driverBankAddress", formData.driverBankAddress);

    if (files.driverImage) formDataToSend.append("driverImage", files.driverImage);
    if (files.driverAdhaar) formDataToSend.append("driverAdhaar", files.driverAdhaar);
    if (files.driverPan) formDataToSend.append("driverPan", files.driverPan);
    if (files.drivingLicence) formDataToSend.append("drivingLicence", files.drivingLicence);

    try {
      let response;
      if (isEditing && selectedDriver) {
        const token = localStorage.getItem('token');
        response = await axios.put(
          `http://localhost:8080/api/driver/updateInfo`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:8080/api/driver/postInfo",
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response.data.success) {
        setSuccess(isEditing ? "Driver updated successfully" : "Driver created successfully");
        resetForm();
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      console.error("Error details:", error.response?.data || error);
    }
  };

  const deleteDriver = async (id) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/api/driver/deleteDriverById/${id}`
        );
        if (response.data.success) {
          setSuccess("Driver deleted successfully");
          if (selectedDriver && selectedDriver._id === id) {
            resetForm();
          }
        }
      } catch (error) {
        setError(error.response?.data?.message || "Failed to delete driver");
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 border-b border-black pb-2">
          Driver Management
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-white border border-black text-black rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-white border border-black text-black rounded-lg">
            {success}
          </div>
        )}

        <div className="bg-white border border-black rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">
            {isEditing ? "Update Driver" : "Add New Driver"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Driver Name</label>
                  <input
                    type="text"
                    name="driverName"
                    value={formData.driverName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Primary Number</label>
                  <input
                    type="text"
                    name="primaryNumber"
                    value={formData.driverNumber.primaryNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Secondary Number</label>
                  <input
                    type="text"
                    name="secondaryNumber"
                    value={formData.driverNumber.secondaryNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
              </div>

              {/* Bank Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Bank Account Number</label>
                  <input
                    type="text"
                    name="driverBankNumber"
                    value={formData.driverBankNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">IFSC Code</label>
                  <input
                    type="text"
                    name="driverIFSC"
                    value={formData.driverIFSC}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bank Address</label>
                  <input
                    type="text"
                    name="driverBankAddress"
                    value={formData.driverBankAddress}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Upload Documents</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: "driverImage", label: "Driver Image" },
                  { name: "driverAdhaar", label: "Aadhaar Card" },
                  { name: "driverPan", label: "PAN Card" },
                  { name: "drivingLicence", label: "Driving License" },
                ].map((fileType) => (
                  <div key={fileType.name}>
                    <label className="block text-sm font-medium mb-1">{fileType.label}</label>
                    <div
                      className="border-2 border-black rounded p-4 text-center hover:bg-gray-100 transition-colors"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, fileType.name)}
                      onClick={() => document.getElementById(fileType.name)?.click()}
                    >
                      <input
                        type="file"
                        id={fileType.name}
                        name={fileType.name}
                        onChange={handleFileChange}
                        className="hidden"
                        required={!isEditing}
                      />
                      <p className="text-sm">
                        {files[fileType.name] 
                          ? files[fileType.name].name 
                          : "Drag & drop or click to upload"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white rounded border border-black hover:bg-gray-800 transition-colors"
              >
                {isEditing ? "Update Driver" : "Add Driver"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-white text-black rounded border border-black hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-2 bg-white text-black rounded border border-black hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default DriverManagement;