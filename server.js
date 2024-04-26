require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {});
const db = mongoose.connection;

const reservationSchema = new mongoose.Schema({
    userId: String,
    checkInDate: String, 
    checkOutDate: String,
    roomType: String
}, { collection: 'Orders' });

const Reservation = mongoose.model('Reservation', reservationSchema);

app.post('/api/Orders', async (req, res) => {
    const { checkInDate, checkOutDate, roomType, userId } = req.body;

    const reservation = new Reservation({
        userId,
        checkInDate,
        checkOutDate,
        roomType
    });

    try {
        const savedReservation = await reservation.save();
        res.status(200).send(savedReservation);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/api/Orders', async (req, res) => {
    try {
        const orders = await Reservation.find(); 
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/Orders/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        const deletedOrder = await Reservation.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

db.on('error', (error) => {
    console.error('MongoDB connection error: ' + error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`PORT: ${PORT}`);
});
