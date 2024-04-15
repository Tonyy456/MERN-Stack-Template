/**
    @author: Anthony D'Alesandro

    Creates api routes to the controller end points.
*/
const express = require('express')
const Controller = require('./controller')
const router = express.Router()

// const requireAuth = require('../../middleware/requireAuth');

/* create */
router.post('/login', Controller.login)
router.post('/logout', Controller.Logout)
router.post('/refresh', Controller.RefreshTokens)

/* read */
router.get('/user/:id', Controller.GetUser)
router.get('/user', Controller.GetUsers)

/* update */
router.put('/user-det/:id', Controller.UpdateUser)
router.put('/user-pas/:id', Controller.UpdatePassword)

/* destroy */
router.delete('/user/:id', Controller.DeleteUser)

module.exports = router;