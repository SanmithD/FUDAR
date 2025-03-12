import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CreateBooking() {
  const { vehicleId } = useParams();
  const [driverId, setDriverId] = useState('');
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [sideImage, setSideImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(()=>{
    console.log(vehicleId)
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append('driverId', driverId);
    formData.append('front', frontImage);
    formData.append('back', backImage);
    formData.append('side', sideImage);

    try {
      const response = await axios.post(`http://localhost:8080/api/book/driver/book/${vehicleId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      
      if (response.data.success) {
        alert('Booking created successfully');
      } else {
        setError('Failed to create booking');
      }
    } catch (error) {
      setError('Failed to create booking');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create New Booking</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Driver ID:</label>
          <input
            type="text"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Front Image:</label>
          <input
            type="file"
            onChange={(e) => setFrontImage(e.target.files[0])}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Back Image:</label>
          <input
            type="file"
            onChange={(e) => setBackImage(e.target.files[0])}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Side Image:</label>
          <input
            type="file"
            onChange={(e) => setSideImage(e.target.files[0])}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Create Booking
        </button>
      </form>
    </div>
  );
}

export default CreateBooking;