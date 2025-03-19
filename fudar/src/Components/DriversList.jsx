import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DriverCard from './DriverCard';

function DriversList() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/driver/getAllDriver');
        if (response.data.success) {
          setDrivers(response.data.details);
          console.log(response.data)
        } else {
          setError('Failed to fetch drivers');
        }
      } catch (error) {
        setError('Error fetching drivers');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getAllDrivers();
  }, []);

  const handleCardClick = (driverId) => {
    navigate(`/driverDetails/${driverId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-500">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 lg:mt-[40px]">
      <div className="max-w-7xl mx-auto ">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Drivers List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map((driver) => (
            <DriverCard
              key={driver._id}
              driver={driver}
              onClick={() => handleCardClick(driver._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DriversList;