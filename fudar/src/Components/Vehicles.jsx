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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    setLoading(true);
    setError('');
    
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
      const response = await axios.post('https://fudar-dqqd.onrender.com/api/staffVehicle/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Vehicle created successfully');
      // Reset form after successful submission
      setFormData({
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
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Failed to create vehicle');
      } else {
        setError('An error occurred. Please try again.');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-4 md:p-8 md:w-[1000px] text-black relative md:absolute md:top-[50px] md:left-[270px]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Create New Staff Vehicle</h2>
        <Link to='/allVehicles' className="text-blue-500 border-2 border-black-500 p-2 text-lg md:text-xl rounded hover:underline inline-block">
          View
        </Link>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-gradient-to-br from-blue-400  to-green-400 text-white w-[335px] absolute left-[-15px] p-5 md:p-8 rounded-lg shadow-md flex flex-col gap-4 h-[1170px]">
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        <div className="mb-2 md:mb-4">
          <label className="block text-lg font-medium mb-2">Vehicle Type:</label>
          <input
            type="text"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2  border border-white rounded-lg text-white"
            disabled={loading}
          />
        </div>
        
        <div className="mb-2 md:mb-4">
          <label className="block text-lg font-medium mb-2">Vehicle Number:</label>
          <input
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-white rounded-lg text-white"
            disabled={loading}
          />
        </div>
        
        <div className="mb-2 md:mb-4">
          <label className="block text-lg font-medium mb-2">Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-white rounded-lg text-white"
            disabled={loading}
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="mb-2 md:mb-4">
            <label className="block text-lg font-medium mb-2">Vehicle Image Front:</label>
            <input
              type="file"
              name="vehicleImageFront"
              onChange={handleFileChange}
              required
              className="w-full px-4 py-2 border border-white rounded-lg text-white"
              disabled={loading}
            />
          </div>
          
          <div className="mb-2 md:mb-4">
            <label className="block text-lg font-medium mb-2">Vehicle Image Back:</label>
            <input
              type="file"
              name="vehicleImageBack"
              onChange={handleFileChange}
              required
              className="w-full px-4 py-2 border border-white rounded-lg text-white"
              disabled={loading}
            />
          </div>
          
          <div className="mb-2 md:mb-4">
            <label className="block text-lg font-medium mb-2">Vehicle Image Side:</label>
            <input
              type="file"
              name="vehicleImageSide"
              onChange={handleFileChange}
              required
              className="w-full px-4 py-2 border border-white rounded-lg text-white"
              disabled={loading}
            />
          </div>
          
          <div className="mb-2 md:mb-4">
            <label className="block text-lg font-medium mb-2">Vehicle RC:</label>
            <input
              type="file"
              name="staffVehicleRC"
              onChange={handleFileChange}
              required
              className="w-full px-4 py-2 border border-white rounded-lg text-white"
              disabled={loading}
            />
          </div>
          
          
          
          <div className="mb-2 md:mb-4">
            <label className="block text-lg font-medium mb-2">Vehicle Insurance:</label>
            <input
              type="file"
              name="staffVehicleInsurance"
              onChange={handleFileChange}
              required
              className="w-full px-4 py-2 border border-white rounded-lg text-white"
              disabled={loading}
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className="bg-black w-[200px] h-[38px] absolute left-[60px] bottom-[10px] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-600 mt-2"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Vehicle'}
        </button>
      </form>
    </div>
  );
};

export default Vehicles;