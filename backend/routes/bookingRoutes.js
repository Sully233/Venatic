const express = require('express')
const router = express.Router()
const { createBooking, getBookingsOnDate, deleteBooking } = require('../controllers/bookingController')


router.get('/superuseradmin/ondate', getBookingsOnDate)

router.post('/', createBooking)

router.delete('/superuseradmin/deleteondate', deleteBooking)



module.exports = router