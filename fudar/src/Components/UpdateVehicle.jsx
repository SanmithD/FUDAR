import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const UpdateVehicle = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
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

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/staffVehicle/viewStaffVehicle/${id}`);
        setVehicle(response.data.vehicle);
        setFormData({
          vehicleType: response.data.vehicle.vehicleType,
          vehicleNumber: response.data.vehicle.vehicleNumber,
          status: response.data.vehicle.status,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchVehicle();
  }, [id]);

  if (!vehicle) return <div>Loading...</div>;

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
      const response = await axios.put(`http://localhost:8080/api/staffVehicle/staffVehicleUpdate/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Vehicle updated successfully');
      console.log(response.data);
    } catch (error) {
      alert('Failed to update vehicle');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Update Staff Vehicle</h2>
      <Link to="/staffVehicle">View</Link>
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
          />
        </div>
        <div>
          <label>Vehicle Image Back:</label>
          <input
            type="file"
            name="vehicleImageBack"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label>Vehicle Image Side:</label>
          <input
            type="file"
            name="vehicleImageSide"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label>Vehicle RC:</label>
          <input
            type="file"
            name="staffVehicleRC"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label>Vehicle Emission:</label>
          <input
            type="file"
            name="staffVehicleEmission"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label>Vehicle Insurance:</label>
          <input
            type="file"
            name="staffVehicleInsurance"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Update Vehicle</button>
      </form>
    </div>
  );
};

export default UpdateVehicle;