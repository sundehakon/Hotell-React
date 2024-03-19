require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    email: String, 
    username: String, 
    password: String,
});

const User = mongoose.model('User', userSchema, 'Users');

app.post('/api/Users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(newUser);
});

app.listen(5001, () => console.log('Server listening on port 5001!'));

