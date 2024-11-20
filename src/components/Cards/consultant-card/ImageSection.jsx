import React from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';

const ImageSection = ({ consultant, isFavorite, onFavoriteToggle }) => {
  return (
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
            onFavoriteToggle();
          }}
          className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
        >
          <HeartIcon className={`h-5 w-5 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>
    </div>
  );
};

export default ImageSection;
