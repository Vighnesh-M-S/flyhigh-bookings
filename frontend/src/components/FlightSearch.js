// src/components/FlightSearch.js
import React, { useEffect, useState } from 'react';
import api from '../api';

function FlightSearch() {
  const [flights, setFlights] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await api.get('/api/flights/');
        setFlights(response.data);
      } catch (error) {
        console.error('Failed to fetch flights', error);
      }
    };

    fetchFlights();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredFlights = flights.filter(
    (flight) =>
      flight.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Search Flights</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by origin or destination"
      />
      <ul>
        {filteredFlights.map((flight) => (
          <li key={flight.id}>
            <strong>{flight.flight_number}</strong> - {flight.origin} to {flight.destination} <br />
            Departure: {new Date(flight.departure_time).toLocaleString()} <br />
            Arrival: {new Date(flight.arrival_time).toLocaleString()} <br />
            Available Seats: {flight.available_seats}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FlightSearch;
