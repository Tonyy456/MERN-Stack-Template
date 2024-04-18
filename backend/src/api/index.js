/**
 * @author: Anthony D'Alesandro
 *
 * Creates routes for all the api end points.
 */
const express = require('express')
const api = express.Router();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const userRouter = require('./users/router');
api.use('/test', async (req, res) => {
    await sleep(2000);
    res.status(200).json({
        cover: null,
        email : "ajdalesandro0115@gmail.com",
        name: "Tony",
        option: "orange",
        percentage: 50
    })
})
api.use(userRouter);

module.exports = api;