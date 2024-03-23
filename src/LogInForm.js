import React, { useState } from 'react';
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
import Cookies from 'js-cookie';

function LogInForm () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      
      try {
          const response = await fetch('http://localhost:5002/api/Users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ username, password})
      });

      const data = await response.json();

      if (data.success) {
        console.log('User logged in successfully!');
        navigate('/');
        Cookies.set('username', username);
      } else {
        alert('Invalid username or password!');
      }
    } catch (error) {
        console.error(error);
    }
  };

    return (
    <form onSubmit={handleSubmit}>
        <Card>
        <CardHeader subheader="Enter your credentials" title="Log in" />
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
                <InputLabel>Password</InputLabel>
                <OutlinedInput label="Password" name="password" type="password" onChange={(event) => setPassword(event.target.value)}/>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end', gap: 1 }}>
          <Link href="/register">Register</Link>
          <Button variant="contained" type='submit'>Log in</Button>
        </CardActions>
      </Card>
    </form>
    );
};

export default LogInForm;