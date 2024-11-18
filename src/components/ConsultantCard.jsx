import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/24/solid';

const ConsultantCard = React.memo(({ consultant }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="consultant-card p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer bg-white"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={consultant.avatar}
          alt={consultant.name}
          className="w-24 h-24 rounded-full mx-auto mb-2"
        />
        <h3 className="text-xl font-semibold text-center">{consultant.name}</h3>
        <p className="text-center text-gray-600">{consultant.specialization}</p>
        <div className="flex justify-center items-center mt-2">
          <StarIcon className="h-5 w-5 text-yellow-500" />
          <span className="ml-1">{consultant.rating} ({consultant.reviews} reviews)</span>
        </div>
        <p className="text-center text-gray-600">Rate: ${consultant.ratePerHour}</p>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="bg-white p-6 rounded-lg shadow-lg z-20">
            <Dialog.Title className="text-2xl font-bold">{consultant.name}</Dialog.Title>
            <Dialog.Description className="mt-2">{consultant.specialization}</Dialog.Description>
            <p className="mt-4">Phone: {consultant.phoneNumber}</p>
            <p>Email: {consultant.email}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
});

export default ConsultantCard; 