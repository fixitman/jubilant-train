const Thing = require('../models/Thing')
const asyncHandler = require('express-async-handler')

const getAllById = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(401).json({ error: 'No user specified' })
    }

    try {
        const things = await Thing.getAllById(req.user._id)
        res.status(200).json(things)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

const getAll = asyncHandler(async (req, res) => {
    try {
        const things = await Thing.getAll()
        res.status(200).json(things)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


module.exports = { getAll, getAllById }