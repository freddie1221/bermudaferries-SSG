import React from 'react';

export default function Filter({ options, selected, onSelect }) {
  const colors = {
    'Paget & Warwick': 'bg-rose-100 hover:bg-rose-200 border-rose-200',
    'Southampton, Somerset & Sandys': 'bg-emerald-100 hover:bg-emerald-200 border-emerald-200',
    'Dockyard': 'bg-sky-100 hover:bg-sky-200 border-sky-200'
  };

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-serif font-medium text-gray-900 mb-4 text-center">Select Route</h3>
      <div className="flex flex-wrap -m-[5px]"> {/* Negative margin to offset padding */}
        {options.map((option, index) => (
          <div key={index} className="p-[5px] flex-[1_1_33%] min-w-[300px]">
            <button
              onClick={() => onSelect(option)}
              className={`w-full p-4 font-serif text-sm md:text-base lg:text-lg transition-colors duration-200 border-2 rounded shadow-sm
                ${colors[option]}
                ${selected === option ? 'ring-2 ring-gray-900' : ''}
                flex items-center justify-center text-center h-18
              `}
            >
              <span className={`${selected === option ? 'text-gray-900' : 'text-gray-700'}`}>
                {option}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

}