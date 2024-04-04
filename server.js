require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
}).catch(error => console.error(error));

const port = process.env.port || 8080;

// User logic
const jwtCheck = auth({
    audience: 'https://login-api.com',
    issuerBaseURL: 'https://dev-bncxgcmnmpql2vnw.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

// Room logic
const roomSchema = new mongoose.Schema({
    number: String,
    floor: String,
    availability: String,
    size: String,
    price: String,
});

const Room = mongoose.model('Room', roomSchema, 'Rooms');

app.get('/api/Rooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.send(rooms);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.listen(port);
console.log('Running on port ', port);

