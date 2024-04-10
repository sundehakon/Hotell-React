require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {});
const db = mongoose.connection;

const reservationSchema = new mongoose.Schema({
    userId: String,
    checkInDate: String, 
    checkOutDate: String
}, { collection: 'Orders' });

const Reservation = mongoose.model('Reservation', reservationSchema);

expressJwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    algorithms: ['RS256']
  });

app.post('/api/Orders', async (req, res) => {
    const { checkInDate, checkOutDate } = req.body;
    const userId = req.user.sub;

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

app.get('/api/Orders', 
    expressJwt({
        secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
        algorithms: ['RS256']
  }),
  async (req, res) => {
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