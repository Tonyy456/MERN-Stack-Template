/**
    @author: Anthony D'Alesandro

    Methods available to the client.
*/

require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const YOUR_DOMAIN = 'http://127.0.0.1:5173';
const endpointSecret = `whsec_${process.env.STRIPE_WEBHOOK_SECRET_KEY}`;

/*
Sources/Credit:
- https://docs.stripe.com/checkout/fulfillment

Test out stripe API? use stripe-cli
https://docs.stripe.com/stripe-cli#install
 */
const Controller = {
    /** Function to make a payment
     * */
    StartStripeCheckout: async function (req, res) {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: 'price_1Pig8KI7J6YQ2hEVRCYd2PSn', //$1 USD
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/payment`,
            cancel_url: `${YOUR_DOMAIN}/payment`,
        });
        console.log(session);
        res.json({url: session.url});
    },

    StartCheckoutSession: async function (req, res) {
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: 'price_1Pig8KI7J6YQ2hEVRCYd2PSn',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
        });
        res.send({clientSecret: session.client_secret});
    },

    CheckSessionStatus: async function (req, res) {
        // attempts to make the session complete and give user access to product.
        const session = await Controller.fullfillSession(req.query.session_id)

        res.send({
            status: session.status,
            customer_email: session.customer_details.email
        });
    },

    // What is this? check this out: https://docs.stripe.com/checkout/fulfillment#create-webhook-endpoint
    WebhookFulfillmentHandler: async function (req, res) {
        const payload = req.body;
        const sig = req.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if (
            event.type === 'checkout.session.completed'
            || event.type === 'checkout.session.async_payment_succeeded'
        ) {
            await Controller.fullfillSession(event.data.object.id);
        }

        res.status(200).end();

    },

    fullfillSession: async function (sessionID) {
        // TODO: Make this function safe to run multiple times,
        // even concurrently, with the same session ID

        // TODO: Make sure fulfillment hasn't already been
        // peformed for this Checkout Session

        // Retrieve the Checkout Session from the API with line_items expanded
        const checkoutSession = await stripe.checkout.sessions.retrieve(sessionID, {
            expand: ['line_items'],
        });

        // Check the Checkout Session's payment_status property
        // to determine if fulfillment should be peformed
        if (checkoutSession.payment_status !== 'unpaid') {
            // TODO: Perform fulfillment of the line items

            // TODO: Record/save fulfillment status for this
            // Checkout Session
        }

        return checkoutSession
    },
}

module.exports = Controller