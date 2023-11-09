const asyncHandler = require('express-async-handler');
const Booking = require('../models/bookingModel');
const Availability = require('../models/availabilityModel'); 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
const client = require('twilio')(process.env.TWILLO_ACCOUNTSID, process.env.TWILLO_AUTH_TOKEN);

const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({

  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})


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
              // Update the booking with the receipt number
              booking.receipt = session.payment_intent;

              // Allocate a person to the booking
              let allocatedPerson = { firstName: 'UNALLOCATED', lastName: 'UNALLOCATED' };
              for (let currentTime = new Date(booking.bookingTime.start); currentTime < booking.bookingTime.end; currentTime.setHours(currentTime.getHours() + 1)) {
                  const nextTime = new Date(currentTime);
                  nextTime.setHours(currentTime.getHours() + 1);

                  const availability = await Availability.findOne({
                      'availability.startTime': currentTime,
                      'availability.endTime': nextTime
                  });

                  if (availability) {
                      allocatedPerson = availability.contractor;
                      await Availability.updateOne(
                          { _id: availability._id },
                          { $pull: { availability: { startTime: currentTime, endTime: nextTime } } }
                      );
                      break;
                  }
              }
              booking.allocatedPerson = allocatedPerson;

              await booking.save();
              console.log('Booking updated with receipt number and allocated person');

              // Send a notification message to the customer
              const messageBody = `Hi ${booking.customer.firstName} ${booking.customer.lastName},\n\n` +
                                  `Thanks for your booking with Venatic.\n` +
                                  `We've received your payment and your booking is confirmed.\n\n` +
                                  `Thanks :)`;

              const mailOptions = {
                from: "info@skimify.ai",
                to: booking.customer.email,
                subject: "Your Skimify Account Has Been Created!",
                text: `Hi ${booking.customer.firstName} ${booking.customer.lastName}, \n Thanks for creating an account. Thanks, Skimify (a divison of Venatic)`
              }
                                  
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log("Error:", error)
                }
                else {
                  console.log("Email sent",info.response)
                }
          
              });

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