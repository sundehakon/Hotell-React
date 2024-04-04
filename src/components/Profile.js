import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Typography, Box } from '@mui/material';

const Profile = () => {
    const { user, isLoading, isAuthenticated } = useAuth0();

    if (isLoading) {
        return (
        <div>
            <Typography>Loading...</Typography>
        </div>
        );
    }

    if (isAuthenticated) {
        return (
            isAuthenticated && (
                <div>
                    <img src={user.picture} alt={user.name} />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            )
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