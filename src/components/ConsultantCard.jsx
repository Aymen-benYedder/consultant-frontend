import React, { useState } from 'react';
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid';
import ConsultantModal from './ConsultantModal';

const ConsultantCard = React.memo(({ consultant }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl cursor-pointer"
      >
        {/* Image Section */}
        <div className="relative">
          <img
            src={consultant.avatar}
            alt={consultant.name}
            className="h-80 w-72 object-cover rounded-t-xl"
          />
          <div className="absolute top-4 right-4">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsFavorite(!isFavorite);
              }}
              className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
            >
              <HeartIcon className={`h-5 w-5 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`} />
            </button>
          </div>
        </div>

        {/* Content Section */}
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
                setIsModalOpen(true);
              }}
              className="bg-sky-950  text-white px-4 py-2 rounded-full text-sm hover:bg-sky-950  transition-colors"
            >
              Book
            </button>
          </div>
        </div>
      </div>

      <ConsultantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        consultant={consultant}
      />
    </>
  );
});

export default ConsultantCard; 