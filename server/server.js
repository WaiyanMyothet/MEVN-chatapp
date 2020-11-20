/** Dotenv Environment Variables */
if (process.env.HEROKU_DEPLOYMENT !== 'true') {
    // Skip loading the .env file if deploying with heroku
    require('dotenv').config();
}
require('dotenv').config();
console.log(process.env.DATABASE_URL);

/** Passport Configuration */
const passport = require('passport');
require('./config/passport')(passport);

/** Express */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressValidator = require('express-validator');

/** Connect to MongoDB */
const mongoose = require('mongoose');
require('./db/mongoose');
const app = express();
const server = require('http').Server(app);
app.use(expressValidator());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());


/** Built In Node Dependencies */
const path = require('path');
const fs = require('fs');

/** Routes */
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
/** Routes Definitions */
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

if (process.env.HEROKU_DEPLOYMENT === 'true') {
    /** Trust Proto Header for heroku */
    app.enable('trust proxy');
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

/** Serve static assets if production */
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../client', 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
    });
}

if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT || 5000, () => {
        console.log('Server running at port 8000...');
       // logger.info(`[LOG=SERVER] Server started on port ${process.env.PORT}`);
    });
}
//module.exports = { app };