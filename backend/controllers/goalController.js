const asyncHandler = require('express-async-handler')


const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get Goals'})

}   )

const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.hello) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({ message: 'set'})
})

module.exports = {
    getGoals, setGoal
}