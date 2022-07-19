const express = require('express')
const router = express.Router()
const {authenticate} = require('../controllers/authController')

router.get('/',authenticate, (req,res)=>{
    res.render('pages/index')
})


module.exports=router