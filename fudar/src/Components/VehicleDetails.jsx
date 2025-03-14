import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './VehicleDetails.css';

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/staffVehicle/viewStaffVehicle/${id}`);
        setVehicle(response.data.vehicle);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
        setError("Failed to load vehicle details");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await axios.delete(`http://localhost:8080/api/staffVehicle/${id}`);
        alert('Vehicle deleted successfully');
        navigate('/');
      } catch (error) {
        alert('Failed to delete vehicle');
        console.error(error);
      }
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading vehicle details...</p>
    </div>
  );

  if (error) return <div className="error-message">{error}</div>;
  
  if (!vehicle) return <div className="error-message">Vehicle not found</div>;

  return (
    <div className="vehicle-details-container">
      <div className="vehicle-details-header">
        <h2>Vehicle Details</h2>
        <div className="vehicle-actions">
          <button className="edit-button" onClick={() => navigate(`/updateVehicle/${id}`)}>
            Edit Vehicle
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Delete Vehicle
          </button>
        </div>
      </div>

      <div className="vehicle-info-card">
        <div className="vehicle-basic-info">
          <div className="info-item">
            <span className="info-label">Vehicle Type:</span>
            <span className="info-value">{vehicle.vehicleType}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Vehicle Number:</span>
            <span className="info-value">{vehicle.vehicleNumber}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Status:</span>
            <span className={`status-badge ${vehicle.status === 'available' ? 'available' : 'unavailable'}`}>
              {vehicle.status}
            </span>
          </div>
        </div>

        <h3>Vehicle Images</h3>
        <div className="vehicle-images">
          <div className="image-container">
            <img 
              src={vehicle.vehicleImage[0].front} 
              alt="Front View" 
              onError={(e) => e.target.src = '/placeholder-image.jpg'}
            />
            <span className="image-label">Front View</span>
          </div>
          <div className="image-container">
            <img 
              src={vehicle.vehicleImage[0].back} 
              alt="Back View" 
              onError={(e) => e.target.src = '/placeholder-image.jpg'}
            />
            <span className="image-label">Back View</span>
          </div>
          <div className="image-container">
            <img 
              src={vehicle.vehicleImage[0].side} 
              alt="Side View" 
              onError={(e) => e.target.src = '/placeholder-image.jpg'}
            />
            <span className="image-label">Side View</span>
          </div>
        </div>

        <h3>Vehicle Documents</h3>
        <div className="vehicle-documents">
          <div className="document-item">
            <span className="document-label">Registration Certificate:</span>
            <a href={vehicle.staffVehicleRC} target="_blank" rel="noopener noreferrer" className="document-link">
              View Document
            </a>
          </div>
          <div className="document-item">
            <span className="document-label">Emission Certificate:</span>
            <a href={vehicle.staffVehicleEmission} target="_blank" rel="noopener noreferrer" className="document-link">
              View Document
            </a>
          </div>
          <div className="document-item">
            <span className="document-label">Insurance:</span>
            <a href={vehicle.staffVehicleInsurance} target="_blank" rel="noopener noreferrer" className="document-link">
              View Document
            </a>
          </div>
        </div>

        <div className="metadata">
          <div className="metadata-item">
            <span className="metadata-label">Created:</span>
            <span className="metadata-value">{new Date(vehicle.createdAt).toLocaleString()}</span>
          </div>
          <div className="metadata-item">
            <span className="metadata-label">Last Updated:</span>
            <span className="metadata-value">{new Date(vehicle.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;