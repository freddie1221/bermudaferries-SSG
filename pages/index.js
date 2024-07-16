process.env.NODE_NO_WARNINGS = '1';

import { useEffect, useState } from 'react';
import Airtable from 'airtable';
import Trip from '../components/Trip';
import Filter from '../components/Filter';

export async function getStaticProps() {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base('app4P77dJd7f0ffnK');
  const records = await base('Trips').select().all();
  const count = records.length;

  const trips = records.map(record => ({
    id: record.id,
    fields: record.fields
  }));

  const terminals = [...new Set(trips.map(trip => trip.fields['Departure Terminal'][0]))];

  const routes = [...new Set(trips.map(trip => trip.fields['Route'][0]))];

  const pinkTerminals = [...new Set(trips
    .filter(trip => trip.fields['Route'][0] === 'Pink')
    .map(trip => trip.fields['Departure Terminal'][0])
  )];

  const greenTerminals = [...new Set(trips
    .filter(trip => trip.fields['Route'][0] === 'Green')
    .map(trip => trip.fields['Departure Terminal'][0])
  )];

  console.log(pinkTerminals);

  return {
    props: {
      trips,
      routes,
      terminals,
    },
  };
}

export default function Home({ routes, trips }) {
  
  
  const [selectedTerminal, setSelectedTerminal] = useState('Paget & Warwick');

  const filteredTrips = selectedTerminal
  ? trips.filter(trip => trip.fields['Route'][0] === selectedTerminal)
  : [];

  const sortedTrips = filteredTrips.sort((a, b) => new Date(a.fields['Departure time']) - new Date(b.fields['Departure time']));
  
  return (
    <div>
      <Filter
        terminals={routes}
        selectedTerminal={selectedTerminal}
        onSelectTerminal={setSelectedTerminal}
      />

      <div>
        {sortedTrips.map(trip => (
          <Trip 
            trip={trip}
            key={trip.id}
          />
        ))}
      </div>
    </div>
  );
}