import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

const ContentSection = ({ consultant, onBookClick }) => {
  return (
    <div className="px-4 py-3 w-72">
      {/* Specialties Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {consultant.specialties?.map((specialty, index) => (
          <span
            key={index}
            className={`text-xs px-2 py-1 rounded-full ${
              index % 2 === 0 
                ? 'bg-cyan-100 text-cyan-600' 
                : 'bg-purple-100 text-purple-600'
            }`}
          >
            {specialty}
          </span>
        ))}
      </div>

      {/* Doctor Info */}
      <h3 className="text-lg font-bold text-gray-900 truncate">{consultant.name}</h3>
      <p className="text-gray-500 text-sm mb-3">{consultant.specialization}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <span className="ml-1 text-sm font-semibold">{consultant.rating}</span>
          <span className="ml-1 text-xs text-gray-500">({consultant.reviews} reviews)</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookClick();
          }}
          className="bg-sky-950 text-white px-4 py-2 rounded-full text-sm hover:bg-sky-950 transition-colors"
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default ContentSection;
