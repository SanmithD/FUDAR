import React from 'react';
import { Link } from 'react-router-dom';

function DriverCard({ driver }) {
  return (
    <div
      style={{
        width: '200px',
        margin: '10px',
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      <img
        src={driver.driverImage}
        alt={driver.driverName}
        style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }}
      />
      <h3 style={{ margin: '5px 0' }}>{driver.driverName}</h3>
      <p style={{ margin: '5px 0', color: '#6B7280' }}>Primary Number: {driver.driverNumber[0]?.primaryNumber}</p>
      <p style={{ margin: '5px 0', color: '#6B7280' }}>Created At: {new Date(driver.createdAt).toLocaleString()}</p>
      <Link
        to={`/driver/${driver._id}`}
        style={{
          display: 'inline-block',
          padding: '5px 10px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
      >
        View Details
      </Link>
    </div>
  );
}

export default DriverCard;