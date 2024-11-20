import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="p-2 rounded-lg bg-sky-100">
            {service.icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
        </div>
        <ArrowRightIcon className="h-5 w-5 text-gray-400" />
      </div>
      <p className="text-gray-600">{service.description}</p>
    </div>
  );
};

export default ServiceCard;
