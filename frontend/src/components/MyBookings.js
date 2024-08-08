import React, { useEffect, useState } from 'react';
import api from '../api';

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/api/bookings/');
        setBookings(response.data);
      } catch (error) {
        console.error('Failed to fetch bookings', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <strong>Flight:</strong> {booking.flight_number} <br />
            <strong>Date:</strong> {booking.flight_date} <br />
            <strong>Seat:</strong> {booking.seat_number}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyBookings;
