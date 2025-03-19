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
    // Fetch all bookings
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/book/staff/bookings/all');
        setBookings(response.data.bookings || []);
        
        // Map vehicle numbers to driver IDs
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

    // Fetch all drivers
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/driver/getAllDriver');
        setDrivers(response.data.details || []);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    // Fetch both drivers and bookings together
    Promise.all([fetchBookings(), fetchDrivers()]).finally(() => setLoading(false));
  }, []);

  // Filtering logic based on search query
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
    <div className="min-h-screen text-white flex flex-col items-center md:w-[1270px] md:absolute md:top-[50px] md:left-[259px]">
      <div className="container-fluid w-full max-w-none h-full">

        {/* Search Bar */}
        <div className="mb-6 px-2 w-full h-5px">
          <input
            type="text"
            placeholder="Search by name, phone, or vehicle number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[50px] p-3 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-blue-400"
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <p className="text-center text-2xl">Loading...</p>
        ) : (
          <div className="grid mt-[20px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 px-2 w-full">
            {filteredDrivers.map(driver => {
              const vehicleNumber = vehicleMap.get(driver._id) || 'N/A';
              const vehicleStatus = driver.status || 'N/A';
              
              return (
                <div 
                  key={driver._id} 
                  className="bg-gray-200 lg:mt-[30px] rounded-lg p-4 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow w-full"
                >
                  {/* Driver Image */}
                  <img 
                    src={driver.driverImage} 
                    alt="Driver"
                    className="w-24 h-24 rounded-full object-cover mb-3"
                  />
                  
                  {/* Driver Name & Phone */}
                  <h3 className="text-xl text-black font-medium">{driver.driverName}</h3>
                  <p className="text-gray-600 text-black ">{driver.driverNumber[0]?.primaryNumber}</p>

                  {/* Status */}
                  <div className="mt-2">
                    <p className="font-medium text-black">Status:</p>
                    <span 
                      className={`px-3 py-1 rounded text-sm font-semibold ${
                        vehicleStatus === 'assigned' 
                          ? 'bg-green-500' 
                          : 'bg-red-500'
                      }`}
                    >
                      {vehicleStatus}
                    </span>
                  </div>

                  {/* View Details Button */}
                  <div className="mt-4">
                    <NavLink
                      to={`/driverDetails/${driver._id}`}
                      className="text-blue-400 hover:text-blue-300 flex items-center"
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
