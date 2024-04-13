import { useAuth0 } from '@auth0/auth0-react';

const { getAccessTokenSilently } = useAuth0();

const getToken = async () => {
    try {
        const token = await getAccessTokenSilently();
        console.log(token);
    } catch (error) {
        console.error('Error getting access token: ' + error)
    }
};

export default getToken;
