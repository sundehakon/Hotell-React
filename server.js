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

app.get('/api/Rooms', async (req, res) => {
    const rooms = await rooms.find();
    res.send(rooms);
});

app.listen(5001, () => console.log('Server listening on port 5001...'));

