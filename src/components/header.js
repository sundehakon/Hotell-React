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
    const { user, isLoading } = useAuth0();
    const scrollToBottom = () => {
        window.scrollTo(0, document.body.scrollHeight)
    }

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 12, marginTop: 1 }}>
                    {user && (
                        <a href='/profile'>
                            <img src={user.picture} alt='Profile' style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8 }} />
                        </a>
                    )}
                    <Box sx={{ marginTop: 0.5 }}>
                        {user && (
                            <Typography variant='body1' sx={{ marginRight: 2 }}>
                                {user.nickname}
                            </Typography>
                        )}
                        {!user && (
                            <div style={{ width: 110, height: 24 }} />
                        )}
                    </Box>
                </Box>
                <Typography variant='h5' gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5rem', marginLeft: 'auto', marginRight: 'auto', marginTop: 2 }}>
                    Havblikk
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 12, marginTop: 1 }}>
                    {!isLoading && !user && (
                        <LoginButton />
                    )}
                    {!isLoading && user && (
                        <LogoutButton />
                    )}
                </Box>
            </Box>
            <hr style={{ width: '90%' }} />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, gap: 6 }}>
                <Button href='/' startIcon={<HomeOutlinedIcon />}>Home</Button>
                <Button href='/reservation'>Reservation</Button>
                <Button href='/profile'>Profile</Button>
                <Button href='/*'>Placeholder</Button>
                <Button href='https://github.com/sundehakon/Hotell-React' target='_blank' sx={{ marginRight: 2 }}>GitHub</Button>
                <Button href='https://www.notion.so/Hotell-dokumentasjon-e2c564feff004515b222ff06fab6efdb?pvs=4' target='_blank'>Documentation</Button>
                <Button onClick={scrollToBottom}>Contact Us</Button>
            </Box>
        </Box>
    );
}

export default Header;
