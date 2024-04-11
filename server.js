require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

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

const verifyJwt = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

app.post('/api/Orders', verifyJwt, async (req, res) => {
    const { checkInDate, checkOutDate, roomType } = req.body;
    const userId = req.user.sub;

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

app.get('/api/Orders', verifyJwt, async (req, res) => {
    const userId = req.user.sub;

    try {
        const reservations = await Reservation.find({ userId });
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).send(err);
    }
});

db.on('error', (error) => {
    console.error('MongoDB connection error: ' + error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`PORT: ${PORT}`);
})
