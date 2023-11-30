const asyncHandler = require('express-async-handler');

const Availability = require('../models/availabilityModel')


const getOpenDays = asyncHandler(async (req, res) => {

  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 3);


  const endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + 2);


  const availabilities = await Availability.find({
    'availability.date': {
      $gte: startDate,
      $lte: endDate
    }
  }, 'availability.date');


  const uniqueDates = new Set();


  availabilities.forEach(doc => {
    doc.availability.forEach(avail => {
      if (avail.date >= startDate && avail.date <= endDate) {

        uniqueDates.add(avail.date.toISOString().split('T')[0]);
      }
    });
  });


  const openDates = Array.from(uniqueDates);


  res.status(200).json({ openDates });
});



const getOpenTimeSlots = asyncHandler(async (req, res) => {

  const { date } = req.query;

  if (!date) {
    res.status(400);
    throw new Error('Date is required');
  }

  const startDate = new Date(`${date}T00:00:00.000Z`);
  const endDate = new Date(`${date}T23:59:59.999Z`);

  const availabilities = await Availability.find({
    'availability.date': {
      $gte: startDate,
      $lte: endDate,
    },
  }, 'availability');


  const timeSlots = new Set();
  availabilities.forEach(avail => {
    avail.availability.forEach(slot => {
      const startTime = slot.startTime.toISOString().split('T')[1].substring(0, 5);
      timeSlots.add(startTime);
    });
  });

  const sortedTimeSlots = Array.from(timeSlots).sort((a, b) => {
    return a.localeCompare(b);
  });

  res.status(200).json(sortedTimeSlots);
});



const setAvailability = asyncHandler(async (req, res) => {
  const { firstName, lastName, phoneNumber, date, startTime, endTime } = req.body;

  if (!firstName || !lastName || !phoneNumber || !date || !startTime || !endTime) {
    res.status(400);
    throw new Error('Please add all fields');
  }


  const start = new Date(`${date}T${startTime}:00.000Z`);
  const end = new Date(`${date}T${endTime}:00.000Z`);


  if (start >= end) {
    res.status(400);
    throw new Error('End time must be after start time.');
  }

  const availabilities = [];
  let currentTime = new Date(start);

  while (currentTime < end) {
    const nextTime = new Date(currentTime);
    nextTime.setHours(currentTime.getHours() + 1);

    availabilities.push({
      contractor: { firstName, lastName, phoneNumber },
      availability: [{
        date,
        startTime: currentTime,
        endTime: nextTime,
      }]
    });

    currentTime = nextTime;
  }

  const createdAvailabilities = await Availability.create(availabilities);
  res.status(200).json(createdAvailabilities);
});


const deleteAvailability = asyncHandler(async (req, res) => {
  const { date, phoneNumber } = req.query;

  if (!date || !phoneNumber) {
    res.status(400);
    throw new Error('Date and phone number are required');
  }

  const startDate = new Date(`${date}T00:00:00.000Z`);
  const endDate = new Date(`${date}T23:59:59.999Z`);

  const result = await Availability.deleteMany({
    'contractor.phoneNumber': phoneNumber,
    'availability.date': {
      $gte: startDate,
      $lte: endDate,
    },
  });

  if (result.deletedCount === 0) {
    res.status(404);
    throw new Error('No availabilities found for the specified person on the specified date');
  }

  res.status(200).json({ message: 'Availability successfully deleted' });
});


module.exports = {
  setAvailability, getOpenTimeSlots, deleteAvailability, getOpenDays
};
