const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

const getGoals = asyncHandler(async (req, res) => {

    const goals = await Goal.find()

    res.status(200).json(goals)

}   )

const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.hello) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.hello
    })
    res.status(200).json(goal)
})

module.exports = {
    getGoals, setGoal
}