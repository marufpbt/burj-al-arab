import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Booking = () => {
	const [booking, setBooking] = useState([]);
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	useEffect(() => {
		fetch('http://localhost:5000/bookings?email='+ loggedInUser.email)
		.then(res => res.json())
		.then(data => {
			setBooking(data)
		})
	})
	return (
		<div>
			<h3>You have booked: {booking.length}</h3>
			{
				booking.map(booking => <li>{booking.name} from {booking.checkIn} to {booking.checkOut}</li>)
			}
		</div>
	);
};

export default Booking;
