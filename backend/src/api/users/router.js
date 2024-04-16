/**
 @author: Anthony D'Alesandro

  Creates api routes to the controller end points.
 */

const express = require('express')
const { catchErrors } = require('../../middleware/catch-errors');
const { requireAuth } = require('../../middleware/auth');
const Controller = require('./controller')

const router = express.Router();
const adminsOnly = requireAuth({allowType: ['admin']})

/* create */
router.post('/login', catchErrors(Controller.Login))
router.post('/logout', catchErrors(Controller.Logout))
router.post('/refresh', catchErrors(Controller.RefreshTokens))

/* read */
router.get('/users/:id', adminsOnly, catchErrors(Controller.Get))
router.get('/users', adminsOnly, catchErrors(Controller.GetAll))

/* update */
router.put('/users/:id', adminsOnly, catchErrors(Controller.Update))

/* destroy */
router.delete('/users/:id', adminsOnly, catchErrors(Controller.Delete))

module.exports = router;