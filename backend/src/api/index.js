/**
 * @author: Anthony D'Alesandro
 *
 * Creates routes for all the api end points.
 */
const express = require('express')
const api = express.Router();

const userRouter = require('./users/router');
api.use(userRouter);

module.exports = api;