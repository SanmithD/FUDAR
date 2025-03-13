import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function DriverDetails() {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [salary, setSalary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/driver/getInfoById/${id}`);
        if (response.data.success) {
          setDriver(response.data.details);
          setSalary(response.data.salary);
        } else {
          setError('Failed to fetch driver details');
        }
      } catch (error) {
        setError('Failed to fetch driver details');
        console.error(error);
      }
    };

    fetchDriver();
  }, [id]);

  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  if (!driver) return <p style={{ textAlign: 'center', color: '#6B7280' }}>Loading...</p>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Driver Details</h2>
      <Link to='/driverList' style={{ display: 'block', marginBottom: '20px' }}>Back</Link>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={driver.driverImage}
          alt={driver.driverName}
          style={{ width: '150px', height: '150px', borderRadius: '75px', objectFit: 'cover', marginBottom: '20px' }}
        />
        <h3 style={{ margin: '5px 0' }}>{driver.driverName}</h3>
        
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <p style={{ margin: '5px 0', color: '#6B7280' }}>Primary Number: {driver.driverNumber[0]?.primaryNumber}</p>
          <p style={{ margin: '5px 0', color: '#6B7280' }}>Secondary Number: {driver.driverNumber[0]?.secondaryNumber}</p>
          <p style={{ margin: '5px 0', color: '#6B7280' }}>Bank Number: {driver.driverBankNumber}</p>
          <p style={{ margin: '5px 0', color: '#6B7280' }}>IFSC: {driver.driverIFSC}</p>
          
          <div style={{ margin: '10px 0' }}>
            <h4 style={{ margin: '5px 0', color: '#1F2937' }}>Salary History</h4>
            {salary.map((item, index) => (
              <p key={index} style={{ margin: '5px 0', color: '#6B7280' }}>
                {item.month}: ₹{item.amount}
              </p>
            ))}
          </div>
          
          <p style={{ margin: '5px 0', color: '#6B7280' }}>Status: {driver.status}</p>
          <p style={{ margin: '5px 0', color: '#6B7280' }}>Bank Address: {driver.driverBankAddress}</p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '5px 0', color: '#6B7280' }}>Adhaar</p>
              <img 
                src={driver.driverAdhaar} 
                alt="Adhaar" 
                style={{ 
                  width: '100px', 
                  height: '100px', 
                  objectFit: 'contain',
                  border: '1px solid #e5e7eb',
                  padding: '5px'
                }} 
              />
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '5px 0', color: '#6B7280' }}>Pan</p>
              <img 
                src={driver.driverPan} 
                alt="Pan" 
                style={{ 
                  width: '100px', 
                  height: '100px', 
                  objectFit: 'contain',
                  border: '1px solid #e5e7eb',
                  padding: '5px'
                }} 
              />
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '5px 0', color: '#6B7280' }}>Driving Licence</p>
              <img 
                src={driver.drivingLicence} 
                alt="Driving Licence" 
                style={{ 
                  width: '100px', 
                  height: '100px', 
                  objectFit: 'contain',
                  border: '1px solid #e5e7eb',
                  padding: '5px'
                }} 
              />
            </div>
          </div>
          
          <p style={{ margin: '5px 0', color: '#6B7280' }}>Created At: {new Date(driver.createdAt).toLocaleString()}</p>
          <p style={{ margin: '5px 0', color: '#6B7280' }}>Updated At: {new Date(driver.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default DriverDetails;