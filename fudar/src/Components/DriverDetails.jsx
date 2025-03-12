import axios from 'axios';
import React, { useEffect, useState } from 'react';

function DriverDetails() {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/driver/getAllDriver');
        if (response.data.success) {
          setDriver(response.data.details[0]); // Assuming we want to display the first driver
        } else {
          setError('Failed to fetch driver details');
        }
      } catch (err) {
        setError(`Failed to fetch driver details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverDetails();
  }, []);

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  const sectionStyle = {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const headingStyle = {
    color: '#2c3e50',
    borderBottom: '2px solid #eee',
    paddingBottom: '10px'
  };

  const paragraphStyle = {
    margin: '10px 0',
    lineHeight: '1.5'
  };

  const linkStyle = {
    color: '#3498db',
    textDecoration: 'none'
  };

  const loadingStyle = {
    textAlign: 'center',
    padding: '50px',
    fontSize: '1.2em',
    color: '#666'
  };

  const errorStyle = {
    textAlign: 'center',
    color: '#e74c3c',
    padding: '50px',
    fontSize: '1.2em'
  };

  if (loading) {
    return <div style={loadingStyle}>Loading driver details...</div>;
  }

  if (error) {
    return <div style={errorStyle}>{error}</div>;
  }

  if (!driver) {
    return <div style={errorStyle}>No driver found</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Driver Details</h1>
      
      <div>
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Basic Information</h2>
          <p style={paragraphStyle}><strong>ID:</strong> {driver._id}</p>
          <p style={paragraphStyle}><strong>Name:</strong> {driver.driverName}</p>
          <p style={paragraphStyle}><strong>Status:</strong> {driver.status}</p>
          <p style={paragraphStyle}><strong>Created At:</strong> {new Date(driver.createdAt).toLocaleString()}</p>
          <p style={paragraphStyle}><strong>Updated At:</strong> {new Date(driver.updatedAt).toLocaleString()}</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>Contact Information</h2>
          <p style={paragraphStyle}><strong>Primary Phone:</strong> {driver.driverNumber[0].primaryNumber}</p>
          <p style={paragraphStyle}><strong>Secondary Phone:</strong> {driver.driverNumber[0].secondaryNumber}</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>Bank Details</h2>
          <p style={paragraphStyle}><strong>Bank Account Number:</strong> {driver.driverBankNumber}</p>
          <p style={paragraphStyle}><strong>IFSC Code:</strong> {driver.driverIFSC}</p>
          <p style={paragraphStyle}><strong>Bank Address:</strong> {driver.driverBankAddress}</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>Documents</h2>
          <p style={paragraphStyle}>
            <strong>Aadhaar:</strong> 
            <a href={driver.driverAdhaar} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              View Document
            </a>
          </p>
          <p style={paragraphStyle}>
            <strong>PAN:</strong> 
            <a href={driver.driverPan} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              View Document
            </a>
          </p>
          <p style={paragraphStyle}>
            <strong>Driving Licence:</strong> 
            <a href={driver.drivingLicence} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              View Document
            </a>
          </p>
          <p style={paragraphStyle}>
            <strong>Profile Image:</strong> 
            <a href={driver.driverImage} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              View Image
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DriverDetails;