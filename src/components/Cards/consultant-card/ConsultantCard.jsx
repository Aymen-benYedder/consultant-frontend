import React, { useState } from 'react';
import { ConsultantModal } from '../../Modals';
import ImageSection from './ImageSection';
import ContentSection from './ContentSection';

const ConsultantCard = React.memo(({ consultant }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl cursor-pointer"
      >
        <ImageSection
          consultant={consultant}
          isFavorite={isFavorite}
          onFavoriteToggle={() => setIsFavorite(!isFavorite)}
        />
        <ContentSection
          consultant={consultant}
          onBookClick={() => setIsModalOpen(true)}
        />
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
