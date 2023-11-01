const asyncHandler = require('express-async-handler');
const Availability = require('../models/availabilityModel');
const Booking = require('../models/bookingModel');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const getBookingsOnDate = asyncHandler(async (req, res) => {
    const { date } = req.query;
    
    if (!date) {
      res.status(400);
      throw new Error('Please provide a date');
    }
  
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
  
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
  
    const bookings = await Booking.find({
      'bookingTime.start': { $gte: startDate, $lte: endDate }
    }).sort({ 'bookingTime.start': 1 });
  
    res.status(200).json(bookings);
  });


  const createBooking = asyncHandler(async (req, res) => {
    const {
      firstName,
      lastName,
      contactNumber,
      email,
      bookingStartTime,
      bookingEndTime,
      price,
      receipt,
      description,
      notes
    } = req.body;

    if (!firstName || !lastName || !contactNumber || !email || !bookingStartTime || !bookingEndTime || !price || !description) {
      res.status(400);
      throw new Error('Please add all required fields');
    }

    const bookingStart = new Date(bookingStartTime);
    const bookingEnd = new Date(bookingEndTime);
  
    if (bookingStart >= bookingEnd) {
      res.status(400);
      throw new Error('Booking end time must be after start time');
    }


    const existingBooking = await Booking.findOne({
      'customer.email': email,
      'bookingTime.start': bookingStart,
      'bookingTime.end': bookingEnd
    });

    if (existingBooking) {
      res.status(400);
      throw new Error('A booking with the same details already exists');
    }
  
    let allocatedPerson = { firstName: 'UNALLOCATED', lastName: 'UNALLOCATED' };
  
    for (let currentTime = new Date(bookingStart); currentTime < bookingEnd; currentTime.setHours(currentTime.getHours() + 1)) {
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
    

    const newBooking = await Booking.create({
      customer: { firstName, lastName, contactNumber, email },
      bookingTime: { start: bookingStart, end: bookingEnd },
      price,
      receipt,
      description,
      notes,
      allocatedPerson,
    });








    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Booking',
            description: description,
          },
          unit_amount: Math.round(price * 100), // Convert price to cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://yourdomain.com/success?sessionId={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://yourdomain.com/cancel',
      metadata: {
        bookingId: newBooking._id.toString(),
      },
    });
  
    res.status(201).json({ url: session.url });

  });

  

module.exports = {
    createBooking, getBookingsOnDate
};