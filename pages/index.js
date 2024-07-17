process.env.NODE_NO_WARNINGS = '1';

import { useEffect, useState } from 'react';
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
  const departures = [...new Set(trips.map(trip => trip.fields['Departure Terminal'][0]))];

  return {
    props: {
      trips,
      routes,
      days,
      departures,
    },
  };
}

export default function Home({ routes, trips, days  }) {
  
  // route selector
  const [selectedRoute, setSelectedRoute] = useState('Paget & Warwick');
  const routeTrips = selectedRoute
  ? trips.filter(trip => trip.fields['Route'][0] === selectedRoute)
  : [];

  // get list of terminals from routeTrips
  const terminals = [...new Set(routeTrips.map(trip => trip.fields['Departure Terminal'][0]))];
  // terminal selector
  const [selectedTerminal, setSelectedTerminal] = useState('Hamilton');
  const terminalTrips = selectedTerminal
  ? routeTrips.filter(trip => trip.fields['Departure Terminal'][0] === selectedTerminal)
  : [];

  const getDay = (new Date().getDay() === 0 || new Date().getDay() === 6) ? "Weekend" : "Weekday";
  const [selectedDay, setSelectedDay] = useState(getDay);

  const filteredTrips = terminalTrips.filter(trip => trip.fields['Day'].includes(selectedDay))

  

  return (
    <div>
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
      <TerminalFilter
        terminals={terminals}
        selectedTerminal={selectedTerminal}
        onSelectTerminal={setSelectedTerminal}
      />

      <div>
        {filteredTrips.map(trip => (
          <Trip 
            trip={trip}
            key={trip.id}
          />
        ))}
      </div>
    </div>
  );
}