import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
    const { user, isLoading, isAuthenticated } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>
    }
};

export default Profile;