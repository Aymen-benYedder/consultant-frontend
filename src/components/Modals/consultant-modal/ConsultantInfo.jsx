import React from 'react';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const ConsultantInfo = ({ consultant }) => {
  return (
    <div className="p-6 md:w-1/2 border-r border-gray-200">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={consultant.avatar}
          alt={consultant.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-900">{consultant.name}</h2>
          <p className="text-gray-600">{consultant.specialization}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center text-gray-600">
          <MapPinIcon className="h-5 w-5 mr-2" />
          <span>{consultant.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <PhoneIcon className="h-5 w-5 mr-2" />
          <span>{consultant.phoneNumber}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <EnvelopeIcon className="h-5 w-5 mr-2" />
          <span>{consultant.email}</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Specialties</h3>
        <div className="flex flex-wrap gap-2">
          {consultant.specialties?.map((specialty, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultantInfo;
