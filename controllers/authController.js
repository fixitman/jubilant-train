const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const ACCESS_TOKEN_EXPIRES = '15m'
const REFRESH_TOKEN_EXPIRES = '1d'
const REFRESH_COOKIE_MAX_AGE = 24 * 60 * 60 * 1000 // 1 day

const register = asyncHandler(async (req, res) => {
    let { firstName, lastName, email, password, verify } = req.body;
    email = email.toLowerCase()

    if (!firstName || !lastName || !email || !password || !verify) {
        return res.status(400).send('invalid form data');
    }
    if (password !== verify) {
        return res.status(400).send('Passwords do not match')
    }

    const user = await User.findOne({ email })

    if (user) {
        return res.sendStatus(409)//conflict - user exists
    }

    const hashedPW = bcrypt.hashSync(password, 10)
    let newUser = await User.create({ firstName, lastName, email, hashedPW })

    const userInfo = {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
    }

    const tokens = await generateTokens(userInfo)
    const { accessToken, refreshToken } = tokens

    newUser.refreshToken = refreshToken
    const updatedUser = await newUser.save()    

    return res.status(200)
        .cookie('refresh', refreshToken, { httpOnly: true, maxAge: REFRESH_COOKIE_MAX_AGE })
        .json({
            accessToken,
            user: userInfo
        })
})

const login = asyncHandler(async (req, res) => {
    let { email, password } = req.body
    email = email.toLowerCase()

    if (!email || !password) {
        res.status(400).send('invalid form data')
    }

    const user = await User.findOne({ email })

    if (!user) {
        console.log(email)
        return res.status(401).send('Invalid email or password')
    }

    if (!bcrypt.compareSync(password, user.hashedPW)) {
        return res.status(401).send('Invalid email or password')
    }

    const userInfo = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }
    const tokens = await generateTokens(userInfo)
    const { accessToken, refreshToken } = tokens

    user.refreshToken = refreshToken
    await user.save()
    

    res.status(200)
        .cookie("refresh", refreshToken, { httpOnly: true, maxAge: REFRESH_COOKIE_MAX_AGE })
        .json({
            accessToken,
            user: userInfo
        })


})

const logout = asyncHandler(async (req, res) => {
    const cookies = req.cookies
    console.log('cookies', cookies)
    if (!cookies?.refresh) return res.sendStatus(204) // no content
    const refreshToken = cookies.refresh
    const foundUser = await User.findOne({ refreshToken: refreshToken })
    if (!foundUser) {
        res.clearCookie('refresh', { httpOnly: true, maxAge: REFRESH_COOKIE_MAX_AGE })
        return res.sendStatus(204)
    }
    foundUser.refreshToken = ''
    await foundUser.save()
    res.clearCookie('refresh', { httpOnly: true, maxAge: REFRESH_COOKIE_MAX_AGE })
    return res.sendStatus(204)

})

const refresh = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refresh
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                res.sendStatus(401)
                console.log('error', err)
            }
            //validate refresh token and issue a new token
            
            const user = await User.findOne({refreshToken:refreshToken}, 'id firstName lastName email')
            if(!user){
                return res.sendStatus(401)
            }
            const userInfo = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }

            const newAccessToken = jwt.sign({ user: userInfo }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES })
            
            res.status(200).json({ accessToken: newAccessToken, userInfo })
        })
})

const generateTokens = asyncHandler(async (userInfo) => {
    const accessToken = jwt.sign({ user: userInfo }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES })
    const refreshToken = jwt.sign({ user: userInfo }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES })
    await User.updateOne({ _id: userInfo.id }, { refreshToken })
    return { accessToken, refreshToken }
})

const invalidMethod = (req,res)=>{
    res.sendStatus(405) // method not allowed
}


module.exports = { register, login, logout, refresh, invalidMethod }