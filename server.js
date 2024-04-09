require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

const reservationSchema = new mongoose.Schema({
    userId: String,
    checkInDate: String, 
    checkOutDate: String
});
const Reservation = mongoose.model('Reservation', reservationSchema);

app.post('/Orders', (req, res) => {
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
    console.log(`Server is listening on port ${PORT}...`);
})