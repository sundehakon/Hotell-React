import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Typography, Box, Card, Grid } from '@mui/material';
import axios from 'axios';

const Profile = () => {
    const { user, isLoading, isAuthenticated } = useAuth0();
    const [orders, setOrder] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (user) {
                    const response = await axios.get('http://localhost:8080/api/Orders');
                    const matchingOrder = response.data.filter(order => order.userId === user.sub);
                    setOrder(matchingOrder);
                }
            } catch (error) {
                console.error('Error fetching orders', error);
            }
        };

        fetchOrders();
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                marginTop={20}
                style={{ minHeight: '100vh' }}
            >
                <Card sx={{ width: 500 }}>
                    {user.picture && <img src={user.picture} alt={user.name} />}
                    <Typography variant='h3'>Welcome, {user.nickname}</Typography>
                    <Typography>E-mail: {user.email}</Typography>
                </Card>
                {orders && (
                <Card>
                    <Typography variant='h4'>Orders</Typography>
                    <ul>
                        {orders.map((order, index) => (
                            <li key={index}>
                                <p>User ID: {order.userId}</p>
                                <p>Check-in Date: {order.checkInDate}</p>
                                <p>Check-out Date: {order.checkOutDate}</p>
                                <p>Room Type: {order.roomType}</p>
                            </li>
                        ))}
                    </ul>
                </Card>
                )};
            </Grid>
        );
    } else {
        return (
            <Box sx={{ textAlign: 'center', marginTop: 30 }}>
                <Typography variant='h5'>
                    You aren't logged in yet...
                </Typography>
            </Box>
        );
    }
};

export default Profile;
