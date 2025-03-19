import axios from "axios";
import React, { useEffect, useState } from "react";

const DriverProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/driver/getOwn`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProfileData(response.data.response);
        console.log("My Data", response.data.response);
        console.log("My Data", response.data.salaryResponse);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to load profile data");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-xl font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-xl font-medium text-red-500">
            {error || "No profile data available"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Driver Profile</h1>
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${
                profileData.status === "available"
                  ? "bg-green-500"
                  : "bg-gray-500"
              }`}
            >
              {profileData.status
                ? profileData.status.toUpperCase()
                : "UNKNOWN"}
            </span>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            {/* Left column - Profile Image */}
            <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200 mb-4">
                <a
                  href={profileData.driverImage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={profileData.driverImage}
                    alt="Driver"
                    className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/api/placeholder/160/160";
                    }}
                  />
                </a>
              </div>
              <h2 className="text-xl font-bold">
                {profileData.driverName || "Unknown Driver"}
              </h2>
              <p className="text-gray-500 text-sm">
                ID:{" "}
                {profileData._id
                  ? profileData._id.substring(0, 8) + "..."
                  : "N/A"}
              </p>
            </div>

            {/* Right column - Details */}
            <div className="md:w-2/3 md:pl-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Personal Details Section */}
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">
                    Personal Details
                  </h3>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="font-medium">
                    {profileData.userId
                      ? profileData.userId.substring(0, 8) + "..."
                      : "N/A"}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium capitalize">
                    {profileData.status || "N/A"}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500">Created At</p>
                  <p className="font-medium">
                    {profileData.createdAt
                      ? formatDate(profileData.createdAt)
                      : "N/A"}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium">
                    {profileData.updatedAt
                      ? formatDate(profileData.updatedAt)
                      : "N/A"}
                  </p>
                </div>

                {/* Contact Information Section */}
                {profileData.driverNumber &&
                  profileData.driverNumber.length > 0 && (
                    <>
                      <div className="col-span-2 mt-4">
                        <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">
                          Contact Information
                        </h3>
                      </div>

                      {profileData.driverNumber.map((contact, index) => (
                        <div className="mb-4" key={index}>
                          <p className="text-sm text-gray-500">
                            Phone Number {index + 1}
                          </p>
                          <p className="font-medium">
                            {contact.primaryNumber || "N/A"}
                          </p>
                          <p className="font-medium">
                            {contact.secondaryNumber || "N/A"}
                          </p>
                        </div>
                      ))}
                    </>
                  )}

                {/* Banking Details Section */}
                <div className="col-span-2 mt-4">
                  <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">
                    Banking Details
                  </h3>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500">Bank Account Number</p>
                  <p className="font-medium">
                    {profileData.driverBankNumber || "N/A"}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500">IFSC Code</p>
                  <p className="font-medium">
                    {profileData.driverIFSC || "N/A"}
                  </p>
                </div>

                <div className="mb-4 col-span-2">
                  <p className="text-sm text-gray-500">Bank Address</p>
                  <p className="font-medium">
                    {profileData.driverBankAddress || "N/A"}
                  </p>
                </div>

                {/* Documents Section */}
                <div className="col-span-2 mt-4">
                  <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">
                    Documents
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="border border-gray-200 rounded p-3">
                      <p className="text-sm text-gray-500 mb-2">Aadhaar Card</p>
                      <div className="bg-gray-100 h-32 rounded flex items-center justify-center">
                        <a
                          href={profileData.driverAdhaar}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center justify-center"
                        >
                          <img
                            src={profileData.driverAdhaar}
                            alt="Driving License"
                            className="max-h-full object-contain cursor-pointer hover:opacity-90 transition-opacity"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/api/placeholder/120/96";
                            }}
                          />
                        </a>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded p-3">
                      <p className="text-sm text-gray-500 mb-2">PAN Card</p>
                      <div className="bg-gray-100 h-32 rounded flex items-center justify-center">
                        <a
                          href={profileData.driverPan}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center justify-center"
                        >
                          <img
                            src={profileData.driverPan}
                            alt="Driving License"
                            className="max-h-full object-contain cursor-pointer hover:opacity-90 transition-opacity"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/api/placeholder/120/96";
                            }}
                          />
                        </a>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded p-3">
                      <p className="text-sm text-gray-500 mb-2"
                      >
                        Driving License
                      </p>
                      <div className="bg-gray-100 h-32 rounded flex items-center justify-center">
                        <a
                          href={profileData.drivingLicence}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center justify-center"
                        >
                          <img
                            src={profileData.drivingLicence}
                            alt="Driving License"
                            className="max-h-full object-contain cursor-pointer hover:opacity-90 transition-opacity"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/api/placeholder/120/96";
                            }}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                Profile created on{" "}
                {profileData.createdAt
                  ? formatDate(profileData.createdAt)
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;
