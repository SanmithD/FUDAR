import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const DriverManagement = () => {
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
      [name]: e.target.files[0]
    });
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
    
    const driverNumberData = {
      primaryNumber: formData.driverNumber.primaryNumber,
      secondaryNumber: formData.driverNumber.secondaryNumber
    };
    
    formDataToSend.append("driverNumber[primaryNumber]", formData.driverNumber.primaryNumber);
    formDataToSend.append("driverNumber[secondaryNumber]", formData.driverNumber.secondaryNumber);
    
    formDataToSend.append("driverBankNumber", formData.driverBankNumber);
    formDataToSend.append("driverIFSC", formData.driverIFSC);
    formDataToSend.append("driverBankAddress", formData.driverBankAddress);
  
    if (files.driverImage) {
      formDataToSend.append("driverImage", files.driverImage);
    }
    if (files.driverAdhaar) {
      formDataToSend.append("driverAdhaar", files.driverAdhaar);
    }
    if (files.driverPan) {
      formDataToSend.append("driverPan", files.driverPan);
    }
    if (files.drivingLicence) {
      formDataToSend.append("drivingLicence", files.drivingLicence);
    }
  
    console.log("Form data being sent:");
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
    }
  
    try {
      let response;
      if (isEditing && selectedDriver) {
        const token = localStorage.getItem('token')
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
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
  
      if (response.data.success) {
        setSuccess(
          isEditing ? "Driver updated successfully" : "Driver created successfully"
        );
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
          fetchDrivers();
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
    <div style={{ padding: "1rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", marginBottom: "1.5rem" }}>Driver Management</h1>

      {error && (
        <div style={{ backgroundColor: "#FEE2E2", border: "1px solid #FECACA", color: "#B91C1C", padding: "0.75rem 1rem", marginBottom: "1rem", borderRadius: "0.25rem" }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ backgroundColor: "#D1FAE5", border: "1px solid #A7F3D0", color: "#047857", padding: "0.75rem 1rem", marginBottom: "1rem", borderRadius: "0.25rem" }}>
          {success}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        <div>
          <div style={{ backgroundColor: "white", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)", borderRadius: "0.5rem", padding: "1.5rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>
              {isEditing ? "Update Driver" : "Add New Driver"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "#374151", marginBottom: "0.5rem" }}>
                    Driver Name
                  </label>
                  <input
                    type="text"
                    name="driverName"
                    value={formData.driverName}
                    onChange={handleInputChange}
                    style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #D1D5DB", borderRadius: "0.375rem" }}
                    required
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "#374151", marginBottom: "0.5rem" }}>
                    Primary Number
                  </label>
                  <input
                    type="text"
                    name="primaryNumber"
                    value={formData.driverNumber.primaryNumber}
                    onChange={handleInputChange}
                    style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #D1D5DB", borderRadius: "0.375rem" }}
                    required
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "#374151", marginBottom: "0.5rem" }}>
                    Secondary Number
                  </label>
                  <input
                    type="text"
                    name="secondaryNumber"
                    value={formData.driverNumber.secondaryNumber}
                    onChange={handleInputChange}
                    style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #D1D5DB", borderRadius: "0.375rem" }}
                    required
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "#374151", marginBottom: "0.5rem" }}>
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    name="driverBankNumber"
                    value={formData.driverBankNumber}
                    onChange={handleInputChange}
                    style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #D1D5DB", borderRadius: "0.375rem" }}
                    required
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "#374151", marginBottom: "0.5rem" }}>IFSC Code</label>
                  <input
                    type="text"
                    name="driverIFSC"
                    value={formData.driverIFSC}
                    onChange={handleInputChange}
                    style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #D1D5DB", borderRadius: "0.375rem" }}
                    required
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "#374151", marginBottom: "0.5rem" }}>
                    Bank Address
                  </label>
                  <input
                    type="text"
                    name="driverBankAddress"
                    value={formData.driverBankAddress}
                    onChange={handleInputChange}
                    style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #D1D5DB", borderRadius: "0.375rem" }}
                    required
                  />
                </div>
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "500", marginBottom: "1rem" }}>Upload Documents</h3>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", color: "#374151", marginBottom: "0.5rem" }}>
                      Driver Image
                    </label>
                    <input
                      type="file"
                      name="driverImage"
                      onChange={handleFileChange}
                      style={{ width: "100%" }}
                      required={!isEditing}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", color: "#374151", marginBottom: "0.5rem" }}>
                      Aadhaar Card
                    </label>
                    <input
                      type="file"
                      name="driverAdhaar"
                      onChange={handleFileChange}
                      style={{ width: "100%" }}
                      required={!isEditing}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", color: "#374151", marginBottom: "0.5rem" }}>PAN Card</label>
                    <input
                      type="file"
                      name="driverPan"
                      onChange={handleFileChange}
                      style={{ width: "100%" }}
                      required={!isEditing}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", color: "#374151", marginBottom: "0.5rem" }}>
                      Driving License
                    </label>
                    <input
                      type="file"
                      name="drivingLicence"
                      onChange={handleFileChange}
                      style={{ width: "100%" }}
                      required={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
                <button
                  type="submit"
                  style={{ 
                    padding: "0.5rem 1rem", 
                    backgroundColor: "#2563EB", 
                    color: "white", 
                    borderRadius: "0.375rem", 
                    border: "none",
                    cursor: "pointer"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#1D4ED8"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#2563EB"}
                >
                  {isEditing ? "Update Driver" : "Add Driver"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  style={{ 
                    padding: "0.5rem 1rem", 
                    backgroundColor: "#D1D5DB", 
                    color: "#374151", 
                    borderRadius: "0.375rem", 
                    border: "none",
                    cursor: "pointer"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#9CA3AF"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#D1D5DB"}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Link to='/staffVehicle' style={{ display: "inline-block", marginTop: "1rem", color: "#2563EB", textDecoration: "none" }}>Staff Vehicle</Link>
    </div>
  );
};

export default DriverManagement;