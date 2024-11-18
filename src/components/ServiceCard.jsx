import React from 'react';

function ServiceCard({ service }) {
  return (
    <div className="service-card p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-white">
      <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
      <p className="text-gray-600 mb-2">{service.description}</p>
      <p className="text-gray-800 font-bold mb-2">Rate: ${service.rate}</p>
      <div className="border-t pt-2">
        <p className="text-sm text-gray-600">Offered by:</p>
        <p className="text-md font-semibold text-blue-600">{service.consultantName}</p>
      </div>
    </div>
  );
}

export default ServiceCard; 