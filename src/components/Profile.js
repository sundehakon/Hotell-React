import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Typography, Box, Card, Grid, Button, IconButton, Snackbar, List, ListItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const Profile = () => {
    const { user, isLoading, isAuthenticated } = useAuth0();
    const [orders, setOrder] = useState([]);
    const [open, setOpen] = useState(false);

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

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/Orders/${orders[0]._id}`);
            setOpen(true);
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const confirmDelete = (
        <React.Fragment>
            <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={handleClose}
            >
                <CloseIcon fontSize='small' />
            </IconButton>
        </React.Fragment>
    )

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return (
            <div>
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
                            <List key={index}>
                                <ListItem>User ID: {order.userId}</ListItem>
                                <ListItem>Check-in Date: {order.checkInDate}</ListItem>
                                <ListItem>Check-out Date: {order.checkOutDate}</ListItem>
                                <ListItem>Room Type: {order.roomType}</ListItem>
                            </List>
                        ))}
                    </ul>
                    <Button onClick={handleDelete} variant="contained" color="error">
                        Cancel
                    </Button>
                </Card>
                )};
            </Grid>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message='Cancellation confirmed'
                action={confirmDelete}
            />
            </div>
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
