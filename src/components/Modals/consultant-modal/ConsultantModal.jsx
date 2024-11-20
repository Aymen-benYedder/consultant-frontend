import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import ConsultantInfo from './ConsultantInfo';
import BookingCalendar from './BookingCalendar';
import DocumentUpload from './DocumentUpload';
import NoteSection from './NoteSection';

const ConsultantModal = ({ isOpen, onClose, consultant }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [documents, setDocuments] = useState(['']);
  const [note, setNote] = useState('');
  const [isDocumentUploadOpen, setIsDocumentUploadOpen] = useState(false);
  const [isNoteSectionOpen, setIsNoteSectionOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleBookAppointment = () => {
    if (!selectedTime) {
      alert('Please select a time slot');
      return;
    }
    console.log('Booking appointment for:', {
      consultant,
      date: selectedDate,
      time: selectedTime,
      documents,
      note
    });
  };

  const handleDocumentChange = (index, event) => {
    const newDocuments = [...documents];
    newDocuments[index] = event.target.files[0];
    setDocuments(newDocuments);
  };

  const addDocumentInput = () => {
    setDocuments([...documents, '']);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-y-auto max-h-[90vh]">
          <div className="flex flex-col md:flex-row">
            <ConsultantInfo consultant={consultant} />
            
            <div className="p-6 md:w-1/2">
              <h3 className="text-lg font-semibold mb-4">Book Appointment</h3>
              
              <BookingCalendar
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                selectedTime={selectedTime}
                onTimeChange={setSelectedTime}
              />

              <DocumentUpload
                isOpen={isDocumentUploadOpen}
                onToggle={() => setIsDocumentUploadOpen(!isDocumentUploadOpen)}
                documents={documents}
                onDocumentChange={handleDocumentChange}
                onAddDocument={addDocumentInput}
              />

              <NoteSection
                isOpen={isNoteSectionOpen}
                onToggle={() => setIsNoteSectionOpen(!isNoteSectionOpen)}
                note={note}
                onNoteChange={setNote}
              />

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
