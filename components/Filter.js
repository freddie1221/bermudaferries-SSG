import React from 'react';

export default function Filter({ options, selected, onSelect }) {
  // If no terminal is selected, default to 'Hamilton'
  const currentSelection = selected || 'Hamilton';

  return (
    <div className="mb-8 border-b border-gray-200 pb-4">
      <h3 className="text-lg font-serif font-medium text-gray-900 mb-4">Select Route</h3>
      <div className="flex flex-wrap gap-2">
      
        {options.map((option, index) => (
          // iterate through terminals and create a button for each terminal
          <button
            key={index}
            onClick={() => onSelect(option)}
            className={`px-4 py-2 rounded-full font-serif text-sm transition-colors duration-200 ${
              currentSelection === option
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}