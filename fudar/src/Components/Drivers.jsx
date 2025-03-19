import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Driver = () => {
  const [drivers, setDrivers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleMap, setVehicleMap] = useState(new Map());

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/book/staff/bookings/all');
        setBookings(response.data.bookings || []);
        console.log(response.data)
        
        // Create a map of vehicle numbers by driver ID
        const vehicleMap = new Map();
        response.data.bookings.forEach(booking => {
          if (booking.staffVehicle && booking.driver) {
            vehicleMap.set(booking.driver._id, booking.staffVehicle.vehicleNumber);
          }
        });
        setVehicleMap(vehicleMap);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/driver/getAllDriver');
        setDrivers(response.data.details || []);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    Promise.all([fetchBookings(), fetchDrivers()])
      .finally(() => setLoading(false));
  }, []);

  const filteredDrivers = drivers.filter(driver => {
    const vehicleNumber = vehicleMap.get(driver._id) || '';
    const searchValue = searchQuery.toLowerCase();
    return (
      driver.driverName.toLowerCase().includes(searchValue) ||
      driver.driverNumber[0]?.primaryNumber.includes(searchValue) ||
      vehicleNumber.includes(searchValue)
    );
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, phone, or vehicle number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-blue-400"
          />
        </div>

        {loading ? (
          <p className="text-center text-2xl">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDrivers.map(driver => {
              const vehicleNumber = vehicleMap.get(driver._id) || 'N/A';
              const vehicleStatus = driver.status || 'N/A';
              
              return (
                <div key={driver._id} className="bg-gray-800 rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center mb-4">
                    <img 
                      src={driver.driverImage} 
                      alt="Driver"
                      className="w-24 h-24 rounded-full object-cover mb-3"
                    />
                    <h3 className="text-xl font-medium mb-1">{driver.driverName}</h3>
                    <p className="text-gray-400">{driver.driverNumber[0]?.primaryNumber}</p>
                  </div>
                  <div className="flex justify-between w-full">
                    {/* <div>
                      <p className="font-medium">Vehicle:</p>
                      <p className="text-gray-400">{vehicleNumber}</p>
                    </div> */}
                    <div>
                      <p className="font-medium">Status:</p>
                      <span 
                        className={`px-2 py-1 rounded ${
                          vehicleStatus === 'assigned' 
                            ? 'bg-green-500' 
                            : 'bg-red-500'
                        }`}
                      >
                        {vehicleStatus}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <NavLink
                      to={`/driverDetails/${driver._id}`}
                      className="text-blue-400 hover:text-blue-300 inline-flex items-center"
                    >
                      View Details
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Driver;