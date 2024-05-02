import { Typography } from "@mui/material";
import { useEffect } from "react";
import axios from 'axios';

const AdminPage = () => {

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/Orders');
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching orders', error);
            }
        };

        fetchOrders();
    });

    return (
        <div>
            <Typography variant='h4' sx={{ textAlign: 'center' }} gutterBottom>
                Admin Page
            </Typography>
        </div>
    );
}

export default AdminPage;