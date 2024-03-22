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
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';
import Cookies from 'js-cookie';

const RegisterForm = ({ setNavUsername }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const checkPassword = function() {
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('password_confirm').value;
    
      if (password === confirmPassword) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'Matching';
      } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'Not Matching';
      }
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('password_confirm').value;

            setNavUsername(username);

            if (password !== confirmPassword) {
                console.log('Passwords do not match');
                alert('Passwords do not match');
                return;
            }

            const payload = { email, username, password, firstName, lastName };
            await axios.post('http://localhost:5002/api/Users', payload);
            Cookies.set('username', username);
            setEmail('');
            setUsername('');
            setPassword('');
            setFirstName('');
            setLastName('');
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
                <InputLabel>First name</InputLabel>
                <OutlinedInput label="First name" name="firstName" onChange={(event) => setFirstName(event.target.value)}/>
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput label="Last name" name="lastName" onChange={(event) => setLastName(event.target.value)}/>
              </FormControl>
            </Grid>
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
                <OutlinedInput id="password" label="Password" name="password" type="password" onChange={(event) => setPassword(event.target.value)}/>
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel sx={{ width: '100%' }}>Repeat password</InputLabel>
                <OutlinedInput id="password_confirm" label="Repeat password" name="password_confirm" type="password" onChange={checkPassword}/>
                <Typography id="message"></Typography>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end', gap: 1 }}>
          <Link href="/login">Log in</Link>
          <Button variant="contained" type='submit'>Register</Button>
        </CardActions>
      </Card>
    </form>
    );
};

export default RegisterForm;
