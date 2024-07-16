import React from 'react';

export default function TerminalFilter({ terminals, selectedTerminal, onSelectTerminal }) {
  return (
    <div className="mb-8 font-serif">
      <h3 className="text-2xl font-medium text-gray-900 mb-4 text-center">Select Departure Terminal</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {terminals.map((terminal, index) => (
          <button
            key={index}
            onClick={() => onSelectTerminal(terminal)}
            className={`
              px-6 py-3 text-lg transition-all duration-200 
              border-2 rounded-full shadow-sm
              ${selectedTerminal === terminal
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900 hover:text-gray-900'
              }
              focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50
            `}
          >
            {terminal}
          </button>
        ))}
      </div>
    </div>
  );
}