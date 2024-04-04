require('dotenv').config();

// Top level functions
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());

// Connects mongoose
mongoose.connect(process.env.MONGO_URI, {
}).catch(error => console.error(error));

// Sets server port to 8080
const port = process.env.port || 8080;

// Room logic
// Schema for values in room
const roomSchema = new mongoose.Schema({
    number: String,
    floor: String,
    availability: String,
    size: String,
    price: String,
});

const Room = mongoose.model('Room', roomSchema, 'Rooms');

// GET operation for fetching room info in MongoDB
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

