import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
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
                <Button href='/' sx={{ marginRight: 5 }} startIcon={<HomeOutlinedIcon />}>Home</Button>
                <Button href='/reservation' sx={{ marginRight: 5 }}>Reservation</Button>
                <Button href='/profile' sx={{ marginRight: 5 }}>Profile</Button>
                <Button href='/about' sx={{ marginRight: 5 }}>About</Button>
                <Button href='https://github.com/sundehakon/Hotell-React' target='_blank' sx={{ marginRight: 5 }}>GitHub</Button>
                <Button href='https://www.notion.so/Hotell-dokumentasjon-e2c564feff004515b222ff06fab6efdb?pvs=4' target='_blank' sx={{ marginRight: 5 }}>Documentation</Button>
                <Button href='/'>Placeholder</Button>
            </Box>
        </Box>
    );
}

export default Header;