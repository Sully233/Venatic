const express = require('express')
const router = express.Router()
const { stripeBookingAllocation } = require('../controllers/stripeController')


router.post('/', express.raw({ type: 'application/json' }), stripeBookingAllocation)



module.exports = router

