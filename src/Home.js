import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Typography>Welcome to the hotel management system!</Typography>
            <a href='/register'>Register</a>
            <a href='/rooms'>Rooms</a>
        </div>
    );
}

export default Home;