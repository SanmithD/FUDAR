import React, { useEffect, useState } from 'react';

const StaffVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const inlineStyles = {
    body: {
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
      backgroundColor: '#f4f4f4',
    },
    header: {
      backgroundColor: '#2c3e50',
      color: 'white',
      textAlign: 'center',
      padding: '20px',
    },
    main: {
      padding: '20px',
    },
    filterSection: {
      marginBottom: '20px',
    },
    select: {
      padding: '10px',
      fontSize: '16px',
    },
    vehicleList: {
      marginTop: '20px',
    },
    vehicleItem: {
      backgroundColor: 'white',
      padding: '15px',
      marginBottom: '10px',
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    vehicleItemTitle: {
      margin: 0,
      fontSize: '20px',
    },
    vehicleItemText: {
      margin: '5px 0',
    },
  };

  // Function to fetch vehicles from API
  const fetchVehicles = async (status = '') => {
    setLoading(true);
    try {
      let url = 'http://localhost:8080/api/staffVehicle/all';
      if (status) {
        url += `?status=${status}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setVehicles(data.vehicles);
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle filter change
  const handleFilterChange = (event) => {
    const status = event.target.value;
    setStatusFilter(status);
    fetchVehicles(status);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div style={inlineStyles.body}>
      <header style={inlineStyles.header}>
        <h1>Staff Vehicles Dashboard</h1>
      </header>
      <main style={inlineStyles.main}>
        <div style={inlineStyles.filterSection}>
          <label htmlFor="vehicle-status">Filter by Status:</label>
          <select
            id="vehicle-status"
            value={statusFilter}
            onChange={handleFilterChange}
            style={inlineStyles.select}
          >
            <option value="">All</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <section style={inlineStyles.vehicleList}>
            <h2>All Vehicles</h2>
            <ul>
              {vehicles.map((vehicle) => (
                <li key={vehicle._id} style={inlineStyles.vehicleItem}>
                  <h3 style={inlineStyles.vehicleItemTitle}>
                    {vehicle.vehicleType} - {vehicle.vehicleNumber}
                  </h3>
                  <p style={inlineStyles.vehicleItemText}>
                    Status: {vehicle.status}
                  </p>
                  <p style={inlineStyles.vehicleItemText}>
                    RC:{' '}
                    <a href={vehicle.staffVehicleRC} target="_blank" rel="noopener noreferrer">
                      View RC
                    </a>
                  </p>
                  <p style={inlineStyles.vehicleItemText}>
                    Insurance:{' '}
                    <a href={vehicle.staffVehicleInsurance} target="_blank" rel="noopener noreferrer">
                      View Insurance
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

export default StaffVehicle;
