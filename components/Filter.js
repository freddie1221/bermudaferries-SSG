import React, { useState } from 'react';

export default function Filter({ options, selected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mb-8 font-serif p-2 py-4">
      <h3 className="text-2xl font-medium text-gray-900 mb-4 text-center">Select Route</h3>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 text-left bg-white border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
        >
          <span className="block truncate text-lg">{selected || 'Choose a route'}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 text-lg hover:bg-gray-100 transition-colors duration-200
                  ${selected === option ? 'bg-gray-50 font-medium' : ''}
                  ${index === 0 ? 'rounded-t-lg' : ''}
                  ${index === options.length - 1 ? 'rounded-b-lg' : ''}
                `}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}