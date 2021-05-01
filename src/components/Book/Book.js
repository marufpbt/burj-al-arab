import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from './../../App';
import { useState, useContext } from 'react';
import 'date-fns';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Booking from './../Booking/Booking';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    });
    const handleCheckInDate = (date) => {
        const newDates = { ...selectedDate };
        newDates.checkIn = date;
        setSelectedDate(newDates);
    };
    const handleCheckOutDate = (date) => {
        const newDates = { ...selectedDate };
        newDates.checkOut = date;
        setSelectedDate(newDates);
    };
    const handleBooking = () => {
        const newBooking = { ...loggedInUser, ...selectedDate };
        console.log(newBooking);
        fetch('http://localhost:5000/addBooking', {
            method: 'POST',
            body: JSON.stringify(newBooking),
            headers: {
                "Content-type": "application/json;charset = UTF-8"
            }
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <h1> Hello, {loggedInUser.name} Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Check In Date"
                        value={selectedDate.checkIn}
                        onChange={handleCheckInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check Out Date"
                        format="MM/dd/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <Button onClick={handleBooking} variant="contained" color="primary">
                        Book Now
                    </Button>
                </Grid>
            </MuiPickersUtilsProvider>
            <Booking></Booking>
        </div>
    );
};

export default Book;
