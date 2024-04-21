import React, { useEffect } from 'react';
import { Grid, Card, CardMedia, Container, Typography, Box, Button } from '@mui/material';
import '@fontsource/roboto/300.css';
import Spline from '@splinetool/react-spline';

const Home = () => {
  return (
    <Container maxWidth="md">
        <Typography sx={{ textAlign: 'center', marginTop: 10, fontSize: 20}}>
            <Box sx={{ fontStyle: 'italic', display: 'inline', marginRight: 1 }}>"Experience luxury..."</Box> - Håkon Sunde (CEO)
        </Typography>
      <Grid container spacing={2} sx={{ marginTop: 10, marginLeft: 10 }}>
        <Grid item xs={12} sm={6} md={9}>
          <Card>
            <CardMedia
              component="img"
              style={{ height: 200, objectFit: 'cover' }}
              image='/hotel-photos/room-with-view.webp'
              alt="Family Room"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              style={{ height: 200, objectFit: 'cover' }}
              image='/hotel-photos/hotel-sign.jpeg'
              alt="Double Room"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <Card>
            <CardMedia
              component="img"
              style={{ height: 200, objectFit: 'cover' }}
              image='/hotel-photos/lobby.jpeg'
              alt="Single Room"
            />
          </Card>
        </Grid>
      </Grid>
    <Box sx={{ backgroundColor: '#788496', position: 'absolute', left: 0, right: 0, marginTop: 20, height: 500 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', marginTop: 17, color: 'white' }}>Welcome to Havblikk!</Typography>
        <Typography variant="h5" sx={{ textAlign: 'center', marginTop: 5, color: 'white' }}>The place where you can relax and enjoy the beautiful view of the ocean</Typography>
        <Typography variant="h5" sx={{ textAlign: 'center', marginTop: 5, color: 'white' }}>We offer a variety of rooms to suit your needs, whether you're traveling alone or with family</Typography>
    </Box>
    <Box>
        <Typography variant="h4" sx={{ textAlign: 'center', marginTop: 90 }}>We Take Pride in Quality</Typography>
        <img src='/hotel-photos/trip-advisor-2022.webp' alt='Trip Advisor' style={{ width: 325, height: 250, display: 'block', marginLeft: 380, marginTop: 100 }} />
        <img src='/hotel-photos/2020-travellers-choice.png' alt='Trip Advisor' style={{ width: 325, height: 250, display: 'block', marginLeft: 130, marginTop: -260 }} />
    </Box>
    <Box sx={{ backgroundColor: '#788496', position: 'absolute', left: 0, right: 0, marginTop: 15, height: 1000 }}>
      <Typography sx={{ textAlign: 'center', color: 'white', marginTop: 5 }} variant='h4'>Enjoy a 3D Model of The "Double" Room</Typography>
      <Box sx={{ width: 1000, height: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 45, zoom: '1' }}>
        <Spline scene='https://prod.spline.design/aJK3vLcIjRFcByVZ/scene.splinecode' />
      </Box>
    </Box>
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant='h4' sx={{ marginTop: 160 }}>What Are You Waiting For?</Typography>
      <Button href='/reservation' variant='outlined' sx={{ marginTop: 10, 
      '&:hover': { transform: 'scale(1.05)',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
        } 
      }} size='large'>Reserve Your Dream Vacation Now!</Button>
    </Box>
    <Box sx={{ backgroundColor: '#788496', position: 'absolute', left: 0, right: 0, marginTop: 20, height: 400 }}>
      <Typography variant='h3' sx={{ textAlign: 'center', color: 'white', marginTop: 12 }}>Contact Us</Typography>
      <Typography variant='h6' sx={{ textAlign: 'center', color: 'white', marginTop: 3 }}>
        <Box sx={{ fontWeight: 'bolder', display: 'inline' }}>Email:</Box> contact@havblikk.com
        <br />
        <Box sx={{ marginTop: 1 }}>
          <Box sx={{ fontWeight: 'bolder', display: 'inline' }}>Phone:</Box> +47 923 56 123
        </Box>
        <br />
        <Box sx={{ marginTop: -3 }}>
          <Box sx={{ fontWeight: 'bolder', display: 'inline' }}>Address:</Box> Havblikkveien 1, 1234 Havblikk
        </Box>
      </Typography>
    </Box>
    </Container>
  );
}

export default Home;
