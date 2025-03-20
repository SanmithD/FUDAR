import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function    AllVehicles() {
    const [allVehicles, setAllVehicles] = useState([]);
    const navigate = useNavigate();

    const allVehiclesDetails = async () => {
        try {
            const response = await axios.get(`https://fudar-dqqd.onrender.com/api/staffVehicle/all`);
            setAllVehicles(response.data.vehicles);
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        allVehiclesDetails();
    }, []);

    const screen = innerWidth;
    
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto flex flex-col gap-[30px] " style={{ marginTop: '50px' }} >
                <h2 className="text-2xl font-bold mb-6 text-gray-800 mt-[50px] " style={{ marginLeft: screen < 1000 ? '20px' : '250px' }} >All Staff Vehicles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 " style={{ marginLeft: screen < 1000 ? '20px' : '250px' }} >
                    {allVehicles.map((vehicle) => (
                        <div key={vehicle._id} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer " onClick={()=>navigate(`/vehicle/${vehicle._id}`)} >
                            {vehicle.vehicleImage && vehicle.vehicleImage[0] && (
                                <img
                                    src={vehicle.vehicleImage[0].front}
                                    alt={vehicle.vehicleType}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800">{vehicle.vehicleType}</h3>
                                <p className="text-gray-600">Number: {vehicle.vehicleNumber}</p>
                                <p className="mt-2 px-2 py-1 text-xs font-medium uppercase rounded-full inline-block">
                                    {vehicle.status === 'available' ? (
                                        <span className="bg-green-100 text-green-800">Available</span>
                                    ) : vehicle.status === 'assigned' ? (
                                        <span className="bg-blue-100 text-blue-800">Assigned</span>
                                    ) : (
                                        <span className="bg-red-100 text-red-800">Unavailable</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AllVehicles;