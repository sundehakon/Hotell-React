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
    firstName: String,
    lastName: String,
});

const User = mongoose.model('User', userSchema, 'Users');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        req.username = decoded.username;
        next();
    })
}

app.post('/api/Users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const result = await newUser.save();
        console.log(result);
        res.status(201).send(newUser);
    } catch (error) {
        console.log(error);
    }
});

app.post('/api/Users/login', verifyToken, async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username, password });
        if (existingUser) {
            const token = jwt.sign({ username }, process.env.JWT_SECRET);
            res.send({ success: true, token });
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

