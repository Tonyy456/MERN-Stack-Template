/**
    @author: Anthony D'Alesandro

    Creates api routes to the controller end points.
*/

const express = require('express')
const { catchErrors } = require('../../middleware/catch-errors');
const Controller = require('./controller')

const router = express.Router();

/* create */
router.post('/login', catchErrors(Controller.login))
router.post('/logout',  catchErrors(Controller.Logout))
router.post('/refresh',  catchErrors(Controller.RefreshTokens))

/* read */
router.get('/user/:id',  catchErrors(Controller.GetUser))
router.get('/user',  catchErrors(Controller.GetUsers))

/* update */
router.put('/user-det/:id',  catchErrors(Controller.UpdateUser))
router.put('/user-pas/:id',  catchErrors(Controller.UpdatePassword))

/* destroy */
router.delete('/user/:id',  catchErrors(Controller.DeleteUser))

module.exports = router;