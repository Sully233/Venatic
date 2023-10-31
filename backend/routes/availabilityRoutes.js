const express = require('express')
const router = express.Router()
const { setAvailability, getOpenTimeSlots } = require('../controllers/avaliabilityController')


router.get('/', getOpenTimeSlots)

router.post('/', setAvailability )



module.exports = router