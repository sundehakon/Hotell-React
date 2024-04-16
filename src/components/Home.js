import React from 'react';
import { Grid, Card, CardMedia, Container, Typography, Box } from '@mui/material';
import '@fontsource/roboto/300.css';

const Home = () => {
  return (
    <Container maxWidth="md">
        <Typography sx={{ textAlign: 'center', marginTop: 10}}>
            <Box sx={{ fontStyle: 'italic', display: 'inline', marginRight: 1 }}>"Experience luxury..."</Box> - Håkon Sunde (CEO)
        </Typography>
      <Grid container spacing={3} sx={{ marginTop: 10 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              style={{ height: 200, objectFit: 'cover' }}
              image='/room-photos/family.jpg'
              alt="Family Room"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              style={{ height: 200, objectFit: 'cover' }}
              image='/room-photos/double.jpg'
              alt="Double Room"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              style={{ height: 200, objectFit: 'cover' }}
              image='/room-photos/single.jpg'
              alt="Single Room"
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
