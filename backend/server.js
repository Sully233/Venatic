const express = require('express');
const dotenv = require('dotenv').config()
const helmet = require('helmet');
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('./models/bookingModel');

connectDB()

const app = express();
const PORT = process.env.PORT;
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.post('/api/webhook', express.raw({type: 'application/json'}), async (request, response) => {
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
});
  

//Security
app.use(helmet());





app.use('/api/goals', require('./routes/goalRoutes'))

app.use('/api/availabilities', require('./routes/availabilityRoutes'))

app.use('/api/booking', require('./routes/bookingRoutes'))



app.use(errorHandler)



app.listen(PORT, () => console.log('Server is alive on port ' + PORT));

