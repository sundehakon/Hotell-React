import React from "react";
import axios from "axios";
import { Typography, Container, TextField } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

const ReservationForm = () => {
    const { user } = useAuth0();
    const [formData, setFormData] = useState({
        userId: '',
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
            const response = await axios.post('/Orders', formData);
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
                <TextField
                    fullWidth
                    margin="normal"
                    label=""
                />
            </form>
        </Container>
    )
}