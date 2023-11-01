const express = require('express')
const router = express.Router()
const { createBooking, getBookingsOnDate } = require('../controllers/bookingController')


router.get('/superuseradmin/ondate', getBookingsOnDate)

router.post('/', createBooking)




module.exports = router