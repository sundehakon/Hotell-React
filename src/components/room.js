import React, { useState } from "react";
import axios from "axios";
import { Typography, Container, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

const ReservationForm = () => {
    const { user } = useAuth0();
    const [formData, setFormData] = useState({
        userId: user?.sub,
        checkInDate: '',
        checkOutDate: '',
        roomType: ''
    });

    const [message, setMessage] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/Orders', formData);
            setMessage('Reservation successfully saved!');
            setFormData({
                userId: '',
                checkInDate: '',
                checkOutDate: '',
                roomType: ''
            });
        } catch (error) {
            console.error('Error saving reservation: ', error);
            setMessage('Error saving reservation. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Reservation Form
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                    <InputLabel forHtml="check-in-date">Check-in Date</InputLabel>
                        <TextField
                            fullWidth
                            id="check-in-date"
                            type="date"
                            name="checkInDate"
                            value={formData.checkInDate}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel forHtml="check-out-date">Check-out Date</InputLabel>
                        <TextField
                            fullWidth
                            id="check-out-date"
                            type="date"
                            name="checkOutDate"
                            value={formData.checkOutDate}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="room-type-label">Room Type</InputLabel>
                            <Select
                                label="room-type-label"
                                id="room-type-select"
                                name="roomType"
                                value={formData.roomType}
                                onChange={handleInputChange}
                            >
                                <MenuItem value={'family'}>Family</MenuItem>
                                <MenuItem value={'double'}>Double</MenuItem>
                                <MenuItem value={'single'}>Single</MenuItem>
                                <MenuItem value={''}>None</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default ReservationForm;