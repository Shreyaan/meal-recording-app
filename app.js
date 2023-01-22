const express = require('express');
const mongoose = require('mongoose');
// const firebase = require('firebase');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/auth');
const mealRoutes = require('./routes/meal');
const adminRoutes = require('./routes/admin');

const authMiddleware = require('./middleware/auth');


const firebase = require('./firebase-init');


const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', authMiddleware.checkToken, authMiddleware.isadmin , adminRoutes);
app.use('/api/meals', authMiddleware.checkToken, mealRoutes);

// / home route to welcome users
app.get('/', (req, res) => {
    res.status(200).json('Welcome to the meal planner API');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
