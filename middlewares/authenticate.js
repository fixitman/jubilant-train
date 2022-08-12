const User = require('../models/User')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


const authenticate = asyncHandler(async (req, res, next) => {
    if (req.headers?.authorization?.indexOf('Bearer ') === 0) {
        const token = req.headers.authorization.split(' ')[1];
        const validated = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (validated) {
            const user = await User.findById(validated.user.id)
            if (user) {
                req.user = user
                next()
            } else {
                console.error('no user')
                res.sendStatus(401)
            }
        } else {
            console.error('not validated')
            res.sendStatus(401)
        }
    } else {
        console.error('no header',req.headers)
        res.sendStatus(401)        
    }

})

module.exports = authenticate