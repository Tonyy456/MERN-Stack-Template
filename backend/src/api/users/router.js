/**
 @author: Anthony D'Alesandro

  Creates api routes to the controller end points.
 */

const express = require('express')
const { catchErrors } = require('../../middleware/catch-errors');
const { requireAdmin} = require('../../middleware/auth');
const Controller = require('./controller')

const router = express.Router();
/* create */
router.post('/login', catchErrors(Controller.Login))
router.post('/logout', catchErrors(Controller.Logout))
router.post('/refresh', catchErrors(Controller.RefreshTokens))

/* read */
router.get('/users/:id', requireAdmin, catchErrors(Controller.Get))
router.get('/users', requireAdmin, catchErrors(Controller.GetAll))

/* update */
router.put('/users/:id', requireAdmin, catchErrors(Controller.Update))

/* destroy */
router.delete('/users/:id', requireAdmin, catchErrors(Controller.Delete))

module.exports = router;