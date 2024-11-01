const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Ensure this path is correct
const surveyRoutes = require('./routes/surveyRoutes');
const questionRoutes = require('./routes/questionRoutes');
const responseRoutes = require('./routes/responseRoutes');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
const allowedOrigins = ['https://health-lemon.vercel.app'];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, origin);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Import models
require('./models/question.model');

// Routes
app.use('/api/users', userRoutes); // Ensure this path is correct
app.use('/api/questions', questionRoutes);
app.use('/api/survey', surveyRoutes);
app.use('/api/responses', responseRoutes);

// Test Route
app.get('/test', (req, res) => {
    console.log('Test route hit');
    res.send('Server is running');
});

// Database connection
const mongoURI = 'mongodb+srv://dbUser:rn8pS76FPfbQWkiz@development.idrmls4.mongodb.net/?retryWrites=true&w=majority&appName=Development';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));