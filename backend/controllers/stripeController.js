const asyncHandler = require('express-async-handler');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const stripeWebhook = asyncHandler(async (req, res) => {

    const payload = req.body;
    const sig = req.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log(`⚠️ Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
  
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        const bookingId = session.metadata.bookingId;
  
        const booking = await Booking.findById(bookingId);
        if (booking) {
          booking.receipt = session.payment_intent; 
          await booking.save();
          console.log('Booking updated with receipt number');
        } else {
          console.log('Booking not found');
        }
        break;
    }
  
    res.json({ received: true });

  
});

module.exports = {
  stripeWebhook
};