import React from 'react';

export default function TerminalFilter({ terminals, selectedTerminal, onSelectTerminal, title }) {
  return (
    <div className="mb-8 font-serif">
      <h3 className="text-2xl font-medium text-gray-900 mb-4 text-center">{title}</h3>
      
        {terminals.map((terminal, index) => (
          <button
            key={index}
            onClick={() => onSelectTerminal(terminal)}
            className={`
              w-full max-w-md px-6 py-2 text-lg transition-all duration-200 
              border-2 
              ${selectedTerminal === terminal
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900 hover:text-gray-900'
              }
              focus:outline-none focus:ring-gray-900 focus:ring-opacity-50
            `}
          >
            {terminal}
          </button>
        ))}
      
    </div>
  );
}

