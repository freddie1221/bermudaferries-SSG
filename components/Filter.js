import React from 'react';

export default function Filter({ terminals, selectedTerminal, onSelectTerminal }) {
  // If no terminal is selected, default to 'Hamilton'
  const currentSelection = selectedTerminal || 'Hamilton';

  return (
    <div className="mb-8 border-b border-gray-200 pb-4">
      <h3 className="text-lg font-serif font-medium text-gray-900 mb-4">Select Departure Terminal</h3>
      <div className="flex flex-wrap gap-2">
      

        {terminals.map((terminal, index) => (
          <button
            key={index}
            onClick={() => onSelectTerminal(terminal)}
            className={`px-4 py-2 rounded-full font-serif text-sm transition-colors duration-200 ${
              currentSelection === terminal
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {terminal}
          </button>
        ))}
      </div>
    </div>
  );
}