import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import LoginButton from './login';
import LogoutButton from './logout';
import { useAuth0 } from "@auth0/auth0-react";
import '@fontsource/roboto/300.css';

const Home = () => {
    const {user, isLoading} = useAuth0();

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h5' gutterBottom marginTop={3}>
                Havblikk
            </Typography>
            {!isLoading && !user && (
              <LoginButton />
            )}
            {!isLoading && user && (
              <LogoutButton />
            )}
            <hr style={{ width: 1400 }}/>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>    
                <Link href='/profile' sx={{ marginRight: 10 }}>Profile</Link>
                <Link href='/reservation'>Reservation</Link>
            </Box>
        </Box>
    );
}

export default Home;