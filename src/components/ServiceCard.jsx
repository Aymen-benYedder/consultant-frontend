import React from 'react';

function ServiceCard({ service }) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-2">
        {service.name}
      </h3>
      <p className="text-gray-600 mb-2">
        {service.description}
      </p>
      <p className="text-gray-800 font-bold">
        Rate: ${service.rate}
      </p>
      {/* Add more details as needed */}
    </div>
  );
}

export default ServiceCard; 