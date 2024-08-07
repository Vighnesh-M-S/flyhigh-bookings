// src/components/FlightSearch.js
import React, { useState } from 'react';
import api from '../api';

function FlightSearch() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState([]);

  const searchFlights = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get('/api/flights/search/', {
        params: { origin, destination, date },
      });
      setFlights(response.data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div>
      <form onSubmit={searchFlights}>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Origin"
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {flights.map((flight) => (
          <div key={flight.id}>
            {flight.origin} to {flight.destination} on {flight.departure_time}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlightSearch;

