const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Test Route
app.get('/', (req, res) => {
    res.send('Portfolio API is running...');
});

const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
