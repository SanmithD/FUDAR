import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateVehicle = () => {
  const [formData, setFormData] = useState({
    vehicleType: '',
    vehicleNumber: '',
    status: 'available',
    vehicleImageFront: null,
    vehicleImageBack: null,
    vehicleImageSide: null,
    staffVehicleRC: null,
    staffVehicleEmission: null,
    staffVehicleInsurance: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('vehicleType', formData.vehicleType);
    formDataToSend.append('vehicleNumber', formData.vehicleNumber);
    formDataToSend.append('status', formData.status);
    formDataToSend.append('vehicleImage[front]', formData.vehicleImageFront);
    formDataToSend.append('vehicleImage[back]', formData.vehicleImageBack);
    formDataToSend.append('vehicleImage[side]', formData.vehicleImageSide);
    formDataToSend.append('staffVehicleRC', formData.staffVehicleRC);
    formDataToSend.append('staffVehicleEmission', formData.staffVehicleEmission);
    formDataToSend.append('staffVehicleInsurance', formData.staffVehicleInsurance);

    try {
      const response = await axios.post('http://localhost:8080/api/staffVehicle/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Vehicle created successfully');
    } catch (error) {
      alert('Failed to create vehicle');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Create New Staff Vehicle</h2>
      <Link to='/staffVehicle'>View</Link>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Vehicle Type:</label>
          <input
            type="text"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Vehicle Number:</label>
          <input
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
        <div>
          <label>Vehicle Image Front:</label>
          <input
            type="file"
            name="vehicleImageFront"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label>Vehicle Image Back:</label>
          <input
            type="file"
            name="vehicleImageBack"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label>Vehicle Image Side:</label>
          <input
            type="file"
            name="vehicleImageSide"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label>Vehicle RC:</label>
          <input
            type="file"
            name="staffVehicleRC"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label>Vehicle Emission:</label>
          <input
            type="file"
            name="staffVehicleEmission"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label>Vehicle Insurance:</label>
          <input
            type="file"
            name="staffVehicleInsurance"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Create Vehicle</button>
      </form>
    </div>
  );
};

export default CreateVehicle;