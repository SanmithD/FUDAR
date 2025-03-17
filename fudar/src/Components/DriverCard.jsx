import React from 'react';



function DriverCard({ driver, onClick }) {
  const { driverName, driverImage } = driver;
  const imageUrl = driverImage.match(/https?:\/\/[^\s]+/)?.[0];

  return (
    <div 
      className="bg-gray-800 border border-gray-600 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition-colors duration-200"
      onClick={onClick}
    >
      {imageUrl && (
        <img
          className="w-full rounded-t-lg h-48 object-cover"
          src={imageUrl}
          alt={driverName}
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{driverName}</h3>
      </div>
    </div>
  );
}

export default DriverCard;