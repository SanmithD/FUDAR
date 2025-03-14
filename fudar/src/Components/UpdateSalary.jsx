// components/UpdateSalary.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UpdateSalary() {
  const { driver } = useParams();
  const [month, setMonth] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.patch(
        `http://localhost:8080/api/book/staff/bookings/${driver}/monthly-salary`,
        { month, amount }
      );
      
      if (response.data.success) {
        alert('Monthly salary updated successfully');
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
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update Monthly Salary for Booking</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Month:</label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
      
      {bookingDetails.monthlySalaries && bookingDetails.monthlySalaries.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ textAlign: 'center' }}>Salary History</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {bookingDetails.monthlySalaries.map((salary, index) => (
              <li key={index} style={{ padding: '10px', border: '1px solid #ddd', margin: '5px 0' }}>
                <strong>{salary.month}</strong>: ₹{salary.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UpdateSalary;