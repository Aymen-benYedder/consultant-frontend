import React from 'react';

const DocumentUpload = ({ isOpen, onToggle, documents, onDocumentChange, onAddDocument }) => {
  return (
    <div className="mt-6 max-w-screen-md mx-auto">
      <div id="accordion-flush" data-accordion="collapse">
        <h3 id="accordion-flush-heading-1">
          <button
            type="button"
            className={`flex items-center justify-between w-full py-5 px-4 font-medium text-left border-b border-gray-200 ${isOpen ? 'bg-white text-gray-900' : 'text-gray-500'}`}
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls="accordion-flush-body-1"
          >
            <span className="flex text-lg font-semibold">Upload documents</span>
            <svg className={`w-6 h-6 shrink-0 transform ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </h3>
        {isOpen && (
          <div id="accordion-flush-body-1" className="py-5 border-b border-gray-200">
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
                  onChange={(event) => onDocumentChange(index, event)}
                  className="hidden"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={onAddDocument}
              className="mt-2 text-blue-500 hover:underline"
            >
              Add Another Document
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;
