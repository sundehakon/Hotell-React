import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Typography, Box, Card, Grid, Button, IconButton, Snackbar, List, ListItem } from '@mui/material';
import LoginButton from './login';
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
            await axios.delete(`http://localhost:8080/api/Orders/${orders[0]._id}`);
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
                gap={8}
                direction="column"
                alignItems="center"
                justify="center"
                marginTop={10}
            >
                <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 6, borderRadius: 10, boxShadow: 3 }}>
                    <Box>
                        {user.picture && <img src={user.picture} alt={user.name} style={{ borderRadius: '50%' }}/>}
                    </Box>
                    <Typography variant='h3'>Welcome, {user.nickname}</Typography>
                    <Typography>E-mail: {user.email}</Typography>
                    {user.email_verified === true ? (
                        <Typography>Email verified: Yes</Typography>
                    ) : (
                        <Typography>Email verified: No</Typography>
                    )}
                </Card>
                {orders.length > 0 && (
                <Card sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: 400, textAlign: 'center' }}>
                    <Typography variant='h4' sx={{ marginTop: 3 }}>Orders</Typography>
                        {orders.map((order, index) => (
                            <Box key={index}>
                                <Typography sx={{ marginTop: 1 }}>
                                    <Box sx={{ fontWeight: 'bolder' }}>Check-in Date:</Box>&nbsp;{order.checkInDate}
                                </Typography>
                                <Typography sx={{ marginTop: 1 }}>
                                    <Box sx={{ fontWeight: 'bolder' }}>Check-out Date:</Box>&nbsp;{order.checkOutDate}
                                </Typography>
                                <Typography sx={{ marginTop: 1 }}>
                                    <Box sx={{ fontWeight: 'bolder' }}>Room Type:</Box>&nbsp;{order.roomType}
                                </Typography>
                            </Box>
                        ))}
                    <Button onClick={handleDelete} variant="contained" color="error" sx={{ marginBottom: 3, marginTop: 1 }}>
                        Cancel
                    </Button>
                </Card>
                )}
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
                    Please Log In to View Your Profile
                </Typography>
                <Box sx={{ marginTop: 4 }}>
                    <LoginButton />
                </Box>
            </Box>
        );
    }
};

export default Profile;
