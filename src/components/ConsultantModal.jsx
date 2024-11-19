import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { CalendarDaysIcon, ClockIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ConsultantModal = ({ isOpen, onClose, consultant }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleBookAppointment = () => {
    if (!selectedTime) {
      alert('Please select a time slot');
      return;
    }
    // Handle booking logic here
    console.log('Booking appointment for:', {
      consultant,
      date: selectedDate,
      time: selectedTime
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-white rounded-xl shadow-xl">
          <div className="flex flex-col md:flex-row">
            {/* Consultant Info Section */}
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

            {/* Booking Section */}
            <div className="p-6 md:w-1/2">
              <h3 className="text-lg font-semibold mb-4">Book Appointment</h3>
              
              <div className="calendar-container mb-4">
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  minDate={new Date()}
                  className="rounded-lg border"
                />
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Available Time Slots</h4>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-sm rounded-lg border ${
                        selectedTime === time
                          ? 'bg-sky-950 text-white border-sky-950'
                          : 'hover:border-sky-950'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookAppointment}
                  className="px-4 py-2 bg-sky-950 text-white rounded-lg hover:bg-sky-950"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConsultantModal;
