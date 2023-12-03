const express = require('express')
const router = express.Router()
const { createBooking, getBookingsOnDate, deleteBooking, getName, getBookingPrice } = require('../controllers/bookingController')


router.get('/superuseradmin/ondate', getBookingsOnDate)

router.get('/nameinfo', getName)

router.get('/price', getBookingPrice)


router.post('/', createBooking)

router.delete('/superuseradmin/deleteondate', deleteBooking)



module.exports = router