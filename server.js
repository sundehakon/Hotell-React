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
}, { collection: 'Orders' });

const Reservation = mongoose.model('Reservation', reservationSchema);

const authenticateJWT = expressJwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    algorithms: ['RS256']
  });

app.post('/api/Orders', async (req, res) => {
    const { checkInDate, checkOutDate } = req.body;

    const reservation = new Reservation({
        userId,
        checkInDate,
        checkOutDate
    });

    try {
        const savedReservation = await reservation.save();
        res.status(200).send(savedReservation);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/', (req, res) => {
    res.send('Server is running...');
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