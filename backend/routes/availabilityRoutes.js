const express = require('express')
const router = express.Router()
const { setAvailability, getOpenTimeSlots, deleteAvailability } = require('../controllers/avaliabilityController')


router.get('/', getOpenTimeSlots)

router.post('/', setAvailability )

router.delete('/', deleteAvailability)



module.exports = router