const asyncHandler = require('express-async-handler')

const Booking = require('../models/bookingModel')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET


const stripeBookingAllocation = asyncHandler(async (req, res) => {
    const sig = request.headers['stripe-signature'];
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      console.log(err.message)
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object;
          const bookingId = session.metadata.bookingId;
    
          try {
            const booking = await Booking.findById(bookingId);
            if (booking) {
              booking.receipt = session.payment_intent;
              await booking.save();
              console.log('Booking updated with receipt number');
            } else {
              console.log('Booking not found');
            }
          } catch (err) {
            console.log('Error updating booking:', err);
            response.status(500).send('Internal Server Error');
            return;
          }
          break;


    }
  
    response.send();

})

module.exports = {
    stripeBookingAllocation
}