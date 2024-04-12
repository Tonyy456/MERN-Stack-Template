/*
    Author: Anthony D'Alesandro

    user.routes.js - routes all user controllers to a path
*/
const express = require('express')
const {
    login,
    getUser,
    refreshToken,
    logout,
    getUsers,
    updateUser,
    deleteUser,
    updatePassword
} = require('./controller')
// const requireAuth = require('../../middleware/requireAuth');
const userRoutes = express.Router()

// create
userRoutes.post('/login', login)
userRoutes.post('/logout', logout)
userRoutes.post('/refresh', refreshToken)

// read
userRoutes.get('/user/:id', getUser)
userRoutes.get('/user', getUsers)

// update
userRoutes.put('/user-det/:id', updateUser)
userRoutes.put('/user-pas/:id', updatePassword)

// destroy
userRoutes.delete('/user/:id', deleteUser)

module.exports = userRoutes;