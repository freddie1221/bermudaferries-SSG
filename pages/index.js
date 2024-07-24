process.env.NODE_NO_WARNINGS = '1';

import { useState } from 'react';
import StructuredData from '../components/StructuredData';
import Airtable from 'airtable';
import Trip from '../components/Trip';
import RouteFilter from '../components/RouteFilter';
import DayFilter from '../components/DayFilter';
import TerminalFilter from '../components/TerminalFilter';

export async function getStaticProps() {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base('app4P77dJd7f0ffnK');
  const records = await base('Trips').select().all();

  const trips = records.map(record => ({
    id: record.id,
    fields: record.fields
  })).sort((a, b) => new Date(a.fields['Departure time']) - new Date(b.fields['Departure time']));

  const routes = [...new Set(trips.map(trip => trip.fields['Route'][0]))];

  const days = [...new Set(trips.flatMap(trip => trip.fields['Day']))];

  return {
    props: {
      trips,
      routes,
      days,
    },
  };
}

export default function Home({ routes, trips, days  }) {
  
  const [selectedRoute, setSelectedRoute] = useState('Paget & Warwick');
  const routeTrips = trips.filter(trip => trip.fields['Route'][0] === selectedRoute)

  // get list of terminals from routeTrips
  const terminals = [...new Set(routeTrips.map(trip => trip.fields['Departure Terminal'][0]))];
  
  // departure terminal selector
  const [selectedTerminal, setSelectedTerminal] = useState('Hamilton');
  const departureFiltered = routeTrips.filter(trip => trip.fields['Departure Terminal'][0] === selectedTerminal)

  const [selectedArrival, setSelectedArrival] = useState('');
  const arrivalFiltered = selectedArrival
  ? departureFiltered.filter(trip => trip.fields['Arrival Terminal'][0] === selectedArrival)
  : departureFiltered;

  // get day from today's date
  const getDay = (new Date().getDay() === 0 || new Date().getDay() === 6) ? "Weekend" : "Weekday";
  const [selectedDay, setSelectedDay] = useState(getDay);

  const filteredTrips = arrivalFiltered.filter(trip => trip.fields['Day'].includes(selectedDay))

  const structuredData = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "name": "Bermuda Ferry Schedule",
    "url": "https://bermudaferries.com",
  }

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-center my-4 text-gray-900">Bermuda Ferry Schedule</h1>
      <p className="text-lg font-serif text-center mb-6 text-gray-700">
        Welcome to the Bermuda ferry schedule for summer 2025. Find up-to-date information on routes, departure times, and services for all Bermuda ferry routes.
      </p>
      <RouteFilter
        options={routes}
        selected={selectedRoute}
        onSelect={setSelectedRoute}
      />
      <DayFilter
        days={days}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
      />
        <div className="flex justify-center">
          <div className="flex w-full max-w-md">
          <TerminalFilter
            terminals={terminals}
            selectedTerminal={selectedTerminal}
            onSelectTerminal={setSelectedTerminal}
            title = "Departure"
          />
          <TerminalFilter
            terminals={terminals}
            selectedTerminal={selectedArrival}
            onSelectTerminal={setSelectedArrival}
            title = "Arrival"
          />
          </div>
        </div>

      <div>
        {filteredTrips.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-center text-lg text-gray-500 mt-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
              No trips found for selected terminals. This app right now only shows trips to and from Hamilton.
            </p>
          </div>
        ) : (
          filteredTrips.map(trip => (
            <Trip 
              trip={trip}
              key={trip.id}
            />
          ))
        )}
      </div>
      <StructuredData data={structuredData} />
    </div>
  );
}