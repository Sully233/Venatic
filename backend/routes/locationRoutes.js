const express = require('express')
const router = express.Router()
const { checkEligibility } = require('../controllers/locationEligible')


router.get('/', express.raw({type: 'application/json'}), checkEligibility )



module.exports = router

