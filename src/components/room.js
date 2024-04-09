import React, { useState } from "react";
import axios from "axios";
import { Typography, Container, TextField, Button, Grid } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

const ReservationForm = () => {
    const { user } = useAuth0();
    const [formData, setFormData] = useState({
        userId: user?.sub,
        checkInDate: '',
        checkOutDate: ''
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
                checkOutDate: ''
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
                        <TextField
                            fullWidth
                            type="date"
                            label="Check-in Date"
                            name="checkInDate"
                            value={formData.checkInDate}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Check-out Date"
                            name="checkOutDate"
                            value={formData.checkOutDate}
                            onChange={handleInputChange}
                            required
                        />
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