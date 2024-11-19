import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { CalendarDaysIcon, ClockIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import data from '../data.json'; // Import your data

const ConsultantModal = ({ isOpen, onClose, consultant }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const [services, setServices] = useState([]);

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
  ];

  useEffect(() => {
    // Fetch services for the selected consultant
    const consultantServices = data.services.filter(service => service.consultantId === consultant.googleId);
    setServices(consultantServices);
  }, [consultant]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleBookAppointment = () => {
    if (!selectedTime || !selectedService) {
      alert('Please select a time slot and a service');
      return;
    }
    // Handle booking logic here
    console.log('Booking appointment for:', {
      consultant,
      date: selectedDate,
      time: selectedTime,
      service: selectedService
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

              {/* Service Selection */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Select a Service</h3>
                <div className="grid w-full grid-cols-4 gap-2 rounded-xl bg-gray-200 p-2">
                  {services.map(service => (
                    <div key={service.id} className="flex flex-col items-center">
                      <input
                        type="radio"
                        id={service.id}
                        value={service.id}
                        className="peer hidden"
                        checked={selectedService === service.id}
                        onChange={() => setSelectedService(service.id)}
                      />
                      <label
                        htmlFor={service.id}
                        className="block cursor-pointer select-none rounded-xl p-2 text-center whitespace-nowrap peer-checked:bg-sky-950 peer-checked:font-bold peer-checked:text-white"
                      >
                        {service.name}
                      </label>
                    </div>
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
