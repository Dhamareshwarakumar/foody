const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const path = require('path');


// Middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());


// Configuration
dotenv.config();
require('./config/db');
require('./config/passport')(passport);


// Constants
const PORT = process.env.PORT || 3333;


// Routes
// app.get('/', (req, res) => {
//     return res.json({ msg: 'Foody welcomes you to the world of yummy 😋' });
// });
app.use('/api/auth', require('./routes/auth'));
app.use('/api/restaurant', require('./routes/restaurant'));
app.use('/api/super-admin', require('./routes/superAdmin'));

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
})

// Server
app.listen(PORT, () => console.log(`Server running @${PORT}`));