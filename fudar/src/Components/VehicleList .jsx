import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/staffVehicle/all');
        setVehicles(response.data.vehicles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVehicles();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await axios.delete(`/api/staffVehicle/${id}`);
        alert('Vehicle deleted successfully');
        window.location.reload();
      } catch (error) {
        alert('Failed to delete vehicle');
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Staff Vehicles</h2>
      <Link to='/driverList'>View Drivers</Link>
      <Link to='/createVehicle'>ADD</Link>
      <table>
        <thead>
          <tr>
            <th>Vehicle Type</th>
            <th>Vehicle Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>{vehicle.vehicleType}</td>
              <td>{vehicle.vehicleNumber}</td>
              <td>{vehicle.status}</td>
              <td>
                <a href={`/vehicleDetails/${vehicle._id}`}>View</a>
                <a href={`/updateVehicle/${vehicle._id}`}>Edit</a>
                <button onClick={() => handleDelete(vehicle._id)}>Delete</button>
                {vehicle.status === "available" ? (
                  <Link to={`/create-booking/${vehicle._id}`} style={{ marginLeft: '10px' }}>
                    <button>Book</button>
                  </Link>
                ) : (
                  <span style={{ color: 'red', marginLeft: '10px' }}>Not Available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleList;