/**
 @author: Anthony D'Alesandro

  Creates api routes to the controller end points.
 */

const express = require('express')
const { catchErrors } = require('../../middleware/catch-errors');
const Controller = require('./controller')

const router = express.Router();

// TODO: rename path prefix. lowercase plural.
const pathPrefix = `/templates`
router.post(`${pathPrefix}`, catchErrors(Controller.Create))
router.get(`${pathPrefix}/:id`, catchErrors(Controller.Get))
router.get(`${pathPrefix}`, catchErrors(Controller.GetAll))
router.put(`${pathPrefix}/:id`,  catchErrors(Controller.Update))
router.delete(`${pathPrefix}/:id`,  catchErrors(Controller.Delete))

module.exports = router;