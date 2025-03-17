import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UpdateSalary({ driver, onUpdate }) {
  const [month, setMonth] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/book/driver/bookings/${driver}`);
        if (response.data.success) setBookingDetails(response.data.bookings);
      } catch (error) { setError('Failed to fetch booking details'); }
    };
    fetchBooking();
  }, [driver]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.patch(`http://localhost:8080/api/book/staff/bookings/${driver}/monthly-salary`, { month, amount });
      if (response.data.success) {
        onUpdate();
        setMonth('');
        setAmount('');
        alert('Monthly salary updated successfully');
      }
    } catch (error) { setError('Failed to update monthly salary'); }
  };

  if (!bookingDetails) return <div className="p-6 text-center text-gray-900">Loading...</div>;

  return (
    <div className="p-6 bg-white min-h-fit">
      <div className="max-w-2xl mx-auto flex flex-col gap-[20px]">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Update Monthly Salary</h2>
        {error && <p className="text-red-600 text-center mb-4 font-medium">{error}</p>}
        <form onSubmit={handleSubmit} className="lg:w-[600px] w-[300px] flex flex-col gap-[10px] space-y-6 border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Month</label>
            <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none" required />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none" required />
          </div>
          <button type="submit" className="w-full bg-black text-white py-3.5 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium">Update Salary</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateSalary;