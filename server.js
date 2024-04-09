require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
});
const db = mongoose.connection;

const reservationSchema = new mongoose.Schema({
    userId: String,
    checkInDate: String, 
    checkOutDate: String
});
const Reservation = mongoose.model('Reservation', reservationSchema);

app.post('/api/Orders', (req, res) => {
    const { userId, checkInDate, checkOutDate } = req.body;

    const reservation = new Reservation({
        userId,
        checkInDate,
        checkOutDate
    });

    reservation.save((err, savedReservation) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(savedReservation);
        }
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`PORT: ${PORT}`);
})