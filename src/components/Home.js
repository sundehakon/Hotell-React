import React from 'react';
import { Grid, Card, CardMedia, Container, Typography, Box } from '@mui/material';
import '@fontsource/roboto/300.css';

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
    <Box sx={{ backgroundColor: '#1C232B', position: 'absolute', left: 0, right: 0, marginTop: 20, height: 370 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', marginTop: 10, color: 'white' }}>Welcome to Havblikk</Typography>
        <Typography variant="h5" sx={{ textAlign: 'center', marginTop: 5, color: 'white' }}>The place where you can relax and enjoy the beautiful view of the ocean</Typography>
        <Typography variant="h5" sx={{ textAlign: 'center', marginTop: 5, color: 'white' }}>We offer a variety of rooms to suit your needs, whether you're traveling alone or with family</Typography>
    </Box>
    <Box>
        <img src='/hotel-photos/trip-advisor-2022.webp' alt='Trip Advisor' style={{ width: 325, height: 250, display: 'block', marginLeft: 'auto', marginTop: 600 }} />
        <img src='/hotel-photos/2020-travellers-choice.png' alt='Trip Advisor' style={{ width: 325, height: 250, display: 'block', marginRight: 'auto', marginTop: -250 }} />
    </Box>
    </Container>
  );
}

export default Home;
