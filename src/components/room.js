import React, { useState } from "react";
import { Typography, Container, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Box, Paper } from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const ReservationForm = () => {
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    const [formData, setFormData] = useState({
        userId: user?.sub,
        checkInDate: '',
        checkOutDate: '',
        roomType: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // TODO: Order does not contain AuthId when logging into user after reservation
            if (!isAuthenticated) {
                await loginWithRedirect();
            }
            const dataToSend = { ...formData, userId: user?.sub };
            await axios.post('http://localhost:8080/api/Orders', dataToSend);
            setFormData({
                userId: '',
                checkInDate: '',
                checkOutDate: '',
                roomType: ''
            });
        } catch (error) {
            console.error('Error saving reservation: ', error);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ textAlign: 'center' }}>
            <Paper sx={{ padding: 7 }}>
            <Typography variant="h4" gutterBottom>
                Reserve room
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={9} sx={{ marginLeft: 5 }}>
                    <InputLabel>Check-in Date</InputLabel>
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
                    <Grid item xs={9} sx={{ marginLeft: 5 }}>
                        <InputLabel>Check-out Date</InputLabel>
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
                    <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginLeft: 5 }}>
                    <InputLabel>Room Type</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                id="room-type-select"   
                                name="roomType"
                                value={formData.roomType}
                                onChange={handleInputChange}
                                sx={{ width: '100%' }}
                            >
                                <MenuItem value={'family'}>Family</MenuItem>
                                <MenuItem value={'double'}>Double</MenuItem>
                                <MenuItem value={'single'}>Single</MenuItem>
                                <MenuItem value={''}>None</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Box sx={{ marginTop: 3 }}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </form>
            </Paper>
        </Container>
    );
};

export default ReservationForm;