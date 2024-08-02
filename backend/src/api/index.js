/**
 * @author: Anthony D'Alesandro
 *
 * Creates routes for all the api end points.
 */
const express = require('express')
const api = express.Router();

// import rest of API
const userRouter = require('./users/router');
api.use(userRouter);
const stripeRouter = require('./stripe/router');
api.use(stripeRouter)
const awsRouter = require('./aws/router');
api.use(awsRouter);

module.exports = api;

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
// api.use('/test', async (req, res) => {
//     await sleep(2000);
//     res.status(200).json({
//         cover: null,
//         email : "ajdalesandro0115@gmail.com",
//         name: "Tony",
//         option: "orange",
//         percentage: 50
//     })
// })