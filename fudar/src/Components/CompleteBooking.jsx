// components/CompleteBooking.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CompleteBooking() {
  const { bookingId } = useParams();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/book/staff/bookings/${bookingId}`);
        if (response.data.success) {
          setBookingDetails(response.data.booking);
        } else {
          setError('Failed to fetch booking details');
        }
      } catch (error) {
        setError('Failed to fetch booking details');
        console.error(error);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleComplete = async () => {
    if (window.confirm('Are you sure you want to complete this booking?')) {
      try {
        const response = await axios.patch(
          `http://localhost:8080/api/book/staff/bookings/${bookingId}/complete`
        );
        
        if (response.data.success) {
          setSuccessMessage('Booking marked as completed successfully');
        } else {
          setError('Failed to complete booking');
        }
      } catch (error) {
        setError('Failed to complete booking');
        console.error(error);
      }
    }
  };

  if (!bookingDetails) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Complete Booking {bookingId}</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <p style={{ margin: '5px 0', color: '#6B7280' }}>Driver: {bookingDetails.driver.driverName}</p>
        <p style={{ margin: '5px 0', color: '#6B7280' }}>Vehicle: {bookingDetails.staffVehicle.vehicleNumber}</p>
        <p style={{ margin: '5px 0', color: '#6B7280' }}>Current Status: {bookingDetails.status}</p>
        <p style={{ margin: '5px 0', color: '#6B7280' }}>Monthly Salary: {bookingDetails.monthlySalary || 'Not specified'}</p>
        <button
          onClick={handleComplete}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '15px',
          }}
        >
          Complete Booking
        </button>
      </div>
    </div>
  );
}

export default CompleteBooking;