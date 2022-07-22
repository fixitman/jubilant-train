const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')



const register = asyncHandler(async (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || !req.body.password2) {
        res.json({
            error: "Invalid form data"
        }) 
    }
    if (req.body.password !== req.body.password2) {
        res.json({
            error: 'Passwords do not match'
        })  
    }

    const { firstName, lastName, email, password } = req.body;

    const user = await User.findOne({ email })    
    if (!user) {
        const hashedPW = bcrypt.hashSync(password,10)
        const newUser = await User.create({ firstName, lastName, email, hashedPW })
        const token = generateToken(newUser._id)
        res.status(200).json({
            token: token
        })
    } else {
        res.status(401).send('Email already exists') 
    }
})

const login = asyncHandler(async(req,res)=>{
    const {email, password} = req.body
    
    if(!email || !password){
        res.status(400).send('invalid form data')       
    }

    const user = await User.findOne({email})

    if(!user){
        console.log(email)
        res.status(401).send('Invalid email or password')
    }else{
        
        if(!bcrypt.compareSync(password,user.hashedPW)){
            console.log(password)
            res.status(401).send('Invalid email or password')
        }else{
            const token = generateToken(user._id)
            res.status(200).json(token)
        }
    }
})

function generateToken(id){
    return jwt.sign({id},process.env.TOKEN_SECRET,{expiresIn: '1d'})
}

const authenticate = asyncHandler(async(req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.indexOf('Bearer ') === 0){
        const token = req.headers.authorization.split(' ')[1];
        const validated = jwt.verify(token,process.env.TOKEN_SECRET)
        if(validated){
           const user = User.findById(validated.id)
           if(user){
            res.user = user
            next()
           }else{
            res.status(401).send('no such user id')
           }
        }else{
            res.sendStatus(401)
        }
    }else{
        res.redirect('/auth/login')
    }

})

module.exports = {register,login, authenticate}