import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';

const Home = () => {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h5' gutterBottom marginTop={3}>
                Havblikk
            </Typography>
            <hr style={{ width: 1400 }}/>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>    
                <Link href='/profile' sx={{ marginRight: 10 }}>Profile</Link>
                <Link href='/reservation'>Reservation</Link>
            </Box>
        </Box>
    );
}

export default Home;