import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Vehicles = () => {
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
    <div className="container mx-auto p-8  text-black">
      <div className='flex justify-between' >
      <h2 className="text-3xl font-bold mb-4">Create New Staff Vehicle</h2>
      <Link to='/allVehicles' className="text-blue-500 border-2 border-black-500 p-2 text-xl rounded hover:underline mb-8 inline-block">View</Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-[10px] ">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Vehicle Type:</label>
          <input
            type="text"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-700 rounded-lg  text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Vehicle Number:</label>
          <input
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-700 rounded-lg  text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg  text-black"
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
        <div className='grid grid-cols-3 gap-[20px]' >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Vehicle Image Front:</label>
          <input
            type="file"
            name="vehicleImageFront"
            onChange={handleFileChange}
            required
            className="w-full px-4 py-2 border border-gray-700 rounded-lg  text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Vehicle Image Back:</label>
          <input
            type="file"
            name="vehicleImageBack"
            onChange={handleFileChange}
            required
            className="w-full px-4 py-2 border border-gray-700 rounded-lg  text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Vehicle Image Side:</label>
          <input
            type="file"
            name="vehicleImageSide"
            onChange={handleFileChange}
            required
            className="w-full px-4 py-2 border border-gray-700 rounded-lg  text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Vehicle RC:</label>
          <input
            type="file"
            name="staffVehicleRC"
            onChange={handleFileChange}
            required
            className="w-full px-4 py-2 border border-gray-700 rounded-lg  text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Vehicle Emission:</label>
          <input
            type="file"
            name="staffVehicleEmission"
            onChange={handleFileChange}
            required
            className="w-full px-4 py-2 border border-gray-700 rounded-lg  text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Vehicle Insurance:</label>
          <input
            type="file"
            name="staffVehicleInsurance"
            onChange={handleFileChange}
            required
            className="w-full px-4 py-2 border border-gray-700 rounded-lg  text-black"
          />
        </div>
        </div>
        <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer  hover:bg-gray-600">
          Create Vehicle
        </button>
      </form>
    </div>
  );
};

export default Vehicles;