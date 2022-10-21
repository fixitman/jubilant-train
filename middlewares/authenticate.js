const User = require('../models/User')
const jwt = require('jsonwebtoken')
//const asyncHandler = require('express-async-handler')

const asyncHandler = fn => (req, res, next) => {
    fn(req, res, next)
    .catch(next);
}  

const authenticate = asyncHandler(async (req, res, next) => {
    if (req.headers?.authorization?.indexOf('Bearer ') !== 0) {
        console.error('Authorization token required', req.headers)
        return res.sendStatus(401)
    }

    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            console.error('not validated')
            return res.sendStatus(401)
        }
        const user = await User.findById(decoded.user.id)        
        if (user) {
            req.user = user
            next()
        } else {
            console.error('no user', decoded.user)
            return res.sendStatus(401)
        }
    })

})

module.exports = authenticate