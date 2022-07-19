const express = require('express');
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


const router = express.Router()

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', asyncHandler(async (req, res, next) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || !req.body.verify) {
        console.log(req.body)
        res.status(400).send('invalid form data')        
    }
    if (req.body.password !== req.body.verify) {
        res.status(400).send('passwords do not match')        
    }

    const { firstName, lastName, email, password } = req.body;

    const user = await User.findOne({ email })    
    if (!user) {
        const hashedPW = bcrypt.hashSync(password,10)
        const newUser = await User.create({ firstName, lastName, email, hashedPW })
        const token = generateToken(newUser._id)
        res.status(200).json(token)
    } else {
        res.status(400).send('Email exists')       
    }
}))


router.get('/login', (req, res) => {
    res.render('login')
})


router.post('/login',asyncHandler(async(req,res,next)=>{
    const {email, password} = req.body

    if(!email || !password){
        res.status(400).send('invalid form data')       
    }

    const user = await User.findOne({email})

    if(user){
        const token = generateToken(user._id)
        res.status(200).json(token)
    }else{
        res.status(400).send('Invalid email or password')
    }

}))

function generateToken(id){
    return jwt.sign({id},process.env.TOKEN_SECRET,{expiresIn: '1d'})
}

module.exports = router
