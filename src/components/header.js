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
    const {user, isLoading } = useAuth0();

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'row', paddingLeft: 20 }}>
                    {user && (
                        <img src={user.picture} alt='Profile' style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8 }} />
                    )}
                    <Box sx={{ marginTop: 0.5 }}>
                    {user && (
                        <Typography variant='body1' sx={{ marginRight: 2 }}>
                            {user.nickname}
                        </Typography>
                    )}
                    </Box>
                </Box>
                <Typography variant='h5' gutterBottom marginTop={3} sx={{ marginLeft: 67  }}>
                    Havblikk
                </Typography>
                </Box>
                <Box sx={{ marginLeft: 'auto', marginRight: 20, marginTop: 3 }}>
                    {!isLoading && !user && (
                    <LoginButton />
                    )}
                    {!isLoading && user && (
                    <LogoutButton />
                    )}
                </Box>
            </Box>
            <hr style={{ width: 1360 }}/>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>    
                <Button href='/' sx={{ marginRight: 5 }} startIcon={<HomeOutlinedIcon />}>Home</Button>
                <Button href='/reservation' sx={{ marginRight: 5 }}>Reservation</Button>
                <Button href='/profile' sx={{ marginRight: 5 }}>Profile</Button>
                <Button href='/' sx={{ marginRight: 5 }}>Placeholder</Button>
                <Button href='https://github.com/sundehakon/Hotell-React' target='_blank' sx={{ marginRight: 5 }}>GitHub</Button>
                <Button href='https://www.notion.so/Hotell-dokumentasjon-e2c564feff004515b222ff06fab6efdb?pvs=4' target='_blank' sx={{ marginRight: 5 }}>Documentation</Button>
                <Button href='/about'>About</Button>
            </Box>
        </Box>
    );
}

export default Header;