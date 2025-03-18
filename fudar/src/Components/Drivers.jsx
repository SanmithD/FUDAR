import axios from 'axios';
import { Search } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Drivers = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [vehicleReg, setVehicleReg] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/book/staff/bookings/all');
        setBookings(response.data.bookings || []);
        setVehicleReg(response.data.bookings[0].staffVehicle.vehicleNumber);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const searchLower = searchTerm.toLowerCase();
    const phoneNumber = booking.driver.driverNumber[0]?.primaryNumber?.toLowerCase() || '';
    
    return (
      booking.driver.driverName.toLowerCase().includes(searchLower) ||
      vehicleReg.toLowerCase().includes(searchLower) ||
      phoneNumber.includes(searchLower)
    );
  });

  const handleViewDriver = (driverId) => {
    navigate(`/driverDetails/${driverId}`);
  };

  if (loading) {
    return <div className="text-center py-8">Loading drivers...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-[50px] ">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Search Bar */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, vehicle number, or phone number"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table headers remain same */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Driver
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={booking.driver.driverImage}
                          alt={booking.driver.driverName}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.driver.driverName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.driver.driverNumber[0]?.primaryNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vehicleReg}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${booking.driver.status === 'assigned' 
                          ? 'bg-gray-200 text-gray-800' 
                          : 'bg-gray-100 text-gray-600'}`}>
                        {booking.driver.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDriver(booking.driver._id)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredBookings.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No drivers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes remain same
Drivers.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      driver: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        driverName: PropTypes.string.isRequired,
        driverImage: PropTypes.string.isRequired,
        driverNumber: PropTypes.arrayOf(
          PropTypes.shape({
            primaryNumber: PropTypes.string.isRequired
          })
        ).isRequired,
        status: PropTypes.string.isRequired
      }).isRequired,
      staffVehicle: PropTypes.shape({
        vehicleNumber: PropTypes.string.isRequired
      }).isRequired
    })
  )
};

export default Drivers;