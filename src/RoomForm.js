import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

const RoomForm = () => {
    const [rooms, setRooms] = useState([]);

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
        <div>
            <Typography variant='h2'>Rooms</Typography>
            <a href='/'>Home</a>
            <ul>
                {rooms.map(room => (
                    <li key={room._id}>
                        Room number: {room.number}<br/>
                        Floor: {room.floor}<br/>
                        Availability: {room.availability}<br/>
                        Size: {room.size}<br/>
                        Price: {room.price}<br/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomForm;