const express = require('express');
const authController = require('../controllers/authController')
const authenticate = require('../middlewares/authenticate')

//for testing only
function test(req,res){
    res.status(200).json(req.user)
}

const router = express.Router()

router.post('/register', authController.register)

router.get('/logout', authController.logout)

router.post('/login', authController.login)

router.post('/refresh', authController.refresh)

router.post('/test', authenticate, test)

module.exports = router
