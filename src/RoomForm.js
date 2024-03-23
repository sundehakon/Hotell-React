import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, Grid, CardMedia, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RoomForm = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/Rooms');
                setRooms(response.data);
            } catch (error) {
                console.error(error);
            }
    };
    fetchRooms();
    }, []);

    return (
        <div style={{ marginTop: -80 }}>
        <Typography variant='h2' sx={{ textAlign: 'center', paddingBottom: 10 }}>Choose your preferred size</Typography>
        <Grid container spacing={1} gap={4}>
            <Card>
                <CardActionArea 
                    onClick={() => navigate('/')} 
                    sx={{
                        '&:hover': {
                            transform: 'scale(1.03)',
                            transition: 'transform 1s',
                        }
                    }}
                >
                    <CardMedia 
                        component="img"
                        src={process.env.PUBLIC_URL + '/room-photos/family.jpg'} 
                        alt='Photo of a hotel room which is family sized'
                        style={{ width: '100%', height: 300 }}
                    />
                    <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                        <Typography variant='subtitle1'>Family Room</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card>
                <CardActionArea 
                    onClick={() => navigate('/')}
                    sx={{
                        '&:hover': {
                            transform: 'scale(1.03)',
                            transition: 'transform 1s',
                        }
                    }}
                >
                    <CardMedia
                        component="img"
                        image={process.env.PUBLIC_URL + '/room-photos/double.jpg'} 
                        alt='Photo of a hotel room which is double sized'
                        style={{ height: 300 }}
                    />
                    <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                        <Typography variant='subtitle1'>Double Room</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card>
                <CardActionArea 
                    onClick={() => navigate('/')}
                    sx={{
                        '&:hover': {
                            transform: 'scale(1.03)',
                            transition: 'transform 1s',
                        }
                    }}
                >
                    <CardMedia
                        component="img"
                        image={process.env.PUBLIC_URL + '/room-photos/single.jpg'} 
                        alt='Photo of a hotel room which is single sized'
                        style={{ width: '100%', height: 300 }}
                    />
                    <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                        <Typography variant='subtitle1'>Single Room</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
        </div>
    );
};

export default RoomForm;