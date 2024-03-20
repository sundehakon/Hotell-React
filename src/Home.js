import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';

const Home = () => {
    return (
        <Box sx={{width: '100%', maxWidth: 500}}>
            <Typography variant='h1' gutterBottom>
                Home
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
                Welcome to the hotel management system!
            </Typography>   
            <Link href='/register'>Register</Link>
            <Link href='/rooms'>Rooms</Link>
        </Box>
    );
}

export default Home;