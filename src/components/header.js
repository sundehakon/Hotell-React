import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import LoginButton from './login';
import LogoutButton from './logout';
import { useAuth0 } from "@auth0/auth0-react";
import '@fontsource/roboto/300.css';

const Header = () => {
    const {user, isLoading} = useAuth0();

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant='h5' gutterBottom marginTop={3} sx={{ marginLeft: 100 }}>
                    Havblikk
                </Typography>
                <Box sx={{ marginLeft: 'auto', marginRight: 20, marginTop: 3 }}>
                    {!isLoading && !user && (
                    <LoginButton />
                    )}
                    {!isLoading && user && (
                    <LogoutButton />
                    )}
                </Box>
            </Box>
            <hr style={{ width: 1400 }}/>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>    
                <Link href='/profile' sx={{ marginRight: 5 }}>Profile</Link>
                <Link href='/reservation' sx={{ marginRight: 5 }}>Reservation</Link>
                <Link href='/' sx={{ marginRight: 5 }}>Placeholder</Link>
                <Link href='/' sx={{ marginRight: 5 }}>Placeholder</Link>
                <Link href='/' sx={{ marginRight: 5 }}>Placeholder</Link>
                <Link href='/' sx={{ marginRight: 5 }}>Placeholder</Link>
                <Link href='/'>Placeholder</Link>
            </Box>
        </Box>
    );
}

export default Header;