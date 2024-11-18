import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

function ConsultantCard({ consultant }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="border p-4 rounded shadow cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={consultant.avatar}
          alt={consultant.name}
          className="w-24 h-24 rounded-full mx-auto"
        />
        <h3 className="text-xl font-semibold text-center mt-2">
          {consultant.name}
        </h3>
        <p className="text-center text-gray-600">
          Specialization: {consultant.specialization}
        </p>
        <p className="text-center text-gray-600">
          Rate per hour: ${consultant.ratePerHour}
        </p>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="bg-white p-6 rounded shadow-lg z-20">
            <Dialog.Title className="text-2xl font-bold">
              {consultant.name}
            </Dialog.Title>
            <Dialog.Description className="mt-2">
              {consultant.specialization}
            </Dialog.Description>
            <p className="mt-4">Phone: {consultant.phoneNumber}</p>
            <p>Email: {consultant.email}</p>
            {/* Add more consultant details as needed */}
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
}

export default ConsultantCard; 