process.env.NODE_NO_WARNINGS = '1';

import { useEffect, useState } from 'react';
import Airtable from 'airtable';
import Trip from '../components/Trip';
import Filter from '../components/Filter';
import TerminalFilter from '../components/TerminalFilter';

export async function getStaticProps() {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base('app4P77dJd7f0ffnK');
  const records = await base('Trips').select().all();
  const count = records.length;

  const trips = records.map(record => ({
    id: record.id,
    fields: record.fields
  })).sort((a, b) => new Date(a.fields['Departure time']) - new Date(b.fields['Departure time']));


  const departures = [...new Set(trips.map(trip => trip.fields['Departure Terminal'][0]))];

  const routes = [...new Set(trips.map(trip => trip.fields['Route'][0]))];

  return {
    props: {
      trips,
      routes,
      departures,
    },
  };
}

export default function Home({ routes, trips  }) {
  
  const [selectedRoute, setSelectedRoute] = useState('Paget & Warwick');

  const routeTrips = selectedRoute
  ? trips.filter(trip => trip.fields['Route'][0] === selectedRoute)
  : [];

  const terminals = [...new Set(routeTrips.map(trip => trip.fields['Departure Terminal'][0]))];
  const [selectedTerminal, setSelectedTerminal] = useState('Hamilton');

  const filteredTrips = selectedTerminal
  ? routeTrips.filter(trip => trip.fields['Departure Terminal'][0] === selectedTerminal)
  : [];


  return (
    <div>
      <Filter
        options={routes}
        selected={selectedRoute}
        onSelect={setSelectedRoute}
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