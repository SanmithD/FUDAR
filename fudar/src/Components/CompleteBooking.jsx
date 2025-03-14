import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CompleteBooking() {
  const { driver } = useParams();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/book/driver/bookings/${driver}`);
        if (response.data.success) {
          setBookingDetails(response.data.bookings);
        } else {
          setError('Failed to fetch booking details');
        }
      } catch (error) {
        setError('Failed to fetch booking details');
        console.error(error);
      }
    };

    fetchBooking();
  }, [driver]);

  const handleComplete = async () => {
    if (window.confirm('Are you sure you want to complete this booking?')) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/book/completeBooking/${driver}`
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

  const booking = bookingDetails[0] || {};

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Complete Booking {driver}</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <p style={{ margin: '5px 0', color: '#6B7280' }}>Driver ID: {booking.driver || 'N/A'}</p>
        <p style={{ margin: '5px 0', color: '#6B7280' }}>
          Vehicle: {booking.staffVehicle?.vehicleNumber || 'N/A'}
        </p>
        <p style={{ margin: '5px 0', color: '#6B7280' }}>Current Status: {booking.status || 'N/A'}</p>
        <p style={{ margin: '5px 0', color: '#6B7280' }}>
          Monthly Salary:{' '}
          {booking.monthlySalaries?.[0]?.amount || booking.monthlySalary || 'Not specified'}
        </p>
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