const express = require('express')
const router = express.Router()
const { createBooking, getBookingsOnDate, deleteBooking, getName } = require('../controllers/bookingController')


router.get('/superuseradmin/ondate', getBookingsOnDate)

router.get('/nameinfo', getName)


router.post('/', createBooking)

router.delete('/superuseradmin/deleteondate', deleteBooking)



module.exports = router