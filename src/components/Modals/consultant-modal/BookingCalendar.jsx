import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BookingCalendar = ({ selectedDate, onDateChange, selectedTime, onTimeChange }) => {
  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
  ];

  return (
    <div>
      <div className="calendar-container mb-4">
        <Calendar
          onChange={onDateChange}
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
              onClick={() => onTimeChange(time)}
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
    </div>
  );
};

export default BookingCalendar;
