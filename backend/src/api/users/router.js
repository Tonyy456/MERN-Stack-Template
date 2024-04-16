/**
 @author: Anthony D'Alesandro

  Creates api routes to the controller end points.
 */

const express = require('express')
const { catchErrors } = require('../../middleware/catch-errors');
const Controller = require('./controller')

const router = express.Router();

/* create */
router.post('/login', catchErrors(Controller.Login))
router.post('/logout',  catchErrors(Controller.Logout))
router.post('/refresh',  catchErrors(Controller.RefreshTokens))

/* read */
router.get('/users/:id',  catchErrors(Controller.Get))
router.get('/users',  catchErrors(Controller.GetAll))

/* update */
router.put('/users/:id',  catchErrors(Controller.Update))

/* destroy */
router.delete('/users/:id',  catchErrors(Controller.Delete))

module.exports = router;