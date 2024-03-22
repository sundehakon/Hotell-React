require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
}).catch(error => console.error(error));

const userSchema = new mongoose.Schema({
    email: String, 
    username: String, 
    password: String,
});

const User = mongoose.model('User', userSchema, 'Users');

app.post('/api/Users', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
});

app.post('/api/Users/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username, password });
        if (existingUser) {
            res.send({ success: true, user: existingUser });
        } else {
            res.status(401).send({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.get('api/Users'), async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(401).send({ success: false, message: 'Invalid username or password' });
        }

        if (user.password !== password) {
            return res.status(401).send({ success: false, message: 'Invalid username or password' });
        }

        res.send({ success: true, user });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

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

app.listen(5002, () => console.log('Server listening on port 5002...'));

