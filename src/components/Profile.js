import { Grid, Typography, Button, Card } from "@mui/material";
import Cookies from "js-cookie";

const Profile = () => {

    // Fetches values stored as cookies in browser
    const username = Cookies.get('username');
    const firstName = Cookies.get('firstName');

    // Function for removing stored cookies from browser
    const removeCookies = () => {
        Cookies.remove('username');
        Cookies.remove('firstName');
        window.location.reload();
    }

    if (username) {
        return (
            <div style={{ marginTop: -80 }}>
            <Typography variant='h3' sx={{ textAlign: 'center', paddingBottom: 10 }}>Profile</Typography>
            <Grid container spacing={1} gap={4}>
                <Card>
                    <Button onClick={removeCookies} variant='contained' sx={{ display: 'block', margin: 'auto' }}>Delete user</Button>
                </Card>
            </Grid>
            </div>
        );
    } else {
        return (
            <div style={{ marginTop: -80 }}>
            <Typography variant='h6' sx={{ textAlign: 'center', paddingBottom: 10 }}>Please register to view your profile</Typography>
            </div>
        )
    }
};

export default Profile;