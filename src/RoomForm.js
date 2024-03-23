import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, Grid } from '@mui/material';

const RoomForm = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/Rooms');
                setRooms(response.data);
            } catch (error) {
                console.error(error);
            }
    };
    fetchRooms();
    }, []);

    return (
        <div>
        <Typography variant='h2'>Rooms</Typography>
        <Grid container spacing={3}>
            <Card>
                <CardContent>

                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    
                </CardContent>
            </Card>
        </Grid>
        </div>
    );
};

export default RoomForm;