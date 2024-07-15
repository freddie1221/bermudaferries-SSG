import React from 'react';
import { secondsToTime } from '../helpers/dateFormatters';
import '../app/globals.css';


export default function Trip({ trip }) {
  let departureTime = secondsToTime(trip.fields['Departure time'])
  let arrivalTime = secondsToTime(trip.fields['Arrival time'])
  let duration = trip.fields['Duration'] / 60
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center p-5">
        <div className="flex-1">
          <p className="text-xs font-serif text-gray-600 mb-1">Departure</p>
          <p className="text-lg font-serif font-medium text-gray-900">{trip.fields['Departure Terminal']}</p>
          <p className="text-base text-gray-700">{departureTime}</p>
        </div>
        <div className="flex-none px-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
        <div className="flex-1 text-right">
          <p className="text-xs font-serif text-gray-600 mb-1">Arrival</p>
          <p className="text-lg font-serif font-medium text-gray-900">{trip.fields['Arrival Terminal']}</p>
          <p className="text-base text-gray-700">{arrivalTime}</p>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
        <p className="text-xs font-serif text-gray-600">Duration</p>
        <p className="text-base font-serif font-medium text-gray-900">{duration} minutes</p>
      </div>
    </div>
  );
}

