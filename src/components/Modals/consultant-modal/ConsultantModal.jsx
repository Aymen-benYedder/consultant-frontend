import React, { useState, useContext, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { AppContext } from '../../../AppContext';
import ConsultantInfo from './ConsultantInfo';
import BookingCalendar from './BookingCalendar';
import DocumentUpload from './DocumentUpload';
import NoteSection from './NoteSection';

const ConsultantModal = ({ isOpen, onClose, consultant }) => {
  const { user, login } = useContext(AppContext);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showFallbackButton, setShowFallbackButton] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [documents, setDocuments] = useState(['']);
  const [note, setNote] = useState('');
  const [isDocumentUploadOpen, setIsDocumentUploadOpen] = useState(false);
  const [isNoteSectionOpen, setIsNoteSectionOpen] = useState(false);

  useEffect(() => {
    if (showLoginPrompt && !user && window.google?.accounts?.id) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || 
            notification.isSkippedMoment() || 
            notification.isDismissedMoment()) {
          setShowFallbackButton(true);
        }
      });
    }
  }, [showLoginPrompt, user]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleBookAppointment = () => {
    if (!selectedTime) {
      alert('Please select a time slot');
      return;
    }

    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    // Proceed with booking
    console.log('Booking appointment for:', {
      consultant,
      date: selectedDate,
      time: selectedTime,
      documents,
      note,
      user
    });
  };

  const handleLoginSuccess = (credentialResponse) => {
    try {
      const userData = jwtDecode(credentialResponse.credential);
      login(userData);
      setShowLoginPrompt(false);
      setShowFallbackButton(false);
    } catch (error) {
      console.error('Error during login:', error);
    }
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
          {showLoginPrompt ? (
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">Please log in to book an appointment</h3>
              <p className="text-gray-600 mb-6">Sign in with your Google account to continue booking your consultation.</p>
              <div className="flex flex-col items-center gap-4">
                {showFallbackButton && (
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={() => console.error('Login Failed')}
                    useOneTap={false}
                    theme="filled_blue"
                    size="large"
                    text="signin_with"
                    shape="rectangular"
                    width={250}
                  />
                )}
                <button
                  onClick={() => {
                    setShowLoginPrompt(false);
                    setShowFallbackButton(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-6 border-r border-gray-200">
                <ConsultantInfo consultant={consultant} />
                <BookingCalendar
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                  selectedTime={selectedTime}
                  onTimeSelect={setSelectedTime}
                />
              </div>

              <div className="md:w-1/2 p-6">
                <DocumentUpload
                  isOpen={isDocumentUploadOpen}
                  setIsOpen={setIsDocumentUploadOpen}
                  documents={documents}
                  onDocumentChange={handleDocumentChange}
                  onAddDocument={addDocumentInput}
                />
                <NoteSection
                  isOpen={isNoteSectionOpen}
                  setIsOpen={setIsNoteSectionOpen}
                  note={note}
                  setNote={setNote}
                />
                <div className="mt-6">
                  <button
                    onClick={handleBookAppointment}
                    className="w-full bg-sky-950 text-white py-2 px-4 rounded-lg hover:bg-sky-900 transition-colors"
                  >
                    {user ? 'Book Appointment' : 'Sign in to Book'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConsultantModal;
