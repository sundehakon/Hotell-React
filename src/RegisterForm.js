import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const payload = { email, username, password };
            await axios.post('http://localhost:5001/api/Users', payload);
            setEmail('');
            setUsername('');
            setPassword('');
            console.log('User created!');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box 
            height={400} 
            width={400} 
            my={4} 
            display={'flex'} 
            flexDirection={'column'}
            alignItems={'center'}   
            justifyContent={'center'}
            p={2} 
            sx={{ border: '2px solid grey', textAlign: 'center' }}
        >
        <form onSubmit={handleSubmit}>
            <Typography variant='h4'>Register</Typography>
            <a href='/'>Home</a>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </label>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
        </Box>
    );
};

export default RegisterForm;