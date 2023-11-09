const mongoose = require('mongoose');

const availabilitySchema = mongoose.Schema({
  contractor: {
    firstName: {
      type: String,
      required: [true, 'Please add the first name of the contractor']
    },
    lastName: {
      type: String,
      required: [true, 'Please add the last name of the contractor']
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please add the last name of the contractor']
    },
  },
  availability: [{
    date: {
      type: Date,
      required: [true, 'Please add the date and time of availability']
    },
    startTime: {
      type: Date,
      required: [true, 'Please add the start time of availability']
    },
    endTime: {
      type: Date,
      required: [true, 'Please add the end time of availability']
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Availability', availabilitySchema, 'Availabilities');
