import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Typography, Box, Card, Grid } from '@mui/material';

const Profile = () => {
    const { user, isLoading, isAuthenticated } = useAuth0();

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
