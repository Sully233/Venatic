const mongoose = require('mongoose');


const bookingSchema = mongoose.Schema(
    {
      customer: {
        firstName: { type: String, required: [true, 'First name is required'] },
        lastName: { type: String, required: [true, 'Last name is required'] },
        contactNumber: { type: String, required: [true, 'Contact number is required'] },
        email: { type: String, required: [true, 'Email is required'] },
      },
      bookingTime: {
        start: { type: Date, required: [true, 'Booking start time is required'] },
        end: { type: Date, required: [true, 'Booking end time is required'] },
      },
      price: { type: Number, required: [true, 'Price is required'] },
      receipt: { type: String, required: [false, 'Receipt is required'] },

      description: { type: String, required: [true, 'Description is required'] },
      notes: String,
      allocatedPerson: {
        firstName: { type: String, required: [true, 'First name is required'] },
        lastName: { type: String, required: [true, 'Last name is required'] },
      },
      stripePaymentIntentId: { type: String, required: [false, 'Payment Intent is required'] },
    },
    {
      timestamps: true,
    }
  );

  module.exports = mongoose.model('Booking', bookingSchema, 'Bookings');
