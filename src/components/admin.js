import { Grid, Typography, Box, ListItem, List, Card } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const AdminPage = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth0();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/Orders');
                setOrders(response.data); 
            } catch (error) {
                console.error('Error fetching orders', error);
            }
        };

        fetchOrders();
    }, []); 

if (user && user.email === 'admin@havblikk.com') {
    return (
        <div>
            <Typography variant='h4' sx={{ textAlign: 'center', marginTop: 5 }} gutterBottom>
                Admin Page
            </Typography>
            <Grid
                container
                spacing={0}
                gap={8}
                direction="row"
                alignItems="center"
                justifyContent="center"
                marginTop={15}
            >
                {orders.map((order, index) => (
                    <Card sx={{ padding: 4 }}>
                    <List key={index}>
                        <ListItem>
                            <Box sx={{ fontWeight: 'bolder' }}>Check-in Date:</Box>&nbsp;{order.checkInDate}
                        </ListItem>
                        <ListItem>
                            <Box sx={{ fontWeight: 'bolder' }}>Check-out Date:</Box>&nbsp;{order.checkOutDate}
                        </ListItem>
                        <ListItem>
                            <Box sx={{ fontWeight: 'bolder' }}>Room Type:</Box>&nbsp;{order.roomType}
                        </ListItem>
                        <ListItem>
                            <Box sx={{ fontWeight: 'bolder' }}>Auth0 User ID:</Box>&nbsp;{order.userId} 
                        </ListItem>
                    </List>
                    </Card>
                ))}
            </Grid>
        </div>
    );
} else {
    return (
        <Box sx={{ textAlign: 'center', marginTop: 30 }}>
            <Typography variant='h2' sx={{ marginTop: 3, color: 'red', fontWeight: 'bolder' }}>
                You are not authorized to view this page!!!
            </Typography>
        </Box>
    );
}
};

export default AdminPage;
