// components/BookingList.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/book/staff/bookings/all');
        if (response.data.success) {
          setBookings(response.data.bookings);
        } else {
          setError('Failed to fetch bookings');
        }
      } catch (error) {
        setError('Failed to fetch bookings');
        console.error(error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>All Bookings</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {bookings.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6B7280' }}>No bookings found</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {bookings.map(booking => (
            <div
              key={booking._id}
              style={{
                width: '300px',
                margin: '10px',
                padding: '15px',
                backgroundColor: '#fff',
                borderRadius: '5px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                textAlign: 'left',
              }}
            >
              <h3 style={{ margin: '5px 0' }}>Booking ID: {booking._id}</h3>
              <p style={{ margin: '5px 0', color: '#6B7280' }}>Driver: {booking.driver.driverName}</p>
              <p style={{ margin: '5px 0', color: '#6B7280' }}>Vehicle: {booking.staffVehicle.vehicleNumber}</p>
              <p style={{ margin: '5px 0', color: '#6B7280' }}>Monthly Salary: {booking.monthlySalary || 'Not specified'}</p>
              <p style={{ margin: '5px 0', color: '#6B7280' }}>Status: {booking.status}</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <a
                  href={`/update-salary/${booking._id}`}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    textDecoration: 'none',
                  }}
                >
                  Update Monthly Salary
                </a>
                <a
                  href={`/complete-booking/${booking._id}`}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    textDecoration: 'none',
                  }}
                >
                  Complete Booking
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingList;