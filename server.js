require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwksRsa = require('jwks-rsa');
    const { expressjwt: jwt } = require('express-jwt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {});
const db = mongoose.connection;

app.use(
    jwt({
        secret: jwksRsa.expressJwtSecret({
            cache: true, 
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
        }),
        audience: 'https://havblikk-api/',
        issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
        algorithms: ['RS256']
    }).unless({ path: ['api/public'] })
);

const reservationSchema = new mongoose.Schema({
    userId: String,
    checkInDate: String, 
    checkOutDate: String,
    roomType: String
}, { collection: 'Orders' });

const Reservation = mongoose.model('Reservation', reservationSchema);

const verifyJwt = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    const token = authHeader.split(' ')[1];

    jwt({
        secret: jwksRsa.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
        }),
        audience: 'https://havblikk-api/',
        issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
        algorithms: ['RS256']
    })(req, res, (err) => {
        if (err) {
            console.error('JWT Verification Error:', err.message);
            return res.status(403).json({ message: 'Invalid token' });
        }
        next();
    });
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
