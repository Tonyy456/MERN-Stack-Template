/**
 @author: Anthony D'Alesandro

  Creates api routes to the controller end points.
 */

const express = require('express')
const bodyParser = require('body-parser');
const { catchErrors } = require('../../middleware/catch-errors');
const { requireAdmin} = require('../../middleware/auth');
const Controller = require('./controller')

const router = express.Router();

router.post('/make-stripe-payment', catchErrors(Controller.StartStripeCheckout))
router.post('/create-checkout-session', catchErrors(Controller.StartCheckoutSession))
router.get('/session-status', catchErrors(Controller.CheckSessionStatus))
router.post('/webhook', bodyParser.raw({type: 'application/json'}), catchErrors(Controller.WebhookFulfillmentHandler))

module.exports = router;