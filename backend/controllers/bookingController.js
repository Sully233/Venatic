const asyncHandler = require("express-async-handler");
const Availability = require("../models/availabilityModel");
const Booking = require("../models/bookingModel");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const client = require("twilio")(
  process.env.TWILLO_ACCOUNTSID,
  process.env.TWILLO_AUTH_TOKEN
);
const { bookingCost } = require("../utils/priceCalculator");

const getName = asyncHandler(async (req, res) => {
  const { session_ID } = req.query;

  if (!session_ID) {
    return res.status(400).json({ message: "Session ID is required." });
  }

  try {
    const booking = await Booking.findOne({ stripeSessionID: session_ID });

    if (booking) {
      const { firstName, lastName } = booking.customer;

      res.status(200).json({ firstName, lastName });
    } else {
      res
        .status(404)
        .json({ message: "Booking not found with given session ID." });
    }
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).send("Internal Server Error");
  }
});

const getBookingsOnDate = asyncHandler(async (req, res) => {
  const { date } = req.query;

  if (!date) {
    res.status(400);
    throw new Error("Please provide a date");
  }

  const startDate = new Date(new Date(date).toISOString());
  startDate.setUTCHours(0, 0, 0, 0);

  const endDate = new Date(new Date(date).toISOString());
  endDate.setUTCHours(23, 59, 59, 999);

  console.log(startDate);
  const bookings = await Booking.find({
    "bookingTime.start": { $gte: startDate, $lte: endDate },
  }).sort({ "bookingTime.start": 1 });

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
    duration,
    receipt,
    description,
    notes,
    selection
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !contactNumber ||
    !email ||
    !bookingStartTime ||
    !bookingEndTime ||
    !duration ||
    !description || 
    !selection
  ) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const bookingStart = new Date(bookingStartTime);
  const bookingEnd = new Date(bookingEndTime);
  const price = bookingCost(selection, duration)

  if (bookingStart >= bookingEnd) {
    res.status(400);
    throw new Error("Booking end time must be after start time");
  }

  const existingBooking = await Booking.findOne({
    "customer.email": email,
    "bookingTime.start": bookingStart,
    "bookingTime.end": bookingEnd,
  });

  // if (existingBooking) {
  //   res.status(400);
  //   throw new Error("A booking with the same details already exists");
  // }

  let allocatedPerson = { firstName: "UNALLOCATED", lastName: "UNALLOCATED" };

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
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "aud",
          product_data: {
            name: "Booking",
            description: description,
          },
          unit_amount: Math.round(price * 100), // Convert price to cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://venatic.me/success?sessionId={CHECKOUT_SESSION_ID}",
    cancel_url: "https://venatic.me/unsuccessful",
    customer_email: email, // Pre-fill the email in the checkout session
    metadata: {
      bookingId: newBooking._id.toString(),
    },
  });

  res.status(201).json({ url: session.url });
});

const deleteBooking = asyncHandler(async (req, res) => {
  const { date, startTime, endTime, contactNumber } = req.body;

  // Parse the date and times into Date objects
  const bookingDate = new Date(date);
  const bookingStartTime = new Date(startTime);
  const bookingEndTime = new Date(endTime);

  // Find the booking by date, start time, end time, and contact number
  const booking = await Booking.findOne({
    "bookingTime.start": bookingStartTime,
    "bookingTime.end": bookingEndTime,
    "customer.contactNumber": contactNumber,
  });

  // If no booking is found, return an error response
  if (!booking) {
    res.status(404).json({ message: "Booking not found" });
    return;
  }

  // Delete the found booking
  await Booking.deleteOne({ _id: booking._id });

  res.status(200).json({ message: "Booking deleted successfully" });
});

const getBookingPrice = asyncHandler(async (req, res) => {
  const { selection, duration } = req.query;

  const price = bookingCost(selection, duration);

  res.status(200).json({ price });
});

module.exports = {
  createBooking,
  getBookingsOnDate,
  deleteBooking,
  getName,
  getBookingPrice,
};
