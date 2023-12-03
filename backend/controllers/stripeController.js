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

const truncateName = (name) => {
  return name.length > 19 ? name.substring(0, 19) + '...' : name;
};

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
        booking.stripeSessionID = session.id;

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

        const customerFirstName = truncateName(booking.customer.firstName);
        //SMS Notification
        const messageBody = `Hi ${customerFirstName}, we've got your booking with Venatic!\n\n` +
          `Look out for an email with details.\n\n` +
          `Need help? Contact us at support@venatic.me`;

        const options = { day: '2-digit', month: '2-digit', year: 'numeric' }; //Date format dd/mm/yyyy


        //Email Notification
        const mailOptions = {
          from: '"Venatic Reservations" <reservations@venatic.me>',
          to: booking.customer.email,
          subject: "✅ Booking Confirmation from Venatic",
          html: `
                  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #dddddd; border-radius: 10px; overflow: hidden;">
                    <div style="background-color: #ffffff; color: #333333; padding: 20px; text-align: center; border-bottom: 2px solid #eeeeee;">
                      <h1 style="font-size: 24px; margin: 0;">Booking Confirmed 🎉</h1>
                    </div>
                    <div style="padding: 20px; text-align: center;">
                      <p style="font-size: 16px; margin: 20px 0;">Hey ${booking.customer.firstName} 👋, your exciting experience with Venatic is booked and ready to go!</p>
                      <div style="background-color: #f8f8f8; padding: 20px; margin: 30px 0; line-height: 1.6; border-radius: 8px;">
                        <p style="margin: 0;"><strong>Date 📅:</strong> ${new Date(booking.bookingTime.start).toLocaleDateString('en-GB', options)}</p>
                        <p style="margin: 0;"><strong>Time ⏰:</strong> ${new Date(booking.bookingTime.start).toLocaleTimeString()} - ${new Date(booking.bookingTime.end).toLocaleTimeString()}</p>
                        <p style="margin: 0;"><strong>Specialist 👤:</strong> ${booking.allocatedPerson.firstName} ${booking.allocatedPerson.lastName}</p>
                        <p style="margin: 0;"><strong>Receipt 🧾:</strong> ${booking.receipt}</p>
                      </div>
                      <p style="font-size: 16px;">Need to make changes or have questions? No problem! Our support team is here for you.</p>
                      <a href="mailto:support@venatic.me" style="background-color: #333333; color: #ffffff; padding: 10px 25px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block; margin-top: 10px;">Get Help</a>
                    </div>
                    <div style="background-color: #f8f8f8; color: #333333; padding: 10px; text-align: center; font-size: 12px;">
                      <p>Please do not reply to this email. For assistance, please reach out to our support team.</p>
                    </div>
                  </div>
                `,
        }

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("Error:", error)
          }
          else {
            console.log("Email sent", info.response)
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