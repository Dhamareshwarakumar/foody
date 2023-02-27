const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');


// Middlewares
app.use(cors());
app.use(express.json());


// Configuration
dotenv.config();
require('./config/db');


// Constants
const PORT = process.env.PORT || 3333;


// Routes
app.get('/', (req, res) => {
    return res.json({ msg: 'Foody welcomes you to the world of yummy 😋' });
});
app.use('/api/auth', require('./routes/auth'));


// Server
app.listen(PORT, () => console.log(`Server running @${PORT}`));