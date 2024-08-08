import React, { useState, useEffect } from 'react';
import api from '../api';

function Admin() {
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [flightNumber, setFlightNumber] = useState('');
  const [flightDate, setFlightDate] = useState('');

  // Fetch all flights
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

  // Fetch all bookings for a specific flight
  const fetchBookings = async (flightId) => {
    try {
      const response = await api.get(`/api/flights/${flightId}/bookings/`);
      setBookings(response.data);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    }
  };

  // Add a new flight
  const addFlight = async () => {
    try {
      const response = await api.post('/api/flights/', {
        flight_number: flightNumber,
        flight_date: flightDate,
      });
      setFlights([...flights, response.data]);
      setFlightNumber('');
      setFlightDate('');
    } catch (error) {
      console.error('Failed to add flight', error);
    }
  };

  // Remove a flight
  const removeFlight = async (flightId) => {
    try {
      await api.delete(`/api/flights/${flightId}/`);
      setFlights(flights.filter((flight) => flight.id !== flightId));
    } catch (error) {
      console.error('Failed to remove flight', error);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <h3>Add a Flight</h3>
      <input
        type="text"
        value={flightNumber}
        onChange={(e) => setFlightNumber(e.target.value)}
        placeholder="Flight Number"
      />
      <input
        type="date"
        value={flightDate}
        onChange={(e) => setFlightDate(e.target.value)}
        placeholder="Flight Date"
      />
      <button onClick={addFlight}>Add Flight</button>

      <h3>Manage Flights</h3>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            {flight.flight_number} on {flight.flight_date}{' '}
            <button onClick={() => fetchBookings(flight.id)}>View Bookings</button>
            <button onClick={() => removeFlight(flight.id)}>Remove Flight</button>
          </li>
        ))}
      </ul>

      {bookings.length > 0 && (
        <>
          <h3>Bookings for Flight</h3>
          <ul>
            {bookings.map((booking) => (
              <li key={booking.id}>
                <strong>Booking ID:</strong> {booking.id} <br />
                <strong>Passenger:</strong> {booking.user.username} <br />
                <strong>Seat:</strong> {booking.seat_number}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Admin;
