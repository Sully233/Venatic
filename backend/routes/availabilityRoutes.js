const express = require('express')
const router = express.Router()
const { setAvailability, getOpenTimeSlots, deleteAvailability } = require('../controllers/avaliabilityController')


router.get('/', getOpenTimeSlots)

router.post('/superuseradmin/setavailability', setAvailability )

router.delete('/superuseradmin/removeavailability', deleteAvailability)



module.exports = router