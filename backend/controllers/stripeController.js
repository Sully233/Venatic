const asyncHandler = require('express-async-handler');
const getRawBody = require('raw-body');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const stripeWebhook = asyncHandler(async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
  
    try {
      // req.body is a Buffer since we've parsed it with bodyParser.raw
      // Convert Buffer to string and parse JSON manually
      const payload = req.body.toString();
      const parsedBody = JSON.parse(payload);
  
      // Verify the signature using the raw body and signature
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.error(`⚠️ Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object; // Contains a PaymentIntent
        console.log('PaymentIntent was successful!');
        break;
      // ... handle other event types
      default:
        console.error(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    res.json({received: true});
  });
  
module.exports = {
  stripeWebhook
};