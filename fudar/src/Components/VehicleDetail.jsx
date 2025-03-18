import axios from "axios";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://fudar-dqqd.onrender.com/api/staffVehicle/viewStaffVehicle/${id}`);
        setVehicle(response.data.vehicle);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
        setError("Failed to load vehicle details");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <span className="text-black text-xl">Loading...</span>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <span className="text-black text-xl">{error || "Vehicle not found"}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-8 flex justify-center">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/allVehicles")}
          className="flex items-center mb-6 text-black hover:bg-gray-200 px-2 py-1 rounded transition-colors"
        >
          <ChevronLeft className="mr-1" size={20} />
          Back to Vehicles
        </button>

        {/* Main Container */}
        <div className="bg-white rounded-lg border border-black overflow-hidden">
          {/* Vehicle Images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
            {vehicle.vehicleImage?.[0] && (
              <>
                <div className="relative">
                  <img
                    src={vehicle.vehicleImage[0].front}
                    alt="Front view"
                    className="w-full h-48 object-cover rounded border border-black"
                  />
                  <span className="absolute top-2 left-2 bg-white text-black px-2 py-1 text-xs rounded border border-black">
                    Front
                  </span>
                </div>
                <div className="relative">
                  <img
                    src={vehicle.vehicleImage[0].side}
                    alt="Side view"
                    className="w-full h-48 object-cover rounded border border-black"
                  />
                  <span className="absolute top-2 left-2 bg-white text-black px-2 py-1 text-xs rounded border border-black">
                    Side
                  </span>
                </div>
                <div className="relative">
                  <img
                    src={vehicle.vehicleImage[0].back}
                    alt="Back view"
                    className="w-full h-48 object-cover rounded border border-black"
                  />
                  <span className="absolute top-2 left-2 bg-white text-black px-2 py-1 text-xs rounded border border-black">
                    Back
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Vehicle Details */}
          <div className="p-6 border-t border-black">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {vehicle.vehicleType} - {vehicle.vehicleNumber}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <span className="text-gray-600">Status: </span>
                  <span className="capitalize px-2 py-1 rounded text-sm bg-black text-white">
                    {vehicle.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Vehicle Number: </span>
                  <span>{vehicle.vehicleNumber}</span>
                </div>
                <div>
                  <span className="text-gray-600">Vehicle Type: </span>
                  <span>{vehicle.vehicleType}</span>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <span className="text-gray-600">Created At: </span>
                  <span>{new Date(vehicle.createdAt).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Updated At: </span>
                  <span>{new Date(vehicle.updatedAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="p-6 border-t border-black">
            <h2 className="text-xl font-semibold mb-4">Documents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded border border-black">
                <h3 className="font-medium mb-2">Vehicle RC</h3>
                <a
                  href={vehicle.staffVehicleRC}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:bg-gray-200 px-2 py-1 rounded inline-block transition-colors"
                >
                  View Document
                </a>
              </div>
              <div className="bg-white p-4 rounded border border-black">
                <h3 className="font-medium mb-2">Vehicle Insurance</h3>
                <a
                  href={vehicle.staffVehicleInsurance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:bg-gray-200 px-2 py-1 rounded inline-block transition-colors"
                >
                  View Document
                </a>
              </div>
              <div className="bg-white p-4 rounded border border-black">
                <h3 className="font-medium mb-2">Vehicle Emission</h3>
                <a
                  href={vehicle.staffVehicleEmission}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:bg-gray-200 px-2 py-1 rounded inline-block transition-colors"
                >
                  View Document
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}