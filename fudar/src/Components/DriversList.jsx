import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DriverCard from './DriverCard';

function DriversList() {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/driver/getAllDriver');
        if (response.data.success) {
          setDrivers(response.data.details);
        } else {
          setError('Failed to fetch drivers');
        }
      } catch (error) {
        setError('Failed to fetch drivers');
        console.error(error);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Drivers List</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {drivers.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6B7280' }}>No drivers found</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {drivers.map(driver => (
            <DriverCard key={driver._id} driver={driver} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DriversList;