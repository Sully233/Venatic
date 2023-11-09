const asyncHandler = require('express-async-handler');
const Booking = require('../models/bookingModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
const client = require('twilio')(process.env.TWILLO_ACCOUNTSID, process.env.TWILLO_AUTH_TOKEN);

const stripeBookingAllocation = asyncHandler(async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.log(err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const bookingId = session.metadata.bookingId;

        try {
          const booking = await Booking.findById(bookingId);
          if (booking) {

            booking.receipt = session.payment_intent;
            await booking.save();
            console.log('Booking updated with receipt number');

            const messageBody = `Hi ${booking.customer.firstName} ${booking.customer.lastName},\n\n` +
                                `Thanks for your booking with Venatic.\n` +
                                `We've received your payment and your booking is confirmed.\n\n` +
                                `Thanks :)`;

            client.messages.create({
              body: messageBody,
              from: process.env.TEXT_SEND_NUMBER,
              to: `+61${booking.customer.contactNumber}` 
            })
            .then(message => console.log(`Notification sent with SID: ${message.sid}`))
            .catch(error => console.error(`Notification failed with error: ${error}`));

          } else {
            console.log('Booking not found');
          }
        } catch (err) {
          console.log('Error updating booking:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
    }

    res.send();
});

module.exports = {
    stripeBookingAllocation
}