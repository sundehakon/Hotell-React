import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

function LogoutButton() {
    const { logout } = useAuth0();

    return <Button onClick={() => logout({ returnTo: window.location.origin })} sx={{ color: 'white' }}>Log Out</Button>
}

export default LogoutButton;