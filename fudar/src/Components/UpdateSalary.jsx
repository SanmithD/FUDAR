// components/UpdateSalary.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UpdateMonthlySalary() {
  const { bookingId } = useParams();
  const [monthlySalary, setMonthlySalary] = useState('');
  const [error, setError] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/book/staff/bookings/${bookingId}`);
        if (response.data.success) {
          setBookingDetails(response.data.booking);
          setMonthlySalary(response.data.booking.monthlySalary || '');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.patch(
        `http://localhost:8080/api/book/staff/bookings/${bookingId}/monthly-salary`,
        { monthlySalary }
      );
      
      if (response.data.success) {
        alert('Monthly salary updated successfully');
        setMonthlySalary(response.data.booking.monthlySalary);
      } else {
        setError('Failed to update monthly salary');
      }
    } catch (error) {
      setError('Failed to update monthly salary');
      console.error(error);
    }
  };

  if (!bookingDetails) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update Monthly Salary for Booking {bookingId}</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Current Monthly Salary: {bookingDetails.monthlySalary || 'Not specified'}</label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>New Monthly Salary:</label>
          <input
            type="number"
            value={monthlySalary}
            onChange={(e) => setMonthlySalary(e.target.value)}
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
          Update Monthly Salary
        </button>
      </form>
    </div>
  );
}

export default UpdateMonthlySalary;