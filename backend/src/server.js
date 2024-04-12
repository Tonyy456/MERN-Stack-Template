/*
    Author: Anthony D'Alesandro

    Backend code entry point. Setup software, api, and server port.
*/

// libs
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs-extra')

// Dayjs Configuration
const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault("America/New_York")

const app = express(); // Express instance, the actual app! gets started further down the page.

const appRouter = require('./config/router')
const connectToDatabase = require('./config/db'); // asyncronous request to connect to db. only then does server start.
connectToDatabase().then(async () => {
    // configure app middleware
    app.use(express.json());
    app.use(express.static(path.join(__dirname, '../../frontend/build')))
    app.use(cors({credentials: true, origin: process.env.ORIGIN}))
    app.get(appRouter);
    
    // start server!
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
        const currentTime = dayjs();
        const message = `
        Listening on port ${PORT}.
        Starting server at ${currentTime.format('MM-DD-YY @ hh:mm:ss')}. 
        time zone: ${dayjs.tz.guess()}.`
        console.log(message);
    })
})

