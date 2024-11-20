import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { CalendarDaysIcon, ClockIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ConsultantModal = ({ isOpen, onClose, consultant }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [documents, setDocuments] = useState(['']); // Array to hold document inputs
  const [note, setNote] = useState(''); // State for the note
  const [isDocumentUploadOpen, setIsDocumentUploadOpen] = useState(false); // Accordion state for Document Upload
  const [isNoteSectionOpen, setIsNoteSectionOpen] = useState(false); // Accordion state for Note Section

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
      time: selectedTime,
      documents,
      note // Include the note in the booking request
    });
  };

  const handleDocumentChange = (index, event) => {
    const newDocuments = [...documents];
    newDocuments[index] = event.target.files[0]; // Store the uploaded file
    setDocuments(newDocuments);
  };

  const addDocumentInput = () => {
    setDocuments([...documents, '']); // Add a new empty input for document upload
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
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'hover:border-blue-500'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Document Upload Section */}
              <div className="mt-6 max-w-screen-md mx-auto">
                <div id="accordion-flush" data-accordion="collapse">
                  <h3 id="accordion-flush-heading-1">
                    <button
                      type="button"
                      className={`flex items-center justify-between w-full py-5 px-4 font-medium text-left border-b border-gray-200 ${isDocumentUploadOpen ? 'bg-white text-gray-900' : 'text-gray-500'}`}
                      onClick={() => setIsDocumentUploadOpen(!isDocumentUploadOpen)}
                      aria-expanded={isDocumentUploadOpen}
                      aria-controls="accordion-flush-body-1"
                    >
                      <span className="flex text-lg font-semibold">Document Upload Section</span>
                      <svg className={`w-6 h-6 shrink-0 transform ${isDocumentUploadOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    </button>
                  </h3>
                  {isDocumentUploadOpen && (
                    <div id="accordion-flush-body-1" className="py-5 border-b border-gray-200">
                      <h4 className="font-medium mb-2">Upload Documents</h4>
                      {documents.map((doc, index) => (
                        <div key={index} className="rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md mb-2">
                          <label htmlFor={`upload-${index}`} className="flex flex-col items-center gap-2 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 fill-white stroke-indigo-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-gray-600 font-medium">Upload file</span>
                          </label>
                          <input
                            id={`upload-${index}`}
                            type="file"
                            accept=".doc,.docx,.pdf,.jpeg,.jpg"
                            onChange={(event) => handleDocumentChange(index, event)}
                            className="hidden"
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addDocumentInput}
                        className="mt-2 text-blue-500 hover:underline"
                      >
                        Add Another Document
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Note Section */}
              <div className="mt-6 max-w-screen-md mx-auto">
                <div id="accordion-flush" data-accordion="collapse">
                  <h3 id="accordion-flush-heading-2">
                    <button
                      type="button"
                      className={`flex items-center justify-between w-full py-5 px-4 font-medium text-left border-b border-gray-200 ${isNoteSectionOpen ? 'bg-white text-gray-900' : 'text-gray-500'}`}
                      onClick={() => setIsNoteSectionOpen(!isNoteSectionOpen)}
                      aria-expanded={isNoteSectionOpen}
                      aria-controls="accordion-flush-body-2"
                    >
                      <span className="flex text-lg font-semibold">Note Section</span>
                      <svg className={`w-6 h-6 shrink-0 transform ${isNoteSectionOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    </button>
                  </h3>
                  {isNoteSectionOpen && (
                    <div id="accordion-flush-body-2" className="py-5 border-b border-gray-200">
                      <h4 className="font-medium mb-2">Additional Notes</h4>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows="3"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Write any additional notes here..."
                      />
                    </div>
                  )}
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
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
