const express = require('express')
const api = express.Router();

const userRouter = require('./users/router');

api.use(userRouter);

module.exports = api;