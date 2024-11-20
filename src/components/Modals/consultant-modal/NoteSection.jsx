import React from 'react';

const NoteSection = ({ isOpen, onToggle, note, onNoteChange }) => {
  return (
    <div className="mt-6 max-w-screen-md mx-auto">
      <div id="accordion-flush" data-accordion="collapse">
        <h3 id="accordion-flush-heading-2">
          <button
            type="button"
            className={`flex items-center justify-between w-full py-5 px-4 font-medium text-left border-b border-gray-200 ${isOpen ? 'bg-white text-gray-900' : 'text-gray-500'}`}
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls="accordion-flush-body-2"
          >
            <span className="flex text-lg font-semibold">Add a note</span>
            <svg className={`w-6 h-6 shrink-0 transform ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </h3>
        {isOpen && (
          <div id="accordion-flush-body-2" className="py-5 border-b border-gray-200">
            <textarea
              value={note}
              onChange={(e) => onNoteChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Add your note here..."
            ></textarea>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteSection;
