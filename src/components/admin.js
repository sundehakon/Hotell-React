import { Grid, Typography, Box, ListItem, List, Card } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';

const AdminPage = () => {
    const [orders, setOrders] = useState([]);

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
}

export default AdminPage;
