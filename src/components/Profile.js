import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Typography, Box, Card, Grid } from '@mui/material';
require('dotenv').config();

const Profile = () => {
    const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = React.useState(null);
    console.log(isAuthenticated);

    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = process.env.REACT_APP_AUTH0_DOMAIN;

            try {
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: `https://${domain}/api/v2/`,
                        scope: "read:current_user",
                    },
                });

                const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const { user_metadata } = await metadataResponse.json();

                setUserMetadata(user_metadata);
            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently, user?.sub]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isAuthenticated) {
        return (
            isAuthenticated && (
                <Grid
                    container 
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    marginTop={20}
                    style={{ minHeight: '100vh' }}>
                <Card sx={{ width: 500 }}>
                    <img src={user.picture} alt={user.name} />
                    <Typography variant='h3'>Welcome, {user.nickname}</Typography>
                    <Typography>E-mail: {user.email}</Typography>
                    {userMetadata ? (
                        <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
                    ) : (
                        "No user metadata defined"
                    )}
                </Card>
                </Grid>
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