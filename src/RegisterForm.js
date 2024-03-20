import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Unstable_Grid2';

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
    <form onSubmit={handleSubmit}>
        <Card>
        <CardHeader subheader="Enter your personal details" title="Register" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Username</InputLabel>
                <OutlinedInput label="Username" name="userName" onChange={(event) => setUsername(event.target.value)}/>
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput label="Email address" name="email" onChange={(event) => setEmail(event.target.value)}/>
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Password</InputLabel>
                <OutlinedInput label="Password" name="password" type="password" onChange={(event) => setPassword(event.target.value)}/>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type='submit'>Register</Button>
        </CardActions>
      </Card>
    </form>
    );
};

export default RegisterForm;