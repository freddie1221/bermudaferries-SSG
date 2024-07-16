import React from 'react';
import { secondsToTime } from '../helpers/dateFormatters';
import '../app/globals.css';


export default function Trip({ trip }) {
  let departureTime = secondsToTime(trip.fields['Departure time'])
  let arrivalTime = secondsToTime(trip.fields['Arrival time'])
  let duration = trip.fields['Duration'] / 60
  let service = trip.fields['Service']
  console.log(service)

  // Helper function to determine color based on service
function getServiceColor(service) {
  switch (service) {
    case 'Monday - Friday': return 'teal';
    case 'Everyday': return 'indigo';
    case 'Weekends': return 'amber';
    case 'Wednesday Harbour Night only': return 'rose';
    default: return 'gray';
  }
}

// Component
return (
  <div className="bg-white shadow-sm rounded-lg mb-4 overflow-hidden transition-all duration-300 hover:shadow-md">
    {/* Using a function to get the color name without the '-500' suffix */}
    <div className={`flex items-center p-5 border-l-4 border-${getServiceColor(service)}-500`}>
      <div className="flex-1">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Departure</p>
        <p className="text-lg font-serif font-medium text-gray-900">{trip.fields['Departure Terminal']}</p>
        <p className={`text-base text-${getServiceColor(service)}-600 font-semibold`}>{departureTime}</p>
      </div>
      <div className="flex-none px-4">
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-${getServiceColor(service)}-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
      <div className="flex-1 text-right">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Arrival</p>
        <p className="text-lg font-serif font-medium text-gray-900">{trip.fields['Arrival Terminal']}</p>
        <p className={`text-base text-${getServiceColor(service)}-600 font-semibold`}>{arrivalTime}</p>
      </div>
    </div>
    <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
      <p className="text-sm font-serif text-gray-600">Duration: <span className="font-medium text-gray-900">{duration} min</span></p>
      {service && (
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 bg-${getServiceColor(service)}-500`}></div>
          <p className={`text-sm font-serif italic text-${getServiceColor(service)}-700`}>{service}</p>
        </div>
      )}
    </div>
  </div>
);
}