import React from 'react';

export default function DayFilter({ days, selectedDay, onSelectDay }) {
  return (
    <div className="mb-4 font-serif">
      <div className="flex justify-center">
        <div className="flex w-full max-w-md">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => onSelectDay(day)}
              className={`
                flex-1 px-6 py-2 text-lg transition-all duration-200 
                border-2
                ${selectedDay === day
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900 hover:text-gray-900'
                }
                focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50
              `}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}