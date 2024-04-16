/**
    @author: Anthony D'Alesandro

    Backend code entry point. Setup software, api, and server port.
*/

// libs
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

// Dayjs Configuration
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault("America/New_York")

const appRouter = require('./config/router')
const connectToDatabase = require('./config/db');

// create app instance
const app = express(); // Express instance, the actual app! gets started further down the page.
const configureAppMiddleware = (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.static(path.resolve(__dirname, "build")));
    app.use(cors({credentials: true, origin: process.env.ORIGIN}))
}

connectToDatabase().then(async () => {
    // configure app middleware
    configureAppMiddleware(app);
    app.use(appRouter);
    
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


