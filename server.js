//server.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize the app first
const app = express();

// Enable CORS after app initialization
app.use(cors());

require('dotenv').config();  // Load environment variables

const jwtSecret = process.env.JWT_SECRET;  // Get the secret from .env

app.use(express.json()); // Handle JSON parsing
app.use(express.static('frontend/Sharesphere-frontend'));

app.use('/api/users', userRoutes); // Set up the user routes

app.get('/', (req, res) => {
    res.send('Hello, ShareSphere!');
});

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/ShareSphere', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`This server runs on http://localhost:${PORT}`);
});
